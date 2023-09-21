


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TeamUser } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-team-user-table-view',
  templateUrl: './web-team-user-table-view.component.html'
 })
export class WebTeamUserTableViewComponent
    {
  @Input() teamUsers: TeamUser[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTeamUser($event) {
      if($event) {
        this.teamUsers.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      teamUser,
    }: { teamUser?: TeamUser },
  ) {
    this.dialog.open(tpl, { data: { teamUser }, closeButton: false })
  }

}
