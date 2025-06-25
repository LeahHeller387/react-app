export const isValidHebrewName = (name: string) => /^[\u0590-\u05FF]{2,}$/.test(name.trim());
