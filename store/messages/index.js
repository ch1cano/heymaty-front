// import functions from "@/utils/functions";
const playIncoming = () => {
  const incoming = new Audio(require("@/assets/sounds/click.mp3").default);
  incoming.play();
};
const playDonation = () => {
  const incoming = new Audio(require("@/assets/sounds/donation.mp3").default);
  incoming.play();
};

const namespaced = true;

const state = () => ({
  messages: [],
  socket: null,
  myID: null,
  respondents: [],
  newMessagesCount: 0,
  newMessages: [],
  latestMessage: null,
  onlineUsers: [],
  isSoundAllowed: true,
});

const actions = {
  //Запомнить сокет
  // async setSocket({ commit }, data) {
  //   commit("SET_SOCKET", data);
  // },
  toggleSoundAllowed({ commit }) {
    commit("TOGGLE_SOUNDALLOWED");
  },
  async setRespOnline({ commit }, data) {
    const pl = {
      respid: data,
      responline: true,
    };
    commit("SET_RESPONDENT_STATUS", pl);
  },
  async setRespOffline({ commit }, data) {
    const pl = {
      respid: data,
      responline: false,
    };
    commit("SET_RESPONDENT_STATUS", pl);
  },
  async setFileError({ commit }, data) {
    commit("SET_FILE_ERROR", data);
  }, //Установить флаг ошибки загрузки файла
  async setFileSuccess({ commit }, data) {
    // this.$notify.success({
    //   title: data,
    //   // " " +
    //   // Math.random()
    //   //   .toString(36)
    //   //   .substr(2, 6),
    //   message: "Success!",
    // });
    commit("SET_FILE_SUCCESS", data);
  }, //Установить флаг успешной загрузки файла
  async addMessage({ commit, rootState, dispatch, state }, data) {
    const me = rootState.user.user;
    if (!data.msg) {
      commit("ADD_MESSAGE", data);
      if (me._id === data.to) {
        //TODO change message event from server to send full user object instead of id to remove this excessive call
        const from = await dispatch(
          "user/getUserById",
          {
            id: data.from,
          },
          { root: true }
        );
        //the message is for me
        if (data.donation) {
          const msg = this.$i18n.t("messagesNotifications.userDonated", {
            username: from.name,
          });
          this.$notify.success({
            title: this.$i18n.t("messagesNotifications.newDonationTitle"),
            message: msg,
          });
          this._vm.$notification.show(
            this.$i18n.t("messagesNotifications.newDonationTitle"),
            {
              body: msg,
            },
            {}
          );
          if (state.isSoundAllowed) playDonation();
        } else {
          this.$notify.info({
            title: this.$i18n.t("messagesNotifications.newMessageTitle", {
              username: from.name,
            }),
            message: data.message,
          });
          this._vm.$notification.show(
            this.$i18n.t("messagesNotifications.newMessageTitle", {
              username: from.name,
            }),
            {
              body: data.message,
            },
            {}
          );
          if (state.isSoundAllowed) playIncoming();
        }
      }
      // this.$notify.error({
      //   message: data,
      // });
      // console.log(data, rootState.user.user);
    }
    commit("CALCULATE_RESP");
    commit("INC_NEWMESSAGES");
  },
  async readMessage({ commit }, data) {
    commit("READ_MESSAGE", data);
    commit("CALCULATE_RESP");
    commit("DEC_NEWMESSAGES");
  },
  async setMessages({ commit }, data) {
    // console.log(data);
    commit("SET_MESSAGES", data.messages);
    commit("SET_ID", data.userId);
    commit("CALCULATE_RESP");
    data.respStatuses.forEach((st) => {
      commit("SET_RESPONDENT_STATUS", st);
    });
  },
  async resetMessages({ commit }) {
    commit("RESET_MESSAGES");
    commit("RESET_ID");
    commit("RESET_RESPONDENTS");
    commit("CALCULATE_RESP");
  },
};

