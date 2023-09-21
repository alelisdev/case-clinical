


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserRole } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-user-role-table-view',
  templateUrl: './web-user-role-table-view.component.html'
 })
export class WebUserRoleTableViewComponent
    {
  @Input() userRoles: UserRole[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createUserRole($event) {
      if($event) {
        this.userRoles.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      userRole,
    }: { userRole?: UserRole },
  ) {
    this.dialog.open(tpl, { data: { userRole }, closeButton: false })
  }

}
