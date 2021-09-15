/**
 * Used to check if user is logged or not.
 * @returns true if user is logged in & false if not.
 */
export const IsLoggedIn = () => {
    let token = localStorage.getItem('token');
    let login = localStorage.getItem('Login');
    let id = localStorage.getItem('Id');

    if (token && login && id) return true;
    else return false;
};