


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContractedRate } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contracted-rate-table-view',
  templateUrl: './web-contracted-rate-table-view.component.html'
 })
export class WebContractedRateTableViewComponent
    {
  @Input() contractedRates: ContractedRate[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContractedRate($event) {
      if($event) {
        this.contractedRates.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contractedRate,
    }: { contractedRate?: ContractedRate },
  ) {
    this.dialog.open(tpl, { data: { contractedRate }, closeButton: false })
  }

}
