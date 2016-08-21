import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'
import 'rxjs/add/observable/throw'

@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })

  api_url: string = 'http://localhost:3500'

  constructor (private http: Http) {}

  private getJSON(response: Response) {
    return response.json()
  }

  private checkForError(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var err = new Error(response.statusText)
      err['response'] = response
      console.error(err)
      throw err
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJSON)
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJSON)
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJSON)
  }

  setHeaders (headers) {
    Object.keys(headers)
    .forEach(header => this.headers.set(header, headers[header]))
  }
}
