


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { RecommendedOrderAuthorization } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-recommended-order-authorization-table-view',
  templateUrl: './web-recommended-order-authorization-table-view.component.html'
 })
export class WebRecommendedOrderAuthorizationTableViewComponent
    {
  @Input() recommendedOrderAuthorizations: RecommendedOrderAuthorization[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRecommendedOrderAuthorization($event) {
      if($event) {
        this.recommendedOrderAuthorizations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      recommendedOrderAuthorization,
    }: { recommendedOrderAuthorization?: RecommendedOrderAuthorization },
  ) {
    this.dialog.open(tpl, { data: { recommendedOrderAuthorization }, closeButton: false })
  }

}
