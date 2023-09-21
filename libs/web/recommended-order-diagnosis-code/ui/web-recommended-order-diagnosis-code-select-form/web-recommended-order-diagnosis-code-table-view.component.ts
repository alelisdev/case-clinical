


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { RecommendedOrderDiagnosisCode } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-recommended-order-diagnosis-code-table-view',
  templateUrl: './web-recommended-order-diagnosis-code-table-view.component.html'
 })
export class WebRecommendedOrderDiagnosisCodeTableViewComponent
    {
  @Input() recommendedOrderDiagnosisCodes: RecommendedOrderDiagnosisCode[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRecommendedOrderDiagnosisCode($event) {
      if($event) {
        this.recommendedOrderDiagnosisCodes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      recommendedOrderDiagnosisCode,
    }: { recommendedOrderDiagnosisCode?: RecommendedOrderDiagnosisCode },
  ) {
    this.dialog.open(tpl, { data: { recommendedOrderDiagnosisCode }, closeButton: false })
  }

}
