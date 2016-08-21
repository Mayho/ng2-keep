import { Component, OnDestroy } from '@angular/core'
import { NoteCard, NoteCreator } from '../components'
import { NoteService } from '../services'

@Component({
  selector: 'notes-container',
  directives: [ NoteCard, NoteCreator ],
  styles: [`
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px;
    }
  `],
  template: `
    <div class="row center-xs notes">
      <div class="col-xs-6 creator">
        <note-creator (createNote)="onCreateNote($event)"></note-creator>
      </div>
      <div class="notes col-xs-8">
        <div class="row between-xs">
          <note-card
            class="col-xs-4"
            *ngFor="let note of notes; let i = index"
            (checked)="onNoteChecked($event, i)"
            [note]="note"
          >
          </note-card>
        </div>
      </div>
    </div>
  `
})

export class Notes implements OnDestroy {
  notes = []

  ngOnDestroy () {
    console.log('destroyed')
  }

  constructor(private noteService: NoteService) {
    this.noteService.getNotes()
      .subscribe(res => this.notes = res.data)
  }


  onNoteChecked (note, i) {
    this.noteService.completeNote(note)
      .subscribe(note => {
        const i = this.notes.findIndex(localNote => localNote.id === note.id)
        this.notes.splice(i, 1)
      })
  }

  onCreateNote (note) {
    this.noteService.createNote(note)
      .subscribe(note => this.notes.push(note))
  }
}
