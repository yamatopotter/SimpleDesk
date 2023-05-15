export const setLocalstorageData = (data, value) => {
  localStorage.setItem(data, value);
};

export const getLocalstorageData = (data) => {
  return localStorage.getItem(data);
};
