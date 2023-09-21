


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { User } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-user-table-view',
  templateUrl: './web-user-table-view.component.html'
 })
export class WebUserTableViewComponent
    {
  @Input() users: User[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createUser($event) {
      if($event) {
        this.users.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      user,
    }: { user?: User },
  ) {
    this.dialog.open(tpl, { data: { user }, closeButton: false })
  }

}
