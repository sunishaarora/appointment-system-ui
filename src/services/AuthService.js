import UserService from "../services/UserService";

const AuthService = {
    login: async (userId, password) => {
        if (userId === "0" && password === "ihavepower") {
            // Redirect admin to admin dashboard
            return "/admin/dashboard";
        } else if (/^\d+$/.test(userId) && password === "nopower") {
            // Redirect regular user to their dashboard
            return `/dashboard/${userId}`;
        } else {
            throw new Error("Invalid User ID or password");
        }
    },

    logout: () => {
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    isAdmin: () => {
        const user = AuthService.getCurrentUser();
        return user && user.userId === 0;
    },
};

export default AuthService;
