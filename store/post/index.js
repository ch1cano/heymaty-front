import functions from "@/utils/functions";
// import * as TYPES from './types'

const namespaced = true;

const state = () => ({
  openPosts: [],
  closedPosts: [],
  totalPagesOpen: null,
  totalPagesClosed: null,
  totalDocsOpen: null,
  totalDocsClosed: null,
  pageOpen: null,
  pageClosed: null,
  hasNextPageOpen: false,
  hasNextPageClosed: false,
  hasPrevPageOpen: false,
  hasPrevPageClosed: false,
  nextPageOpen: 1,
  nextPageClosed: 1,
  prevPageOpen: null,
  prevPageClosed: null,
  author: {},
  publicPostsLoading: true,
  openPostsLoading: false,
  closedPostsLoading: false,
  postPosting: false,
});

const actions = {
  // Отправить пост
  async postPost({ commit, state, dispatch }, postData) {
    try {
      commit("SET_POST_POSTING", true);
      const { post } = await dispatch("model/createPost", postData, {
        root: true,
      });
      // console.log(post, postData);
      commit("SET_POST_POSTING", false);
      commit("ADD_POSTS", [post]);
      if (post.isPublic) {
        commit("INC_TOTAL_OPEN_POSTS");
      } else {
        commit("INC_TOTAL_CLOSED_POSTS");
      }
      return post;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Удалить пост
  async deletePost({ commit }, post) {
    try {
      commit("SET_POST_POSTING", true);
      const data = await this.$api.delete(`/posts/${post._id}`);
      commit("SET_POST_POSTING", false);
      commit("REMOVE_POSTS", [post]);
      return data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Редактировать пост
  async editPost({ commit }, postData) {
    try {
      commit("SET_POST_POSTING", true);
      const { data } = await this.$api.patch(
        `/posts/${postData.id}`,
        postData.data
      );
      commit("SET_POST_POSTING", false);
      commit("REPLACE_POSTS", [data]);
      return data;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  // Получить конкретный пост
  async getPost({ commit }, postId) {
    try {
      const { data } = await this.$api.get("/posts/" + postId);
      commit("REPLACE_POSTS", [data.post]);
      return data.post;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить порцию открытых постов
  async getOpenPosts({ commit, state }) {
    try {
      commit("SET_OPEN_POSTS_LOADING", true);
      const params = {
        page: state.nextPageOpen,
      };
      const { data } = await this.$api.get(
        `/posts/all-public-posts/girl/${state.author._id}`,
        {
          params,
        }
      );
      commit("SET_OPEN_POSTS_LOADING", false);
      commit("ADD_POSTS", data.posts);
      commit("SET_OPEN_META", data);
      return data.posts;
    } catch (e) {
      return functions.returnError(e);
    }
  },


  //Получить порцию публичных постов для фида постов
  async getAllPublicPosts({ commit, state }) {
    try {
      const params = {
        page: state.nextPageOpen,
      };
      const { data } = await this.$api.get(
        `/posts/all-public-posts`, 
        {
          params,
        }
      );
      
      commit("ADD_POSTS", data.posts);
      commit("SET_PUBLIC_POSTS_LOADING", false);
      commit("SET_OPEN_META", data);
      return data.posts;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Получить порцию закрытых постов
  async getClosedPosts({ commit, state }) {
    try {
      commit("SET_CLOSED_POSTS_LOADING", true);
      const params = {
        page: state.nextPageClosed,
      };
      const { data } = await this.$api.get(
        `/posts/all-private-posts/girl/${state.author._id}`,
        {
          params,
        }
      );
      commit("SET_CLOSED_POSTS_LOADING", false);
      commit("ADD_POSTS", data.posts);
      commit("SET_CLOSED_META", data);
      return data.posts;
    } catch (e) {
      return functions.returnError(e);
    }
  },

  //Сбросить посты
  async resetPosts({ commit }) {
    try {
      commit("RESET_POSTS");
      return true;
    } catch (e) {
      return functions.returnError(e);
    }
  },
};

const mutations = {
  // done
  INC_TOTAL_OPEN_POSTS(state) {
    state.totalDocsOpen++;
  },
  // done
  INC_TOTAL_CLOSED_POSTS(state) {
    state.totalDocsClosed++;
  },
  // done
  SET_OPEN_POSTS_LOADING(state, payload) {
    state.openPostsLoading = payload;
  },
  SET_PUBLIC_POSTS_LOADING(state, payload) {
    state.publicPostsLoading = payload;
  },
  // done
  SET_CLOSED_POSTS_LOADING(state, payload) {
    state.closedPostsLoading = payload;
  },
  // done
  SET_POST_POSTING(state, payload) {
    state.postPosting = payload;
  },
  // done
  ADD_POSTS(state, payload) {
    payload.forEach((post) => {
      if (post.isPublic) {
        if (!state.openPosts.map((p) => p._id).includes(post._id))
          state.openPosts.push(post);
      } else {
        if (!state.closedPosts.map((p) => p._id).includes(post._id))
          state.closedPosts.push(post);
      }
    });
  },
  // done
  REMOVE_POSTS(state, payload) {
    payload.forEach((post) => {
      if (post.isPublic) {
        const ind = state.openPosts.findIndex((p) => p._id == post._id);
        if (ind !== -1) {
          state.openPosts.splice(ind, 1);
          state.totalDocsOpen--;
        }
      } else {
        const ind = state.closedPosts.findIndex((p) => p._id == post._id);
        if (ind !== -1) {
          state.closedPosts.splice(ind, 1);
          state.totalDocsClosed--;
        }
      }
    });
  },

  // done
  REPLACE_POSTS(state, payload) {
    payload.forEach((post) => {
      if (post.isPublic) {
        const ind = state.openPosts.findIndex((p) => p._id == post._id);
        if (ind !== -1) {
          state.openPosts.splice(ind, 1, post);
        }
      } else {
        const ind = state.closedPosts.findIndex((p) => p._id == post._id);
        if (ind !== -1) {
          state.closedPosts.splice(ind, 1, post);
        }
      }
    });
  },
  // done
  RESET_POSTS(state) {
    state.openPosts = [];
    state.closedPosts = [];
    state.totalPagesOpen = null;
    state.totalPagesClosed = null;
    state.totalDocsOpen = null;
    state.totalDocsClosed = null;
    state.pageOpen = null;
    state.pageClosed = null;
    state.hasNextPageOpen = false;
    state.hasNextPageClosed = false;
    state.hasPrevPageOpen = false;
    state.hasPrevPageClosed = false;
    state.nextPageOpen = 1;
    state.nextPageClosed = 1;
    state.prevPageOpen = null;
    state.prevPageClosed = null;
    state.author = {};
    state.openPostsLoading = false;
    state.closedPostsLoading = false;
    state.postPosting = false;
    state.publicPostsLoading = true
  },
  // done
  SET_OPEN_META(state, payload) {
    const { totalPages, currentPage, totalDocs } = payload;
    state.totalPagesOpen = totalPages;
    state.totalDocsOpen = totalDocs;
    // state.limit = limit;
    state.pageOpen = parseInt(currentPage);
    state.hasNextPageOpen = parseInt(totalPages) > parseInt(currentPage);
    // state.hasPrevPage = hasPrevPage;
    if (state.hasNextPageOpen) state.nextPageOpen = state.pageOpen + 1;
    // state.prevPage = prevPage;
  },
  // done
  SET_CLOSED_META(state, payload) {
    const { totalPages, currentPage, totalDocs } = payload;
    state.totalPagesClosed = totalPages;
    state.totalDocsClosed = totalDocs;
    // state.limit = limit;
    state.pageClosed = parseInt(currentPage);
    state.hasNextPageClosed = parseInt(totalPages) > parseInt(currentPage);
    // state.hasPrevPage = hasPrevPage;
    if (state.hasNextPageClosed) state.nextPageClosed = state.pageClosed + 1;
    // state.prevPage = prevPage;
  },
  // done
  SET_AUTHOR(state, payload) {
    state.author = { ...payload, realAge: functions.getAge(payload) };
  },
  // done
  REPLACE_AUTHOR_BUNDLE(state, payload) {
    const ind = state.author.bundles.findIndex((b) => b._id === payload._id);
    if (ind > -1) {
      if (payload.type === "limited" && payload.amount === 0) {
        return state.author.bundles.splice(ind, 1);
      }
      return state.author.bundles.splice(ind, 1, payload);
    }
  },
};

const getters = {
  // isLike: (state) => (id) => {
  //   const lind = state.likes.findIndex((l) => l === id);
  //   return lind !== -1;
  // },
  sortedOpenPosts: (state) => {
    return [...state.openPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },
  sortedClosedPosts: (state) => {
    return [...state.closedPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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
