export const setToken = (token) => localStorage.setItem('morgage-portal-token', token);

export const getToken = () => localStorage.getItem('morgage-portal-token');

export const removeToken = () => localStorage.removeItem('morgage-portal-token');

export const isAuthenticated = () => !!getToken();

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER'
  } catch (error) {
    console.log('role extraction from token error', error)
    return null;
  }
}