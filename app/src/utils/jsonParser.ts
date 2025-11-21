import type { ParsedData, JSONValue } from '../types';

export const parseJSONString = (jsonString: string): ParsedData => {
  try {
    // Remove outer quotes and whitespace
    let cleaned = jsonString.trim();
    
    // Check if the entire string is wrapped in quotes
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      // Remove the outer quotes
      cleaned = cleaned.slice(1, -1);
      
      // Unescape the string
      cleaned = cleaned
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\');
    }
    
    // Now try to parse the cleaned string
    const parsed = JSON.parse(cleaned);
    return {
      data: parsed,
      isValid: true,
    };
  } catch (error) {
    return {
      data: null,
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON format',
    };
  }
};

export const stringifyToJSONString = (data: JSONValue): string => {
  // Convert to JSON string
  const jsonStr = JSON.stringify(data, null, 0);
  
  // Escape the string
  const escaped = jsonStr
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
  
  // Wrap in quotes to create a JSON string
  return `"${escaped}"`;
};

export const formatJSON = (data: JSONValue, indent: number = 2): string => {
  return JSON.stringify(data, null, indent);
};

export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};
