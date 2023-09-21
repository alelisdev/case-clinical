


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Team } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-team-table-view',
  templateUrl: './web-team-table-view.component.html'
 })
export class WebTeamTableViewComponent
    {
  @Input() teams: Team[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTeam($event) {
      if($event) {
        this.teams.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      team,
    }: { team?: Team },
  ) {
    this.dialog.open(tpl, { data: { team }, closeButton: false })
  }

}
