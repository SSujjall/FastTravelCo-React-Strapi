export const authService = {
  isLoggedIn() {
    const token = localStorage.getItem("jwt");
    return !!token; // Returns true if token exists
  },

  getToken() {
    return localStorage.getItem("jwt");
  },

  getUsername() {
    return localStorage.getItem("username");
  },

  login(jwt, username) {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("username", username);
  },

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  },
};
