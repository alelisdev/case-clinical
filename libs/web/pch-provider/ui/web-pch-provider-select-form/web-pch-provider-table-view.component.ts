


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PchProvider } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-pch-provider-table-view',
  templateUrl: './web-pch-provider-table-view.component.html'
 })
export class WebPchProviderTableViewComponent
    {
  @Input() pchProviders: PchProvider[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPchProvider($event) {
      if($event) {
        this.pchProviders.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      pchProvider,
    }: { pchProvider?: PchProvider },
  ) {
    this.dialog.open(tpl, { data: { pchProvider }, closeButton: false })
  }

}
