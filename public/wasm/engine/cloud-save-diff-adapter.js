(function initializeHotWasmCloudSaveDiffAdapter(global) {
  'use strict';

  /**
   * Calculates and persists hard-drive diffs through the cloud save adapter's approved transport.
   */
  async function saveHardDriveDiffs(adapter) {
    const app = adapter.app;
    if (!app.state.loggedIn || app.state.initialInstallation) {
      app.showToast('Save Hard Drive Diffs Not Supported');
      return;
    }

    Module._neil_toggle_pause();
    app.state.message += 'Calculating Diffs...';
    await new Promise((resolve) => setTimeout(resolve, 20));

    const compareHardDrive = Module.FS.readFile('/' + app.base_name + '.img');
    const chunkSize = 10000;
    const arrayChunks = [];
    app.diffCount = 0;
    let progressCounter = 5000000;

    for (let index = 0; index < app.baseHardDrive.length; index += 1) {
      if (app.baseHardDrive[index] != compareHardDrive[index]) {
        let end = index + chunkSize;
        if (end >= app.baseHardDrive.length) end = app.baseHardDrive.length - 1;
        arrayChunks.push({ index, data: compareHardDrive.subarray(index, end) });
        index += chunkSize - 1;
        app.diffCount += 1;
      }

      if (index > progressCounter) {
        const percent = Math.floor((index / app.baseHardDrive.length) * 100);
        app.state.message = 'Diffs: ' + app.diffCount + ', <b>' + percent + '%</b>';
        await new Promise((resolve) => setTimeout(resolve, 20));
        progressCounter += 5000000;
      }
    }

    app.arrayChunks = arrayChunks;
    console.log(arrayChunks);
    let finalsize = 0;
    for (const chunk of arrayChunks) finalsize += 8 + chunk.data.length;

    app.state.message = 'Generating Final Array...';
    await new Promise((resolve) => setTimeout(resolve, 20));

    let finalArray = new Uint8Array(finalsize);
    let pointer = 0;
    for (const chunk of arrayChunks) {
      const index = chunk.index;
      finalArray[pointer] = index & 0xff;
      finalArray[pointer + 1] = (index >> 8) & 0xff;
      finalArray[pointer + 2] = (index >> 16) & 0xff;
      finalArray[pointer + 3] = (index >> 24) & 0xff;
      pointer += 4;

      const length = chunk.data.length;
      finalArray[pointer] = length & 0xff;
      finalArray[pointer + 1] = (length >> 8) & 0xff;
      finalArray[pointer + 2] = (length >> 16) & 0xff;
      finalArray[pointer + 3] = (length >> 24) & 0xff;
      pointer += 4;

      for (const byte of chunk.data) {
        finalArray[pointer] = byte;
        pointer += 1;
      }
    }

    finalArray = await app.compressArrayBuffer(finalArray.buffer);
    console.log('diffSize: ' + finalsize + ' compressedSize: ' + finalArray.length);

    if (app.doIntegrityCheck) {
      app.state.message = 'Doing Integrity Check...';
    } else {
      Module._neil_toggle_pause();
      app.state.message = 'Sending to server...';
    }

    const saveMessage = 'Saved: ' + finalArray.length.toLocaleString('en-US');
    const xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      adapter.cloudUrl('SendStaveState', {
        emulator: 'doswasmx',
        name: app.base_name + '.doswasmx',
        password: app.state.password,
      }).href,
      true,
    );
    xhr.send(finalArray);

    xhr.onreadystatechange = () => {
      try {
        if (xhr.readyState === 4) {
          if (xhr.response == '"Success"') {
            showRuntimeNotice(saveMessage);
            if (app.doIntegrityCheck) {
              app.integrityCheck(compareHardDrive);
            } else {
              app.state.message = '';
            }
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

  global.HotWasmCloudSaveDiffAdapter = Object.freeze({ saveHardDriveDiffs });
})(window);
