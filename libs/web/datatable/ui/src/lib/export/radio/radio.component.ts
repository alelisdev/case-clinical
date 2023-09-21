import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class TableRadioComponent {
  @Input() checked?: boolean
  @Input() title?: string
}
