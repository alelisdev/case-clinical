


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorAuthDme } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-auth-dme-table-view',
  templateUrl: './web-prior-auth-dme-table-view.component.html'
 })
export class WebPriorAuthDmeTableViewComponent
    {
  @Input() priorAuthDmes: PriorAuthDme[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorAuthDme($event) {
      if($event) {
        this.priorAuthDmes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorAuthDme,
    }: { priorAuthDme?: PriorAuthDme },
  ) {
    this.dialog.open(tpl, { data: { priorAuthDme }, closeButton: false })
  }

}
