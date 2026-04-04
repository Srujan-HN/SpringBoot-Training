import { getToken } from '../utils/auth';

const BASE = '';

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const register = (data) =>
  fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const login = (data) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getAllFiles = () =>
  fetch(`${BASE}/files`, { headers: authHeaders() });

export const getMyFiles = () =>
  fetch(`${BASE}/files/my-files`, { headers: authHeaders() });

export const uploadFile = (file) => {
  const form = new FormData();
  form.append('file', file);
  return fetch(`${BASE}/files/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  });
};

export const updateFile = (id, file) => {
  const form = new FormData();
  form.append('file', file);
  return fetch(`${BASE}/files/update/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: form,
  });
};

export const deleteFile = (id) =>
  fetch(`${BASE}/files/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

export const downloadUrl = (id) => `${BASE}/files/download/${id}`;
export const previewUrl = (id) => `${BASE}/files/preview/${id}`;
