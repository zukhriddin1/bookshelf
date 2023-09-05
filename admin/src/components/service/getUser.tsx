export default () => {
  if (typeof window !== "undefined") {
    const user = window.localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  }
  return null;
};
