


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AgreementType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-agreement-type-table-view',
  templateUrl: './web-agreement-type-table-view.component.html'
 })
export class WebAgreementTypeTableViewComponent
    {
  @Input() agreementTypes: AgreementType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAgreementType($event) {
      if($event) {
        this.agreementTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      agreementType,
    }: { agreementType?: AgreementType },
  ) {
    this.dialog.open(tpl, { data: { agreementType }, closeButton: false })
  }

}
