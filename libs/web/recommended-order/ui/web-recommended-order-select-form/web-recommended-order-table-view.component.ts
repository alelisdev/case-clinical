


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { RecommendedOrder } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-recommended-order-table-view',
  templateUrl: './web-recommended-order-table-view.component.html'
 })
export class WebRecommendedOrderTableViewComponent
    {
  @Input() recommendedOrders: RecommendedOrder[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRecommendedOrder($event) {
      if($event) {
        this.recommendedOrders.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      recommendedOrder,
    }: { recommendedOrder?: RecommendedOrder },
  ) {
    this.dialog.open(tpl, { data: { recommendedOrder }, closeButton: false })
  }

}
