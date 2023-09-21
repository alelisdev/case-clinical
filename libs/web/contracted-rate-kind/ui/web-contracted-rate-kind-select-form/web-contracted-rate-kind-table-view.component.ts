


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContractedRateKind } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contracted-rate-kind-table-view',
  templateUrl: './web-contracted-rate-kind-table-view.component.html'
 })
export class WebContractedRateKindTableViewComponent
    {
  @Input() contractedRateKinds: ContractedRateKind[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContractedRateKind($event) {
      if($event) {
        this.contractedRateKinds.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contractedRateKind,
    }: { contractedRateKind?: ContractedRateKind },
  ) {
    this.dialog.open(tpl, { data: { contractedRateKind }, closeButton: false })
  }

}
