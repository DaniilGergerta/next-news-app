export const getLongestSubstring = (title: string) =>
  title
    .split('-')
    .reduce((longest, current) => (current.length > longest.length ? current : longest), '')
    .trim();
