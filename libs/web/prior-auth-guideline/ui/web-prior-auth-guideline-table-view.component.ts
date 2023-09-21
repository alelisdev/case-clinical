


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorAuthGuideline } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-auth-guideline-table-view',
  templateUrl: './web-prior-auth-guideline-table-view.component.html'
 })
export class WebPriorAuthGuidelineTableViewComponent
    {
  @Input() priorAuthGuidelines: PriorAuthGuideline[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorAuthGuideline($event) {
      if($event) {
        this.priorAuthGuidelines.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorAuthGuideline,
    }: { priorAuthGuideline?: PriorAuthGuideline },
  ) {
    this.dialog.open(tpl, { data: { priorAuthGuideline }, closeButton: false })
  }

}
