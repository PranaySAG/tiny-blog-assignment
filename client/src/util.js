const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

export { getCurrentUser };
