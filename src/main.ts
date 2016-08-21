import { bootstrap } from '@angular/platform-browser-dynamic'
import { HTTP_PROVIDERS } from '@angular/http'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { App, providers } from './app'

bootstrap(App, [
  ...HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  ...providers
])
