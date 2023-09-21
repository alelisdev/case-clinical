


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorAuthorizationImplant } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-authorization-implant-table-view',
  templateUrl: './web-prior-authorization-implant-table-view.component.html'
 })
export class WebPriorAuthorizationImplantTableViewComponent
    {
  @Input() priorAuthorizationImplants: PriorAuthorizationImplant[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorAuthorizationImplant($event) {
      if($event) {
        this.priorAuthorizationImplants.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorAuthorizationImplant,
    }: { priorAuthorizationImplant?: PriorAuthorizationImplant },
  ) {
    this.dialog.open(tpl, { data: { priorAuthorizationImplant }, closeButton: false })
  }

}
