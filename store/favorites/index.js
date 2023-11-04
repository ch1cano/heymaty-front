import functions from '@/utils/functions'
import * as TYPES from './types'

const namespaced = true

const state = () => ({
  favorites: []
})

const actions = {
  // Получить моделей добавленных в избранное
  async getMyFavorites ({ commit }, data) {
    try {
      const response = await this.$api.get('/favourites/mine')

      if (response && response.data) {
        commit(TYPES.SET_FAVORITES, response.data.favouriteModels)
      }

      return response.data
    } catch (e) {
      return functions.returnError(e)
    }
  },

  // Добавить в избранное
  async addFavorite ({ commit }, data) {
    try {
      const response = await this.$api.post('/favourites', data)
      if (response && response.data && response.data.favourite) {
        commit(TYPES.ADD_FAVORITE, response.data.favourite)
      }

      return response.data
    } catch (e) {
      return functions.returnError(e)
    }
  },

  // Убрать из избранного
  async deleteFavorite ({ commit }, data) {
    try {
      const response = await this.$api.delete(`/favourites/${data.id}`)
      if (response && response.data) {
        commit(TYPES.DELETE_FAVORITE, data.id)
      }

      return response.data
    } catch (e) {
      return functions.returnError(e)
    }
  }
}

const mutations = {
  [TYPES.RESET_FAVORITES] (state, payload) {
    state.favorites = []
  },

  [TYPES.SET_FAVORITES] (state, payload) {
    state.favorites = payload
  },

  [TYPES.DELETE_FAVORITE] (state, payload) {
    state.favorites.find((item, i) => {
      if (item._id === payload) {
        state.favorites.splice(i, 1)
        return true
      }
    })
  },

  [TYPES.ADD_FAVORITE] (state, payload) {
    const item = {
      ...payload,
      modelId: {
        _id: payload.modelId
      }
    }
    state.favorites.push(item)
  }
}

const getters = {
  isLike: state => (id) => {
    return !!state.favorites.find(item => item.modelId._id === id)
  },

  getFavoriteId: state => (id) => {
    return state.favorites.find(item => item.modelId._id === id)._id
  }
}

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters
}
