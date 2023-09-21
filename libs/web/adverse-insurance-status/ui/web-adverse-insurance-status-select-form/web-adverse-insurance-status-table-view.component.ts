


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AdverseInsuranceStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-adverse-insurance-status-table-view',
  templateUrl: './web-adverse-insurance-status-table-view.component.html'
 })
export class WebAdverseInsuranceStatusTableViewComponent
    {
  @Input() adverseInsuranceStatuses: AdverseInsuranceStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAdverseInsuranceStatus($event) {
      if($event) {
        this.adverseInsuranceStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      adverseInsuranceStatus,
    }: { adverseInsuranceStatus?: AdverseInsuranceStatus },
  ) {
    this.dialog.open(tpl, { data: { adverseInsuranceStatus }, closeButton: false })
  }

}
