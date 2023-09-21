


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Category } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-category-table-view',
  templateUrl: './web-category-table-view.component.html'
 })
export class WebCategoryTableViewComponent
    {
  @Input() categories: Category[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCategory($event) {
      if($event) {
        this.categories.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      category,
    }: { category?: Category },
  ) {
    this.dialog.open(tpl, { data: { category }, closeButton: false })
  }

}
