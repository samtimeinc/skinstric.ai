// number value reflects a confidence score. The higher the value, the more confident the AI model is the associated key reflects the user's actual demographic information
export interface Age {
  [key: string]: number;
  "0-2": number;
  "3-9": number;
  "10-19": number;
  "20-29": number;
  "30-49": number;
  "50-59": number;
  "60-69": number;
  "70+": number;
}
// Add index signatures for type safety compliance