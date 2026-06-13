// number value reflects a confidence score. The higher the value, the more confident the AI model is the associated key reflects the user's actual demographic information 
export interface Gender {
    [key: string]: number;
    "male": number;
    "female": number;
}
// Add index signatures for type safety compliance