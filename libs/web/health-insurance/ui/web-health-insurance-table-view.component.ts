


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { HealthInsurance } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-health-insurance-table-view',
  templateUrl: './web-health-insurance-table-view.component.html'
 })
export class WebHealthInsuranceTableViewComponent
    {
  @Input() healthInsurances: HealthInsurance[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createHealthInsurance($event) {
      if($event) {
        this.healthInsurances.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      healthInsurance,
    }: { healthInsurance?: HealthInsurance },
  ) {
    this.dialog.open(tpl, { data: { healthInsurance }, closeButton: false })
  }

}