const mutations = {
  // SET_SOCKET(state, payload) {
  //   state.socket = payload;
  // },
  TOGGLE_SOUNDALLOWED(state) {
    state.isSoundAllowed = !state.isSoundAllowed;
  },
  SET_FILE_ERROR(state, payload) {
    const mind = state.messages.findIndex((m) => {
      if (m.attachment) {
        return m.attachment.findIndex((i) => i.name === payload) !== -1;
      }
      return false;
    });
    if (mind !== -1) {
      const newmess = state.messages[mind];
      const aind = newmess.attachment.findIndex((i) => i.name === payload);
      if (aind !== -1) {
        newmess.attachment[aind].error = true;
      }
      state.messages.splice(mind, 1, newmess);
    }
  },
  SET_FILE_SUCCESS(state, payload) {
    console.log(payload + " starts", new Date());
    // const mind = state.messages.findIndex((m) => {
    //   if (m.attachment) {
    //     return m.attachment.findIndex((i) => i.name === payload) !== -1;
    //   }
    //   return false;
    // });
    // if (mind !== -1) {
    //   const newmess = state.messages[mind];
    //   const aind = newmess.attachment.findIndex((i) => i.name === payload);
    //   if (aind !== -1) {
    //     newmess.attachment[aind].uploaded = true;
    //   }
    //   state.messages.splice(mind, 1, newmess);
    // }

    state.messages = state.messages.map((message) => {
      const att = message.attachment.map((attach) => {
        return {
          ...attach,
          uploaded: attach.name === payload ? true : attach.uploaded,
        };
      });
      return { ...message, attachment: att };
    });
    console.log(payload + " ends", new Date());
  },
  INC_NEWMESSAGES(state) {
    state.newMessagesCount++;
  },
  DEC_NEWMESSAGES(state) {
    if (state.newMessagesCount) state.newMessagesCount--;
  },
  ADD_MESSAGE(state, payload) {
    console.log("new message starts", new Date());
    state.messages = [...state.messages, payload];
    if (payload.from !== state.myID)
      state.newMessages = [...state.newMessages, payload];
    if (payload.from !== state.myID) state.latestMessage = payload;
    console.log("new message ends", new Date());
  },
  READ_MESSAGE(state, payload) {
    const mId = state.newMessages.findIndex((m) => m._id === payload);
    if (mId !== -1) {
      state.newMessages.splice(mId, 1);
    }
  },
  SET_MESSAGES(state, payload) {
    state.messages = payload;
  },
  SET_ID(state, payload) {
    state.myID = payload;
  },
  RESET_MESSAGES(state) {
    state.messages = [];
  },
  RESET_RESPONDENTS(state) {
    state.respondents = [];
  },
  RESET_ID(state) {
    state.myID = null;
  },
  SET_RESPONDENT_STATUS(state, payload) {
    // payload = {
    //   respid: "ffsdfsdfsadfsdfsdf",
    //   responline: true,
    // }
    const rid = state.respondents.findIndex((r) => r.respid === payload.respid);
    if (rid !== -1) {
      state.respondents.splice(rid, 1, payload);
    }
    const oid = state.onlineUsers.findIndex((o) => o === payload.respid);
    if (payload.responline) {
      if (oid === -1) state.onlineUsers.push(payload.respid);
    } else {
      if (oid !== -1) state.onlineUsers.splice(oid, 1);
    }
  },
  CALCULATE_RESP(state) {
    const resp = [];
    state.messages.forEach((m) => {
      if (
        m.from !== state.myID &&
        state.respondents.findIndex((r) => r.respid === m.from) === -1
      )
        resp.push(m.from);
      if (
        m.to !== state.myID &&
        state.respondents.findIndex((r) => r.respid === m.to) === -1
      )
        resp.push(m.to);
    });
    const tmpresp = Array.from(new Set(resp));
    state.respondents = state.respondents.concat(
      tmpresp.map((r) => {
        return {
          respid: r,
          responline: false,
        };
      })
    );
  },
};

const getters = {
  getRespondents: (state) => {
    //TODO Sort respondents by most recent message
    const resp = [];
    state.messages.forEach((m) => {
      if (m.from !== state.myID) resp.push(m.from);
      if (m.to !== state.myID) resp.push(m.to);
    });
    return Array.from(new Set(resp));
  },
  getRespMessages: (state) => (id, search = "") => {
    const resp = [];
    state.messages.forEach((m) => {
      if (
        (m.from === id || m.to === id) &&
        m.message.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
        resp.push(m);
    });
    resp.sort((a, b) => {
      const aa = new Date(a.createdAt).getTime();
      const bb = new Date(b.createdAt).getTime();
      return aa - bb;
    });
    return resp;
  },
  getRespNewMessages: (state) => (id) => {
    const resp = [];
    state.newMessages.forEach((m) => {
      if (m.from === id || m.to === id) resp.push(m);
    });
    resp.sort((a, b) => {
      const aa = new Date(a.createdAt).getTime();
      const bb = new Date(b.createdAt).getTime();
      return aa - bb;
    });
    return resp;
  },
  isUserOnline: (state) => (id) => {
    return state.onlineUsers.includes(id);
  },
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
