import { Injectable } from '@angular/core'
import { ApiService } from './api'

@Injectable()
export class NoteService {
  constructor(private apiService: ApiService) {}
  path: string = '/notes'

  createNote (note) {
    return this.apiService.post(this.path, note)
  }

  getNotes () {
    return this.apiService.get(this.path)
  }

  completeNote (note) {
    return this.apiService.delete(`${this.path}/${note.id}`)
  }
}
