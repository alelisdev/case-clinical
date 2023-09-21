


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TeamRole } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-team-role-table-view',
  templateUrl: './web-team-role-table-view.component.html'
 })
export class WebTeamRoleTableViewComponent
    {
  @Input() teamRoles: TeamRole[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTeamRole($event) {
      if($event) {
        this.teamRoles.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      teamRole,
    }: { teamRole?: TeamRole },
  ) {
    this.dialog.open(tpl, { data: { teamRole }, closeButton: false })
  }

}
