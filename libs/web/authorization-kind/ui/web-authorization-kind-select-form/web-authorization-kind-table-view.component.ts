


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AuthorizationKind } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-authorization-kind-table-view',
  templateUrl: './web-authorization-kind-table-view.component.html'
 })
export class WebAuthorizationKindTableViewComponent
    {
  @Input() authorizationKinds: AuthorizationKind[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAuthorizationKind($event) {
      if($event) {
        this.authorizationKinds.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      authorizationKind,
    }: { authorizationKind?: AuthorizationKind },
  ) {
    this.dialog.open(tpl, { data: { authorizationKind }, closeButton: false })
  }

}
