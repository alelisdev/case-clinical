


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { RoleFeaturePermission } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-role-feature-permission-table-view',
  templateUrl: './web-role-feature-permission-table-view.component.html'
 })
export class WebRoleFeaturePermissionTableViewComponent
    {
  @Input() roleFeaturePermissions: RoleFeaturePermission[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRoleFeaturePermission($event) {
      if($event) {
        this.roleFeaturePermissions.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      roleFeaturePermission,
    }: { roleFeaturePermission?: RoleFeaturePermission },
  ) {
    this.dialog.open(tpl, { data: { roleFeaturePermission }, closeButton: false })
  }

}
