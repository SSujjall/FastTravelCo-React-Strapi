export const authService = {
  isLoggedIn() {
    const token = localStorage.getItem("jwt");
    return !!token; // Returns true if token exists
  },

  getToken() {
    return localStorage.getItem("jwt");
  },

  login(jwt) {
    localStorage.setItem("jwt", jwt);
  },

  logout() {
    localStorage.removeItem("jwt");
  },
};
