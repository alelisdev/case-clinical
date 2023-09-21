


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContactTag } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contact-tag-table-view',
  templateUrl: './web-contact-tag-table-view.component.html'
 })
export class WebContactTagTableViewComponent
    {
  @Input() contactTags: ContactTag[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContactTag($event) {
      if($event) {
        this.contactTags.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contactTag,
    }: { contactTag?: ContactTag },
  ) {
    this.dialog.open(tpl, { data: { contactTag }, closeButton: false })
  }

}
