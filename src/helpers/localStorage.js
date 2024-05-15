export const getAuthenticated = () => {
    return localStorage.getItem('admin_authenticated');
};

export const setAuthenticated = () => {
    localStorage.setItem('admin_authenticated', 'yes');
};

export const removeAuthenticated = () => {
    localStorage.removeItem('admin_authenticated');
};