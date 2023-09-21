


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CaseType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-type-table-view',
  templateUrl: './web-case-type-table-view.component.html'
 })
export class WebCaseTypeTableViewComponent
    {
  @Input() caseTypes: CaseType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCaseType($event) {
      if($event) {
        this.caseTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      caseType,
    }: { caseType?: CaseType },
  ) {
    this.dialog.open(tpl, { data: { caseType }, closeButton: false })
  }

}
