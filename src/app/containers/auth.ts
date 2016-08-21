import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services'

@Component({
  selector: 'auth-container',
  styles: [`
    .auth {
      height: 100%;
    }
    input {
      border-bottom: 1px solid lightgrey;
    }
    .ng-invalid.ng-dirty {
      border-bottom: 1px solid red;
    }
    form {
      width: 100%;
      border-radius: 2px;
      background-color: white;
      padding: 20px;
      height: 400px;
    }
    .inputs {
      height: 100%;
      position: relative;
    }
    .link {
      color: lightblue;
    }
    .link:hover {
      background-color: transparent;
    }
    .title {
      font-size: 36px;
      font-weight: 300;
      text-transform: capitalize;
    }
    .error {
      color: red;
      position: relative;
      right: 20px;
    }
	`],
  template: `
    <div class="auth row center-xs middle-xs">
      <form class="col-xs-6 shadow-2" (submit)="authenticate()" #authForm="ngForm">
        <div class="inputs row center-xs middle-xs">
          <h3 class="col-xs-8 title">
            {{ mode }}
          </h3>
          <input
            class="col-xs-8"
            type="email"
            name="email"
            required
            [(ngModel)]="user.email"
            #email="ngModel"
            placeholder="email"
          >
          <div class="error" [hidden]="email.valid || email.pristine">
            Invalid email
          </div>
          <input
            class="col-xs-8"
            type="password"
            name="password"
            required
            [(ngModel)]="user.password"
            #password="ngModel"
            placeholder="password"
          >
          <div class="error" [hidden]="password.valid || password.pristine">
            Password is required
          </div>
          <div class="actions col-xs-12">
            <div class="row center-xs">
              <button [disabled]="!authForm.form.valid" type="submit" class="btn-light">
                {{ mode }}
              </button>
              <a class="btn-light link" (click)="toggleMode()">
                {{ linkText }}
              </a>
           </div>
         </div>
        </div>
      </form>
    </div>
  `
})

export class Auth {
  user = {
    email: '',
    password: ''
  }
  mode: string = 'signin'
  linkText: string = 'Don\'t have an account?'

  constructor (private router: Router, private authService: AuthService) {}

  toggleMode () {
    if (this.mode === 'signin') {
      this.mode = 'signup'
      this.linkText = 'Already have an account?'
    } else {
      this.mode = 'signin'
      this.linkText = 'Don\'t have an account?'
    }
  }

  authenticate () {
    this.authService.authenticate(this.mode, this.user)
    .subscribe(() => this.router.navigate(['']))
  }

}
