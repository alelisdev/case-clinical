


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Insurance } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-insurance-table-view',
  templateUrl: './web-insurance-table-view.component.html'
 })
export class WebInsuranceTableViewComponent
    {
  @Input() insurances: Insurance[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createInsurance($event) {
      if($event) {
        this.insurances.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      insurance,
    }: { insurance?: Insurance },
  ) {
    this.dialog.open(tpl, { data: { insurance }, closeButton: false })
  }

}
