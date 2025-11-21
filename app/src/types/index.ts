export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export interface ParsedData {
  data: JSONValue;
  isValid: boolean;
  error?: string;
}

export interface EditorState {
  originalString: string;
  parsedData: JSONValue | null;
  isDirty: boolean;
  lastSaved?: Date;
  fileHandle?: FileSystemFileHandle;
  fileName?: string;
}
