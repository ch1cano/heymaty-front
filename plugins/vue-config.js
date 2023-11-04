import Functions from '@/utils/functions'
import ErrorsTypes from '@/config/errors'
import Conf from '@/config'

export default (ctx, inject) => {
  inject('funcs', Functions)
  inject('errors_types', ErrorsTypes)
  inject('conf', Conf)
}
