import { Component, Output, EventEmitter } from '@angular/core'
import { ColorPicker } from './color-picker'

@Component({
  selector: 'note-creator',
  directives: [ ColorPicker ],
  styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
  `],
  template: `
    <div class="note-creator shadow-2" [ngStyle]="{'background-color': newNote.color}">
      <form class="row" (submit)="handleSubmit()">
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="formIsExpanded"
        >
        <input
          type="text"
          (focus)="toggleForm(true)"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div class="actions col-xs-12 row between-xs" *ngIf="formIsExpanded">
          <div class="col-xs-3">
            <color-picker
              [colors]="colors"
              (colorSelected)="handleColorSelected($event)"
            ></color-picker>
          </div>
          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    </div>
  `
})

export class NoteCreator {
  @Output() createNote = new EventEmitter()

  colors: Array<string> = ['#b19cd9', '#ff9691', '#77dd77', '#aec6cf', '#f49ac2', 'white']

  newNote = {
    title: '',
    value: '',
    color: 'white'
  }

  formIsExpanded: boolean = false

  toggleForm (value: boolean) {
    this.formIsExpanded = value
  }

  handleSubmit () {
    const { title, value, color } = this.newNote
    if (title && value) {
      this.createNote.next({title, value, color})
      this.resetNote()
    }
  }

  handleColorSelected (color: string) {
    this.newNote.color = color
  }

  resetNote () {
    this.newNote = {
      title: '',
      value: '',
      color: 'white'
    }
  }
}
