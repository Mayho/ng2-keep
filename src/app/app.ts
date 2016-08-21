import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

@Component({
  selector: 'app',
  directives: [ ...ROUTER_DIRECTIVES ],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})

export class App {}
