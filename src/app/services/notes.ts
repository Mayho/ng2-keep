import { Injectable } from '@angular/core'
import { ApiService } from './api'
import { StoreReducers } from './store-reducers'
import 'rxjs/Rx'

@Injectable()
export class NoteService {
  constructor (
    private apiService: ApiService,
    private storeReducers: StoreReducers
  ) {}
  path: string = '/notes'

  createNote (note) {
    return this.apiService.post(this.path, note)
      .do(savedNote => this.storeReducers.add('notes', savedNote))
  }

  getNotes () {
    return this.apiService.get(this.path)
      .do(res => this.storeReducers.update('notes', res.data))
  }

  completeNote (note) {
    return this.apiService.delete(`${this.path}/${note.id}`)
      .do(res => this.storeReducers.findAndDelete('notes', res.id))
  }
}
