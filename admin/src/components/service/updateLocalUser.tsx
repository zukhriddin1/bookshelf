export default (user: any) => {
  if (user) {
    window.localStorage.setItem("user", JSON.stringify(user));
  } else {
    window.localStorage.removeItemo("user");
  }
};
