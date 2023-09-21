


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Authorization } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-authorization-table-view',
  templateUrl: './web-authorization-table-view.component.html'
 })
export class WebAuthorizationTableViewComponent
    {
  @Input() authorizations: Authorization[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAuthorization($event) {
      if($event) {
        this.authorizations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      authorization,
    }: { authorization?: Authorization },
  ) {
    this.dialog.open(tpl, { data: { authorization }, closeButton: false })
  }

}
