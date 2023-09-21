


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AuthorizationType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-authorization-type-table-view',
  templateUrl: './web-authorization-type-table-view.component.html'
 })
export class WebAuthorizationTypeTableViewComponent
    {
  @Input() authorizationTypes: AuthorizationType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAuthorizationType($event) {
      if($event) {
        this.authorizationTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      authorizationType,
    }: { authorizationType?: AuthorizationType },
  ) {
    this.dialog.open(tpl, { data: { authorizationType }, closeButton: false })
  }

}
