


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { RequiredField } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-required-field-table-view',
  templateUrl: './web-required-field-table-view.component.html'
 })
export class WebRequiredFieldTableViewComponent
    {
  @Input() requiredFields: RequiredField[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRequiredField($event) {
      if($event) {
        this.requiredFields.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      requiredField,
    }: { requiredField?: RequiredField },
  ) {
    this.dialog.open(tpl, { data: { requiredField }, closeButton: false })
  }

}
