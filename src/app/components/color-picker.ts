import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'color-picker',
  styles: [`
    .color-selector {
      position: relative;
    }
    .selector {
      min-width: 120px;
      border: 1px solid lightgrey;
      padding: 10px;
      background-color: #efefef;
      position: absolute;
      top: -50px;
      left: 0;
    }
    .color {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .color:hover {
      border: 2px solid darkgrey;
    }
    .icon {
      font-size: 1.4rem;
      color: grey;
      cursor: pointer;
    }
  `],
  template: `
    <div class="color-selector">
      <i class="material-icons icon" (click)="toggleSelector(true)">color_lens</i>
      <div class="selector row center-xs" *ngIf="isSelectorVisible">
        <div
          class="color"
          *ngFor="let color of colors"
          [ngStyle]="{'background-color': color}"
          (click)="selectColor(color)"
        ></div>
      </div>
    </div>
  `
})

export class ColorPicker {
  @Input() colors: Array<string> = []
  @Output() colorSelected = new EventEmitter()

  isSelectorVisible: boolean = false
  toggleSelector (value: boolean) {
    this.isSelectorVisible = value
  }

  selectColor (color) {
    this.toggleSelector(false)
    this.colorSelected.next(color)
  }
}
