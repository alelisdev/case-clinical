


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BodyPartLead } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-body-part-lead-table-view',
  templateUrl: './web-body-part-lead-table-view.component.html'
 })
export class WebBodyPartLeadTableViewComponent
    {
  @Input() bodyPartLeads: BodyPartLead[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createBodyPartLead($event) {
      if($event) {
        this.bodyPartLeads.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      bodyPartLead,
    }: { bodyPartLead?: BodyPartLead },
  ) {
    this.dialog.open(tpl, { data: { bodyPartLead }, closeButton: false })
  }

}
