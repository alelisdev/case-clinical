


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContactEmail } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contact-email-table-view',
  templateUrl: './web-contact-email-table-view.component.html'
 })
export class WebContactEmailTableViewComponent
    {
  @Input() contactEmails: ContactEmail[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContactEmail($event) {
      if($event) {
        this.contactEmails.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contactEmail,
    }: { contactEmail?: ContactEmail },
  ) {
    this.dialog.open(tpl, { data: { contactEmail }, closeButton: false })
  }

}
