


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { GuidelineUsed } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-guideline-used-table-view',
  templateUrl: './web-guideline-used-table-view.component.html'
 })
export class WebGuidelineUsedTableViewComponent
    {
  @Input() guidelineUseds: GuidelineUsed[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createGuidelineUsed($event) {
      if($event) {
        this.guidelineUseds.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      guidelineUsed,
    }: { guidelineUsed?: GuidelineUsed },
  ) {
    this.dialog.open(tpl, { data: { guidelineUsed }, closeButton: false })
  }

}
