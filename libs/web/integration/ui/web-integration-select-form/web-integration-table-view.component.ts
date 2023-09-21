


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Integration } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-integration-table-view',
  templateUrl: './web-integration-table-view.component.html'
 })
export class WebIntegrationTableViewComponent
    {
  @Input() integrations: Integration[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createIntegration($event) {
      if($event) {
        this.integrations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      integration,
    }: { integration?: Integration },
  ) {
    this.dialog.open(tpl, { data: { integration }, closeButton: false })
  }

}
