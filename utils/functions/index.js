import dayjs from "dayjs";
export default {
  //get real age from DOB or fallback to age field
  getAge(user) {
    if (
      !Number.isFinite(user.personalDayOfBirth) ||
      !Number.isFinite(user.personalMonthOfBirth) ||
      !Number.isFinite(user.personalYearOfBirth)
    )
      return user.age;
    return dayjs().diff(
      dayjs()
        .year(user.personalYearOfBirth)
        .month(user.personalMonthOfBirth)
        .date(user.personalDayOfBirth)
        .hour(0)
        .minute(0)
        .second(0),
      "year"
    );
  },
  // Валидация e-mail
  isEmailValid(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    return email == "" ? false : reg.test(email) ? true : false;
  },

  // поиск родителя по классу
  findParent(el, cls) {
    while (
      (el = el.parentElement) &&
      !el.classList.contains(cls) /* eslint-disable-line */
    )
      return el; /* eslint-disable-line */
  },

  // return errors
  returnError(response) {
    const error = { response };
    let code, message, mes, data;
    if (error && error.response && error.response.response) {
      const response = error.response.response;
      code = response.status;
      mes = response.data.message;
      message = response.data.errors && response.data.errors.msg;
      data = response.data;
    } else {
      code = 500;
      message = "Сервер не доступен. Попробуйте позже!";
    }
    return { type: "error", code, data, message, mes };
  },

  priceFormat(price) {
    const str = price.toString();
    return str.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
  },

  decOfNum(number, titles) {
    const decCases = [2, 0, 1, 1, 1, 2];
    const index =
      number % 100 > 4 && number % 100 < 20
        ? 2
        : decCases[Math.min(number % 10, 5)];
    return titles[index];
  },

  returnPreview(file, wid, hei) {
    // let timeout = new Promise((resolve, reject) => {
    //   let id = setTimeout(() => {
    //     clearTimeout(id);
    //     reject("Skipping preview generation because of timeout");
    //   }, 5000);
    // });

    let mainpromise = new Promise((resolve, reject) => {
      if (file.type.indexOf("image") !== -1) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.src = reader.result;
          img.onload = function() {
            // если требуется проверка на размер
            if (wid && hei) {
              if (+this.width < wid || +this.heigth < hei) {
                reject(new Error());
              }
            }
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            resolve({ width, height, src: reader.result });
          };
        };
        reader.readAsDataURL(file);
      } else if (file.type.indexOf("video") !== -1) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = URL.createObjectURL(file);
        // video.src = e.target.result;
        video.onloadeddata = function() {
          // Get first frame
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const img = new Image();
          canvas.height = this.videoHeight;
          canvas.width = this.videoWidth;
          ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
          img.src = canvas.toDataURL();
          resolve({
            width: this.videoWidth,
            height: this.videoHeight,
            src: img.src,
          });
        };
        // video.onload = function() {
        //   console.log(this);
        //   resolve(reader.result);
        // };
        video.onerror = function(err) {
          reject(err);
        };
      } else {
        reject(new Error("Unknown file type"));
      }
    });
    // return Promise.race([mainpromise, timeout]);
    return mainpromise;
  },
};
