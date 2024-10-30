export const getAccessToken = () => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
};

export const setAccessToken = (accessToken) => {
  localStorage.setItem("access_token", accessToken);
};

export const setUserLogin = (userData) => {
  localStorage.setItem("user_data", JSON.stringify(userData));
};

export const getUserLogin = () => {
  const storage = localStorage.getItem("user_data");
  if (storage) {
    return JSON.parse(storage);
  } else {
    return null;
  }
};
