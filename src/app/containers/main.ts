import { Component } from '@angular/core';
import { AppBar } from '../components'

@Component({
  selector: 'main-container',
  directives: [ AppBar ],
  template: `
    <div>
      <app-bar></app-bar>
      <main class="main">
        content goes here
      </main>
    </div>
  `
})

export class Main {}
