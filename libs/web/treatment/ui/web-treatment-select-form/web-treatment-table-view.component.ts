


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Treatment } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-treatment-table-view',
  templateUrl: './web-treatment-table-view.component.html'
 })
export class WebTreatmentTableViewComponent
    {
  @Input() treatments: Treatment[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTreatment($event) {
      if($event) {
        this.treatments.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      treatment,
    }: { treatment?: Treatment },
  ) {
    this.dialog.open(tpl, { data: { treatment }, closeButton: false })
  }

}
