


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CasePreInjury } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-case-pre-injury-table-view',
  templateUrl: './web-case-pre-injury-table-view.component.html'
 })
export class WebCasePreInjuryTableViewComponent
    {
  @Input() casePreInjuries: CasePreInjury[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCasePreInjury($event) {
      if($event) {
        this.casePreInjuries.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      casePreInjury,
    }: { casePreInjury?: CasePreInjury },
  ) {
    this.dialog.open(tpl, { data: { casePreInjury }, closeButton: false })
  }

}
