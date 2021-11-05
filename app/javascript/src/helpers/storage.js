const setToLocalStorage = ({ authToken, authEmail, userId, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(authEmail));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(userName));
};

const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage };
