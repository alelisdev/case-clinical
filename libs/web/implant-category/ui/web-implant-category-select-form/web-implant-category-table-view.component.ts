


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ImplantCategory } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-implant-category-table-view',
  templateUrl: './web-implant-category-table-view.component.html'
 })
export class WebImplantCategoryTableViewComponent
    {
  @Input() implantCategories: ImplantCategory[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createImplantCategory($event) {
      if($event) {
        this.implantCategories.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      implantCategory,
    }: { implantCategory?: ImplantCategory },
  ) {
    this.dialog.open(tpl, { data: { implantCategory }, closeButton: false })
  }

}
