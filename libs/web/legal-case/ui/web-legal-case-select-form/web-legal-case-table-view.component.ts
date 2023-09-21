


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { LegalCase } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-legal-case-table-view',
  templateUrl: './web-legal-case-table-view.component.html'
 })
export class WebLegalCaseTableViewComponent
    {
  @Input() legalCases: LegalCase[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createLegalCase($event) {
      if($event) {
        this.legalCases.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      legalCase,
    }: { legalCase?: LegalCase },
  ) {
    this.dialog.open(tpl, { data: { legalCase }, closeButton: false })
  }

}
