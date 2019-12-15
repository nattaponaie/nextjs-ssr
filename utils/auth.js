import fetch from 'isomorphic-unfetch';

import {
  API_PREFIX,
  GATEWAY_PREFIX,
} from '/config';

import { axiosInstance } from './axios';

export const login = async ({ username, password }) => {
  const resp = await axiosInstance.post(`${GATEWAY_PREFIX}/api/auth/v1.0/login`, { username, password });
  if (resp.status !== 200) {
    throw resp.data;
  }
  return resp.data;
};

export const refresh = async () => {
  const resp = await axiosInstance.post(`${GATEWAY_PREFIX}/api/auth/v1.0/refresh`);
  if (resp.status !== 200) {
    throw resp.data;
  }
  return resp.data;
};

export const logout = async () => {
  const resp = await axiosInstance.post(`${GATEWAY_PREFIX}/api/auth/v1.0/logout`);
  if (resp.status !== 200) {
    throw resp.data;
  }
  return resp.data;
};

export const register = async ({
  email,
  username,
  password,
  recaptchaToken,
}) => {
  const res = await fetch(`${API_PREFIX}/register`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'recaptcha-token': recaptchaToken,
    },
    body: JSON.stringify({ email, username, password }),
  });
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const requestResetPassword = async ({
  email,
  redirect,
  recaptchaToken,
}) => {
  const res = await fetch(`${GATEWAY_PREFIX}/api/auth/v1.0/manage/reset-password/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'recaptcha-token': recaptchaToken,
    },
    body: JSON.stringify({ email, redirect }),
  });
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const requestResetPasswordConfirm = async ({
  token,
  newPassword,
}) => {
  const res = await fetch(`${GATEWAY_PREFIX}/api/auth/v1.0/manage/reset-password/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};
