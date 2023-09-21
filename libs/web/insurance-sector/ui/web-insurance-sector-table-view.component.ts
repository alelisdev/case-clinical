


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { InsuranceSector } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-insurance-sector-table-view',
  templateUrl: './web-insurance-sector-table-view.component.html'
 })
export class WebInsuranceSectorTableViewComponent
    {
  @Input() insuranceSectors: InsuranceSector[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createInsuranceSector($event) {
      if($event) {
        this.insuranceSectors.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      insuranceSector,
    }: { insuranceSector?: InsuranceSector },
  ) {
    this.dialog.open(tpl, { data: { insuranceSector }, closeButton: false })
  }

}
