


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ReconciliationPeriodType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-reconciliation-period-type-table-view',
  templateUrl: './web-reconciliation-period-type-table-view.component.html'
 })
export class WebReconciliationPeriodTypeTableViewComponent
    {
  @Input() reconciliationPeriodTypes: ReconciliationPeriodType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createReconciliationPeriodType($event) {
      if($event) {
        this.reconciliationPeriodTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      reconciliationPeriodType,
    }: { reconciliationPeriodType?: ReconciliationPeriodType },
  ) {
    this.dialog.open(tpl, { data: { reconciliationPeriodType }, closeButton: false })
  }

}
