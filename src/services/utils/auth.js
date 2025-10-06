const setToken = (token) => localStorage.setItem('morgage-portal-token', token);

const getToken = () => localStorage.getItem('morgage-portal-token');

const removeToken = () => localStorage.removeItem('morgage-portal-token');

const isAuthenticated = () => !!getToken();