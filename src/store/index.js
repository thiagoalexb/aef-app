import api from '../shared/api'
import * as changeCase from '../shared/changeCase'

export default {
  user: {
    getAll: api.get('user/get-all').then(data => changeCase.fromArray(data))
  }
}
