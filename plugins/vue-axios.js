export default (ctx, inject) => {
  const api = ctx.$axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 3000,
  });

  // api.interceptors.response.use(
  //   (response) => {
  //     if (response.user) console.log(response.user);
  //     return response;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  const token = ctx.$cookiz.get("token");
  if (token) {
    api.setHeader("Authorization", `Bearer ${token}`);
  }

  inject("api", api);
};
