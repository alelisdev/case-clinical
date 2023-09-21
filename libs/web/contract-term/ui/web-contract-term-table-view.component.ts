


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContractTerm } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contract-term-table-view',
  templateUrl: './web-contract-term-table-view.component.html'
 })
export class WebContractTermTableViewComponent
    {
  @Input() contractTerms: ContractTerm[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContractTerm($event) {
      if($event) {
        this.contractTerms.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contractTerm,
    }: { contractTerm?: ContractTerm },
  ) {
    this.dialog.open(tpl, { data: { contractTerm }, closeButton: false })
  }

}
