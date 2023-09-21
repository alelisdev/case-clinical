


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CostCategory } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-cost-category-table-view',
  templateUrl: './web-cost-category-table-view.component.html'
 })
export class WebCostCategoryTableViewComponent
    {
  @Input() costCategories: CostCategory[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCostCategory($event) {
      if($event) {
        this.costCategories.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      costCategory,
    }: { costCategory?: CostCategory },
  ) {
    this.dialog.open(tpl, { data: { costCategory }, closeButton: false })
  }

}
