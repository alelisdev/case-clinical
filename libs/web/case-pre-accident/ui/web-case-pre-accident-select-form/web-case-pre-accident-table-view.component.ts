


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CasePreAccident } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-pre-accident-table-view',
  templateUrl: './web-case-pre-accident-table-view.component.html'
 })
export class WebCasePreAccidentTableViewComponent
    {
  @Input() casePreAccidents: CasePreAccident[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCasePreAccident($event) {
      if($event) {
        this.casePreAccidents.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      casePreAccident,
    }: { casePreAccident?: CasePreAccident },
  ) {
    this.dialog.open(tpl, { data: { casePreAccident }, closeButton: false })
  }

}
