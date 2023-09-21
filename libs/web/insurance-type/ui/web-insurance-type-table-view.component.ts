


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { InsuranceType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-insurance-type-table-view',
  templateUrl: './web-insurance-type-table-view.component.html'
 })
export class WebInsuranceTypeTableViewComponent
    {
  @Input() insuranceTypes: InsuranceType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createInsuranceType($event) {
      if($event) {
        this.insuranceTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      insuranceType,
    }: { insuranceType?: InsuranceType },
  ) {
    this.dialog.open(tpl, { data: { insuranceType }, closeButton: false })
  }

}
