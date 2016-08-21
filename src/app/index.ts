export { App } from './app'
import * as services from './services'

const mapValuesToArray = obj => Object.keys(obj).map(key => obj[key])

export const providers = [
  ...mapValuesToArray(services)
]
