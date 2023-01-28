import 'module-alias/register'
import 'source-map-support/register'

import runApp from '@/helpers/runApp'
import startMonitoringMints from '@/helpers/startMonitoringMints'
import startMonitoringUsers from '@/helpers/startMonitoringUsers'

void (async () => {
  console.log('Starting server...')
  await startMonitoringMints()
  console.log('Started monitoring mints')
  await startMonitoringUsers()
  console.log('Started monitoring users')
  await runApp()
  console.log('Started server')
})()
