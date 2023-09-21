


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Role } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-role-table-view',
  templateUrl: './web-role-table-view.component.html'
 })
export class WebRoleTableViewComponent
    {
  @Input() roles: Role[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRole($event) {
      if($event) {
        this.roles.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      role,
    }: { role?: Role },
  ) {
    this.dialog.open(tpl, { data: { role }, closeButton: false })
  }

}
