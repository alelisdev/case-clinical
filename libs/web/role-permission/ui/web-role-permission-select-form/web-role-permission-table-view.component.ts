


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { RolePermission } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-role-permission-table-view',
  templateUrl: './web-role-permission-table-view.component.html'
 })
export class WebRolePermissionTableViewComponent
    {
  @Input() rolePermissions: RolePermission[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRolePermission($event) {
      if($event) {
        this.rolePermissions.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      rolePermission,
    }: { rolePermission?: RolePermission },
  ) {
    this.dialog.open(tpl, { data: { rolePermission }, closeButton: false })
  }

}
