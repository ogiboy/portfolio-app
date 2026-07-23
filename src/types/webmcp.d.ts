type JsonSchema = {
  additionalProperties?: boolean;
  minLength?: number;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  type: 'object' | 'string';
};

type ModelContextToolResult = {
  content: Array<{ text: string; type: 'text' }>;
  isError?: boolean;
  structuredContent?: unknown;
};

type ModelContextTool = {
  annotations: { readOnlyHint: true };
  description: string;
  execute: (input: Record<string, unknown>) => Promise<ModelContextToolResult>;
  inputSchema: JsonSchema;
  name: string;
};

interface ModelContext {
  provideContext?(context: { tools: ModelContextTool[] }): Promise<void> | void;
  registerTool?(tool: ModelContextTool, options: { signal: AbortSignal }): Promise<void>;
}

interface Document {
  modelContext?: ModelContext;
}

interface Navigator {
  modelContext?: ModelContext;
}

type WebMcpRegistration = {
  name: string;
  signal: AbortSignal;
};

interface Window {
  __webMcpRegistrations: WebMcpRegistration[];
}
