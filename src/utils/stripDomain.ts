export const stripDomain = (str: string) => (str.includes('.') ? str.slice(0, str.lastIndexOf('.')) : str);
