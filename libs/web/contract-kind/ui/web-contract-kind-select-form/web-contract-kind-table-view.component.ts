


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContractKind } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contract-kind-table-view',
  templateUrl: './web-contract-kind-table-view.component.html'
 })
export class WebContractKindTableViewComponent
    {
  @Input() contractKinds: ContractKind[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContractKind($event) {
      if($event) {
        this.contractKinds.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contractKind,
    }: { contractKind?: ContractKind },
  ) {
    this.dialog.open(tpl, { data: { contractKind }, closeButton: false })
  }

}
