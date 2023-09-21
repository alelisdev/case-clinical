


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Contract } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contract-table-view',
  templateUrl: './web-contract-table-view.component.html'
 })
export class WebContractTableViewComponent
    {
  @Input() contracts: Contract[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContract($event) {
      if($event) {
        this.contracts.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contract,
    }: { contract?: Contract },
  ) {
    this.dialog.open(tpl, { data: { contract }, closeButton: false })
  }

}
