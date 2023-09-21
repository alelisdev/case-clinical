


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContactPhoneNumber } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contact-phone-number-table-view',
  templateUrl: './web-contact-phone-number-table-view.component.html'
 })
export class WebContactPhoneNumberTableViewComponent
    {
  @Input() contactPhoneNumbers: ContactPhoneNumber[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContactPhoneNumber($event) {
      if($event) {
        this.contactPhoneNumbers.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contactPhoneNumber,
    }: { contactPhoneNumber?: ContactPhoneNumber },
  ) {
    this.dialog.open(tpl, { data: { contactPhoneNumber }, closeButton: false })
  }

}
