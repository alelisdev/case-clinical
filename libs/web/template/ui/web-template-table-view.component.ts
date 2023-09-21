


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Template } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-template-table-view',
  templateUrl: './web-template-table-view.component.html'
 })
export class WebTemplateTableViewComponent
    {
  @Input() teamUsers: Template[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTemplate($event) {
      if($event) {
        this.teamUsers.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      teamUser,
    }: { teamUser?: Template },
  ) {
    this.dialog.open(tpl, { data: { teamUser }, closeButton: false })
  }

}
