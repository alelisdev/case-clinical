


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AuthorizationStatus } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-authorization-status-table-view',
  templateUrl: './web-authorization-status-table-view.component.html'
 })
export class WebAuthorizationStatusTableViewComponent
    {
  @Input() authorizationStatuses: AuthorizationStatus[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAuthorizationStatus($event) {
      if($event) {
        this.authorizationStatuses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      authorizationStatus,
    }: { authorizationStatus?: AuthorizationStatus },
  ) {
    this.dialog.open(tpl, { data: { authorizationStatus }, closeButton: false })
  }

}
