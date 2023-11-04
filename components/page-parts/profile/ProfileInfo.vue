<template>
  <div class="tab r-tabs-state-active">
    <div class="about">
      <!-- <p>
        О девушке, ее интересах и тд.подробное описание в несколько строк) Буду отравлять тебе нюдсы, фото и видео. Готова созваниваться по видео связи
      </p>-->
      <client-only>
        <table>
          <tr>
            <td>
              <p v-if="user.country">
                <span>Страна:</span>
                {{ user.country }}
              </p>
              <p v-if="user.city">
                <span>Город:</span>
                {{ user.city }}
              </p>
              <p>
                <span>Возраст:</span>
                {{ user.realAge }}
              </p>
            </td>
            <td>
              <p>
                <span>Язык:</span>
                {{ l }}
              </p>
              <p>
                <span>Услуги:</span>
                {{ s }}
              </p>
            </td>
          </tr>
        </table>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileInfo',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState('layout', ['services', 'langs']),

    s() {
      if (this.user.services.length > 0) {
        let str = ''
        this.user.services.forEach((item, i) => {
          str += this.services.find(child => child._id === item).name
          str += this.user.services.length > i && i != this.user.services.length - 1 ? ', ' : ''
        })

        return str
      }
      return ''
    },

    l() {
      if (this.user.languages.length > 0) {
        let str = ''
        this.user.languages.forEach((item, i) => {
          str += this.langs.find(child => child._id === item).name
          str += this.user.languages.length > i && i != this.user.languages.length - 1 ? ', ' : ''
        })

        return str
      }
      return ''
    }
  }
}
</script>
