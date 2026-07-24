(function initializeHotWasmCloudSaveAdapter(global) {
  'use strict';

  /**
   * Owns cloud save transport while preserving the generated runtime's public app methods.
   */
  class HotWasmCloudSaveAdapter {
    /**
     * Connects cloud transport to the legacy application state and emulator APIs.
     * @param {MyClass} app - The runtime application instance.
     */
    constructor(app) {
      this.app = app;
    }

    /**
     * Resolves a cloud endpoint through the frozen allowlisted security helper.
     * @param {string} route - The cloud route approved by the security namespace.
     * @param {Object} [params={}] - Query parameters for the cloud request.
     * @returns {URL} The approved URL with URLSearchParams-encoded query values.
     */
    cloudUrl(route, params = {}) {
      const security = global.HotWasmSecurity;
      if (!security) throw new Error('runtime-security.js must load before cloud requests.');
      return security.resolveApprovedCloudUrl(this.app.state.settings.CLOUDSAVEURL, route, params);
    }

    /**
     * Sends the current serialized savestate to the approved cloud endpoint.
     */
    saveStateEvent() {
      console.log('js savestate event');
      const compressed = Module.FS.readFile('/save/1.sav'); //this is a Uint8Array

      if (!this.app.state.loggedIn) {
        this.app.saveToDatabase(compressed, SaveTypes.Savestate);
        return;
      }

      const saveMessage = 'Cloud State Saved';
      const xhr = new XMLHttpRequest();
      xhr.open(
        'POST',
        this.cloudUrl('SendStaveState', {
          emulator: 'doswasmx',
          name: this.app.base_name + '.savestate.doswasmx',
          password: this.app.state.password,
        }).href,
        true,
      );
      xhr.send(compressed);

      xhr.onreadystatechange = () => {
        try {
          if (xhr.readyState === 4) {
            if (xhr.response == '"Success"') {
              this.app.noCloudSave = false;
              showRuntimeNotice(saveMessage);
            } else {
              showRuntimeNotice('Error Saving Cloud Save');
            }
          }
        } catch (error) {
          console.log(error);
          showRuntimeNotice('Error Loading Cloud Save');
        }
      };
    }

    /**
     * Loads and applies the cloud hard-drive diff when one exists for the active game.
     * @param {Uint8Array} byteArray - The base hard-drive bytes.
     * @returns {Promise<Uint8Array>} The base bytes with any saved diff applied.
     */
    async loadHardDriveDiffs(byteArray) {
      await this.getSaveStates();

      return new Promise((resolve, reject) => {
        const foundCloudDrive = this.app.allSaveStates.some(
          (element) => element.Name == this.app.base_name + '.doswasmx',
        );

        if (!foundCloudDrive) {
          resolve(byteArray);
          return;
        }

        console.log('foundCloudDrive');
        showRuntimeNotice('Found Diff Drive');

        const request = new XMLHttpRequest();
        request.open(
          'GET',
          this.cloudUrl('LoadStaveState', {
            name: this.app.base_name + '.doswasmx',
            password: this.app.state.password,
          }).href,
          true,
        );
        request.responseType = 'arraybuffer';

        request.onload = () => {
          try {
            if (request.response) {
              this.applyHardDriveDiffs(new Uint8Array(request.response), resolve);
            } else {
              reject();
            }
          } catch (error) {
            console.log(error);
            reject();
          }
        };

        request.send(null);
      });
    }

    /**
     * Applies a decompressed sequence of hard-drive diff chunks to the base bytes.
     * @param {Uint8Array} byteArrayDiffs - Gzip-compressed diff bytes from cloud storage.
     * @param {Function} resolve - Resolves the parent diff-load operation.
     */
    async applyHardDriveDiffs(byteArrayDiffs, resolve) {
      console.log('applyHardDriveDiffs');
      let pointer = 0;
      byteArrayDiffs = await this.app.decompressArrayBuffer(byteArrayDiffs.buffer);
      const newHardDrive = new Uint8Array(this.app.baseHardDrive);

      while (pointer < byteArrayDiffs.length) {
        let index =
          byteArrayDiffs[pointer] +
          byteArrayDiffs[pointer + 1] * 256 +
          byteArrayDiffs[pointer + 2] * 256 * 256 +
          byteArrayDiffs[pointer + 3] * 256 * 256 * 256;
        pointer += 4;

        const length =
          byteArrayDiffs[pointer] +
          byteArrayDiffs[pointer + 1] * 256 +
          byteArrayDiffs[pointer + 2] * 256 * 256 +
          byteArrayDiffs[pointer + 3] * 256 * 256 * 256;
        pointer += 4;

        for (let indexOffset = 0; indexOffset < length; indexOffset += 1) {
          newHardDrive[index] = byteArrayDiffs[pointer];
          pointer += 1;
          index += 1;
        }
      }

      resolve(newHardDrive);
    }

    /**
     * Calculates, compresses, and sends hard-drive changes to the approved cloud endpoint.
     */
    async saveHardDriveDiffs() {
      return global.HotWasmCloudSaveDiffAdapter.saveHardDriveDiffs(this);
    }

    /**
     * Loads the saved emulator state from the approved cloud endpoint.
     */
    loadCloud() {
      const request = new XMLHttpRequest();
      request.open(
        'GET',
        this.cloudUrl('LoadStaveState', {
          name: this.app.base_name + '.savestate.doswasmx',
          password: this.app.state.password,
        }).href,
        true,
      );
      request.responseType = 'arraybuffer';

      request.onload = () => {
        try {
          if (request.response) {
            Module.FS.writeFile('/save/1.sav', new Uint8Array(request.response));
            Module._neil_unserialize();
          } else {
            showRuntimeNotice('Error Loading Cloud Save');
          }
        } catch (error) {
          console.log(error);
          showRuntimeNotice('Error Loading Cloud Save');
        }
      };

      request.send(null);
    }

    /**
     * Authenticates the ephemeral in-memory password against the approved login route.
     * @returns {Promise<string>} The cloud service login result.
     */
    async loginToServer() {
      const response = await fetch(
        this.cloudUrl('Login', { password: this.app.state.password }),
      );
      if (!response.ok) throw new Error(`Login request failed: ${response.status}`);
      const result = await response.text();
      console.log('login request completed');
      return result;
    }

    /**
     * Retrieves cloud save metadata for the authenticated, in-memory session only.
     * @returns {Promise<void>} Resolves once the current cloud save list is stored on the app.
     */
    async getSaveStates() {
      if (!this.app.state.loggedIn) return;

      const response = await fetch(
        this.cloudUrl('GetSaveStates', { password: this.app.state.password }),
      );
      if (!response.ok) throw new Error(`Save-state request failed: ${response.status}`);
      const result = await response.json();
      console.log('save-state list loaded');
      this.app.allSaveStates = result;
      result.forEach((element) => {
        if (element.Name == this.app.base_name + '.savestate.doswasmx') {
          this.app.noCloudSave = false;
        }
      });
    }
  }

  global.HotWasmCloudSaveAdapter = HotWasmCloudSaveAdapter;
})(window);
