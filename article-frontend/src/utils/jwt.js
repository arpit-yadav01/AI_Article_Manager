import Cookies from 'js-cookie';

// Function to set the JWT token in cookies
export const setToken = (token) => {
    Cookies.set('token', token, { expires: 7, secure: true }); // Expires in 7 days
};

// Function to get the JWT token from cookies
export const getToken = () => {
    return Cookies.get('token');
};

// Function to remove the JWT token from cookies
export const removeToken = () => {
    Cookies.remove('token');
};
