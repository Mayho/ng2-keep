import { Component } from '@angular/core'
import { NoteCard } from '../components'

@Component({
  selector: 'notes-container',
  directives: [ NoteCard ],
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
        note creator here
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

export class Notes {
  notes = [
    { title: '2 chainz', value: 'saved rap', color: 'lightblue' },
    { title: 'Frank Ocean', value: 'dat Majin Buu', color: 'pink' },
    { title: 'A$AP Rocky', value: 'Everything is purple', color: 'purple' },
  ]

  onNoteChecked (note, i) {
    this.notes.splice(i, 1)
  }
}
