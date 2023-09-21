


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserFeaturePermission } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-user-feature-permission-table-view',
  templateUrl: './web-user-feature-permission-table-view.component.html'
 })
export class WebUserFeaturePermissionTableViewComponent
    {
  @Input() userFeaturePermissions: UserFeaturePermission[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createUserFeaturePermission($event) {
      if($event) {
        this.userFeaturePermissions.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      userFeaturePermission,
    }: { userFeaturePermission?: UserFeaturePermission },
  ) {
    this.dialog.open(tpl, { data: { userFeaturePermission }, closeButton: false })
  }

}
