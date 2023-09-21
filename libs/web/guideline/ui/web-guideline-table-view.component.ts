


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Guideline } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-guideline-table-view',
  templateUrl: './web-guideline-table-view.component.html'
 })
export class WebGuidelineTableViewComponent
    {
  @Input() guidelines: Guideline[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createGuideline($event) {
      if($event) {
        this.guidelines.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      guideline,
    }: { guideline?: Guideline },
  ) {
    this.dialog.open(tpl, { data: { guideline }, closeButton: false })
  }

}
