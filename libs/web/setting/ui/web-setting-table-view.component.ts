


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Setting } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-setting-table-view',
  templateUrl: './web-setting-table-view.component.html'
 })
export class WebSettingTableViewComponent
    {
  @Input() settings: Setting[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createSetting($event) {
      if($event) {
        this.settings.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      setting,
    }: { setting?: Setting },
  ) {
    this.dialog.open(tpl, { data: { setting }, closeButton: false })
  }

}
