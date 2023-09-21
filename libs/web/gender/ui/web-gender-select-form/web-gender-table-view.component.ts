


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Gender } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-gender-table-view',
  templateUrl: './web-gender-table-view.component.html'
 })
export class WebGenderTableViewComponent
    {
  @Input() genders: Gender[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createGender($event) {
      if($event) {
        this.genders.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      gender,
    }: { gender?: Gender },
  ) {
    this.dialog.open(tpl, { data: { gender }, closeButton: false })
  }

}
