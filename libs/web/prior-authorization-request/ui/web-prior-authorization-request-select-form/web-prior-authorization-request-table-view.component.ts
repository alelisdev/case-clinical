


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-authorization-request-table-view',
  templateUrl: './web-prior-authorization-request-table-view.component.html'
 })
export class WebPriorAuthorizationRequestTableViewComponent
    {
  @Input() priorAuthorizationRequests: PriorAuthorizationRequest[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPriorAuthorizationRequest($event) {
      if($event) {
        this.priorAuthorizationRequests.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      priorAuthorizationRequest,
    }: { priorAuthorizationRequest?: PriorAuthorizationRequest },
  ) {
    this.dialog.open(tpl, { data: { priorAuthorizationRequest }, closeButton: false })
  }

}
