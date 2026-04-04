export const saveToken = (token) => sessionStorage.setItem('token', token);
export const getToken = () => sessionStorage.getItem('token');
export const removeToken = () => sessionStorage.removeItem('token');

export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { email: payload.sub, role: payload.role, name: payload.name };
  } catch {
    return null;
  }
};

export const isLoggedIn = () => !!getToken();
