


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Contact } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contact-table-view',
  templateUrl: './web-contact-table-view.component.html'
 })
export class WebContactTableViewComponent
    {
  @Input() contacts: Contact[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContact($event) {
      if($event) {
        this.contacts.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contact,
    }: { contact?: Contact },
  ) {
    this.dialog.open(tpl, { data: { contact }, closeButton: false })
  }

}
