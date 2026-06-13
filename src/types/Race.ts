// number value reflects a confidence score. The higher the value, the more confident the AI model is the associated key reflects the user's actual demographic information
export interface Race {
    [key: string]: number;
    "black": number;
    "east asian": number;
    "latino hispanic": number;
    "middle eastern": number;
    "south asian": number;
    "southeast asian": number;
    "white": number;
}