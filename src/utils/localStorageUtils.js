const USER = 'user'


const localStorageUtils = {
    saveUser(user) {
        localStorage.setItem(USER, JSON.stringify(user));
    },

    getUser() {
        return JSON.parse(localStorage.getItem(USER));
    },

    deleteUser() {
        localStorage.removeItem(USER);
    }
}

export default localStorageUtils;