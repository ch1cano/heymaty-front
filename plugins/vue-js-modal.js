import Vue from "vue";
import VModal from "vue-js-modal/dist/ssr.nocss";

import "vue-js-modal/dist/styles.css";

Vue.use(VModal, {
  dynamicDefaults: {
    adaptive: true,
    width: "50%",
    height: "auto",
    shiftX: 0.5,
  },
});
