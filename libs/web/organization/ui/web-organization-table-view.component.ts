


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Organization } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-organization-table-view',
  templateUrl: './web-organization-table-view.component.html'
 })
export class WebOrganizationTableViewComponent
    {
  @Input() organizations: Organization[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createOrganization($event) {
      if($event) {
        this.organizations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      organization,
    }: { organization?: Organization },
  ) {
    this.dialog.open(tpl, { data: { organization }, closeButton: false })
  }

}
