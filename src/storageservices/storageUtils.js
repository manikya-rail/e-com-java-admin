// Save data to sessionStorage
export const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// Get data from sessionStorage
export const getFromSessionStorage = (key) => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
