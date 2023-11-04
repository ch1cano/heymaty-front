export default ({ store, route, redirect, localePath }) => {
  const auth = store.getters["user/auth"];
  const role = store.getters["user/getRole"];
  const verified = store.getters["user/getVerified"];

  const verifyPage = /^Verify/g;
  const favPage = /^Favorites/g;
  const dialogesPage = /^Dialoges/g;
  const settingsPage = /^Settings/g;

  // console.log(route, auth, verified, verifyPage.test(route.name));
  if (verifyPage.test(route.name) && auth && verified) {
    return redirect(localePath("/"));
  }
  if (verifyPage.test(route.name) && !auth) {
    return redirect(localePath("/"));
  }

  if (
    role === "girl" &&
    !verified &&
    (favPage.test(route.name) ||
      dialogesPage.test(route.name) ||
      settingsPage.test(route.name))
  ) {
    return redirect(localePath("/Verify"));
  }

  if (
    (favPage.test(route.name) ||
      dialogesPage.test(route.name) ||
      settingsPage.test(route.name)) &&
    !auth
  ) {
    return redirect(localePath("/"));
    // } else if (route.fullPath === "/profile" && !auth) {
    //   redirect("/");
    // } else if (route.fullPath === "/profile" && role === "girl" && !verified) {
    //   redirect("/verify");
    // } else if (
    //   route.fullPath.includes("/dialoges") &&
    //   (!auth || (role === "girl" && !verified))
    // ) {
    //   redirect("/");
  }
};
