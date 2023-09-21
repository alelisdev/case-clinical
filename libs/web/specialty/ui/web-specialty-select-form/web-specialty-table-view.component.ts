


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Specialty } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-specialty-table-view',
  templateUrl: './web-specialty-table-view.component.html'
 })
export class WebSpecialtyTableViewComponent
    {
  @Input() specialties: Specialty[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createSpecialty($event) {
      if($event) {
        this.specialties.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      specialty,
    }: { specialty?: Specialty },
  ) {
    this.dialog.open(tpl, { data: { specialty }, closeButton: false })
  }

}
