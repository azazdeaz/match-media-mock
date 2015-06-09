import includes from 'lodash/collection/includes'
import pull from 'lodash/array/pull'
import mediaQuery from 'css-mediaquery'
import ExecutionEnvironment from 'exenv'


export default class MediaQueryListMock {
  constructor(query, getConfig) {
    this._getConfig = getConfig
    this._query = query
    this._listeners = []
  }

  get matches() {
    return mediaQuery.match(this._query, this._getConfig())
  }

  addListener(listener) {
    if (!ExecutionEnvironment.canUseDOM) {
      return
    }

    if (!includes(this._listeners, listener)) {
      this._listeners.push(listener)
    }
  }

  removeListener(listener) {
    pull(this._listeners, listener)
  }

  callListeners() {
    this._listeners.forEach(listener => listener(this))
  }
}
