import imageCompression from "browser-image-compression";

export default (ctx, inject) => {
  // const socket = ctx.$nuxtSocket({
  //   name: "messages",
  // });
  // const uploader = new SocketIOFileUpload(socket);
  inject("icomp", imageCompression);
};
