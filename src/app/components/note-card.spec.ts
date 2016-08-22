import { inject, async } from '@angular/core/testing'
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing'
import { Component } from '@angular/core'
import { NoteCard } from './note-card'

@Component({
  selector: 'note-card-test',
  directives: [ NoteCard ],
  template: '<note-card [note]="note"></note-card>'
})

class TestComponent {
  note = {
    title: 'title',
    value: 'note',
    color: 'red',
    id: 1
  }
}

describe('NoteCard', () => {
  let builder: TestComponentBuilder
  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb
  }))

  it('should display the correct title', async(() => {
    builder.createAsync(TestComponent)
    .then((fixture: ComponentFixture<TestComponent>) => {
      const title = fixture.nativeElement.querySelector('.title')
      fixture.detectChanges()

      expect(title.textContent.trim()).toEqual('title')
    })
  }))

  it('should toggle checkmark on mouse enter/leave events', async(() => {
    builder.createAsync(TestComponent)
    .then((fixture: ComponentFixture<TestComponent>) => {
      const noteCard = fixture.nativeElement.querySelector('.note-card')
      fixture.detectChanges()

      const eventObj = document.createEvent('MouseEvents')
      eventObj.initEvent('mouseenter', true, false)
      noteCard.dispatchEvent(eventObj)
      fixture.detectChanges()

      let check = noteCard.querySelector('.icon')
      expect(check).toBeTruthy()

      eventObj.initEvent('mouseenter', true, false)
      noteCard.dispatchEvent(eventObj)
      fixture.detectChanges()

      check = noteCard.querySelector('.icon')
      expect(check).toBeNull()
    })
  }))

})
