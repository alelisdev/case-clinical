


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContactKind } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contact-kind-table-view',
  templateUrl: './web-contact-kind-table-view.component.html'
 })
export class WebContactKindTableViewComponent
    {
  @Input() contactKinds: ContactKind[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContactKind($event) {
      if($event) {
        this.contactKinds.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contactKind,
    }: { contactKind?: ContactKind },
  ) {
    this.dialog.open(tpl, { data: { contactKind }, closeButton: false })
  }

}
