const SocketIOFileUpload = require("socketio-file-upload");

export default (ctx, inject) => {
  // const socket = ctx.$nuxtSocket({
  //   name: "messages",
  // });
  // const uploader = new SocketIOFileUpload(socket);
  inject("siofu", SocketIOFileUpload);
};
