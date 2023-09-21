


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ContactSetting } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contact-setting-table-view',
  templateUrl: './web-contact-setting-table-view.component.html'
 })
export class WebContactSettingTableViewComponent
    {
  @Input() contactSettings: ContactSetting[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createContactSetting($event) {
      if($event) {
        this.contactSettings.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      contactSetting,
    }: { contactSetting?: ContactSetting },
  ) {
    this.dialog.open(tpl, { data: { contactSetting }, closeButton: false })
  }

}
