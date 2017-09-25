import set from 'lib/set'
import query from 'lib/query'
import config, { getId, useNamedTrackers } from './config'
import { getTracker } from './helpers'

export default function createTrackers () {
  const ids = getId()

  if (config.debug.enabled) {
    window.ga_debug = {
      trace: config.debug.trace
    }
  }

  ids.forEach(function (id) {
    const name = getTracker(id)
    const options = useNamedTrackers() ? { ...config.fields, name } : config.fields

    window.ga('create', id, 'auto', options)
  })

  config.beforeFirstHit()

  if (config.linkers.length > 0) {
    query('require', 'linker')
    query('linker:autoLink', config.linkers)
  }

  if (!config.debug.sendHitTask) {
    set('sendHitTask', null)
  }
}
