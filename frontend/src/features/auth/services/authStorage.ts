// src/features/auth/services/authStorage.ts

const ACCESS_TOKEN_KEY = "access_token";
const USER_EMAIL_KEY = "po-tracker.userEmail";
const USER_TYPE_KEY = "po-tracker.userType";
const USER_NAME_KEY = "po-tracker.userName";

export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const saveToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const getUserEmail = () => localStorage.getItem(USER_EMAIL_KEY);
export const saveUserEmail = (email: string | null) => {
  if (email) {
    localStorage.setItem(USER_EMAIL_KEY, email);
  } else {
    localStorage.removeItem(USER_EMAIL_KEY);
  }
};
export const clearUserEmail = () => localStorage.removeItem(USER_EMAIL_KEY);

export const getUserType = () => localStorage.getItem(USER_TYPE_KEY);
export const saveUserType = (type: string | null) => {
  if (type) {
    localStorage.setItem(USER_TYPE_KEY, type);
  } else {
    localStorage.removeItem(USER_TYPE_KEY);
  }
};
export const clearUserType = () => localStorage.removeItem(USER_TYPE_KEY);

export const getUserName = () => localStorage.getItem(USER_NAME_KEY);
export const saveUserName = (name: string | null) => {
  if (name) {
    localStorage.setItem(USER_NAME_KEY, name);
  } else {
    localStorage.removeItem(USER_NAME_KEY);
  }
};
export const clearUserName = () => localStorage.removeItem(USER_NAME_KEY);
