import Vue from "vue";
import GAuth from "vue-google-oauth2";

// New one for heymaty.com
const gauthOption = {
  clientId:
    "293214253824-rkfdl6o7bkerbp095vldhv3s6311vgtr.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
// Old one for heydaddy.io
// const gauthOption = {
//   clientId: '910146962607-lfvbdivom2bumcdst5p1gt2ua5a0u052.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }

Vue.use(GAuth, gauthOption);
