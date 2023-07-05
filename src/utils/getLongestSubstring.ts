export const getLongestSubstring = (title: string) =>
  [...title.split('-'), ...title.split('–')]
    .reduce((longest, current) => (current.length > longest.length ? current : longest), '')
    .trim();
