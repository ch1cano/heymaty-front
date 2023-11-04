import functions from "@/utils/functions";
// import * as TYPES from './types'

const namespaced = true;

const state = () => ({
  comments: [],
  totalPages: null,
  totalDocs: null,
  limit: 5,
  page: null,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: 1,
  prevPage: null,
  postId: null,
  commentsLoading: false,
  commentPosting: false,
  mentionSuggestion: "",
});

const actions = {
  // Отправить комментарий
  async postComment({ commit, state }, postData) {
    try {
      commit("SET_COMMENT_POSTING", true);
      postData.postId = state.postId;
      const { data } = await this.$api.post("/comments", postData);
      commit("SET_COMMENT_POSTING", false);
      commit("ADD_COMMENTS", [data.newComment]);
      commit("INC_TOTAL_COMMENTS");
      return data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Отправить комментарий
  async deleteComment({ commit }, commentId) {
    try {
      commit("SET_COMMENT_POSTING", true);
      const { data } = await this.$api.delete("/comments/" + commentId);
      commit("SET_COMMENT_POSTING", false);
      commit("REMOVE_COMMENTS", [commentId]);
      commit("DEC_TOTAL_COMMENTS");
      return data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить все комменты на пост
  async getComments({ commit, state }) {
    try {
      commit("SET_COMMENTS_LOADING", true);
      const params = {
        page: state.nextPage,
        limit: state.limit,
      };
      const { data } = await this.$api.get("/comments/post/" + state.postId, {
        params,
      });
      commit("SET_COMMENTS_LOADING", false);
      commit("ADD_COMMENTS", data.comments.docs);
      commit("SET_META", data.comments);
      return data.docs;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Сбросить комменты
  async resetComments({ commit }) {
    try {
      commit("RESET_COMMENTS");
      return true;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Установить упоминание
  async setMentionSuggestion({ commit }, mention) {
    try {
      commit("SET_MENTION_SUGGESTION", mention);
      return true;
    } catch (e) {
      return functions.returnError(e);
    }
  },
};

const mutations = {
  INC_TOTAL_COMMENTS(state) {
    state.totalDocs++;
  },
  DEC_TOTAL_COMMENTS(state) {
    state.totalDocs--;
  },
  SET_MENTION_SUGGESTION(state, payload) {
    state.mentionSuggestion = payload;
  },
  SET_COMMENTS_LOADING(state, payload) {
    state.commentsLoading = payload;
  },
  SET_COMMENT_POSTING(state, payload) {
    state.commentPosting = payload;
  },
  ADD_COMMENTS(state, payload) {
    payload.forEach((c) => {
      if (!state.comments.map((cc) => cc._id).includes(c._id))
        state.comments.push(c);
    });
  },
  REMOVE_COMMENTS(state, payload) {
    payload.forEach((c) => {
      const ind = state.comments.findIndex((cc) => cc._id == c);
      if (ind !== -1) state.comments.splice(ind, 1);
    });
  },
  RESET_COMMENTS(state) {
    state.comments = [];
    state.totalPages = null;
    state.totalDocs = null;
    state.limit = 5;
    state.page = null;
    state.hasNextPage = false;
    state.hasPrevPage = false;
    state.nextPage = 1;
    state.prevPage = null;
    state.postId = null;
    state.commentsLoading = false;
    state.commentPosting = false;
    store.mentionSuggestion = "";
  },
  SET_META(state, payload) {
    const {
      totalPages,
      totalDocs,
      limit,
      page,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    } = payload;
    state.totalPages = totalPages;
    state.totalDocs = totalDocs;
    state.limit = limit;
    state.page = page;
    state.hasNextPage = hasNextPage;
    state.hasPrevPage = hasPrevPage;
    state.nextPage = nextPage;
    state.prevPage = prevPage;
  },
  SET_POST_ID(state, payload) {
    state.postId = payload;
  },
};

const getters = {
  // isLike: (state) => (id) => {
  //   const lind = state.likes.findIndex((l) => l === id);
  //   return lind !== -1;
  // },
  sortedComments: (state) => {
    return [...state.comments].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  },
};

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters,
};
