import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ru')
dayjs.extend(utc)
dayjs.extend(relativeTime)

Vue.prototype.$dayjs = dayjs
