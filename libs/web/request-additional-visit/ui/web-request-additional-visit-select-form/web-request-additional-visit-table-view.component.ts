


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { RequestAdditionalVisit } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-request-additional-visit-table-view',
  templateUrl: './web-request-additional-visit-table-view.component.html'
 })
export class WebRequestAdditionalVisitTableViewComponent
    {
  @Input() requestAdditionalVisits: RequestAdditionalVisit[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createRequestAdditionalVisit($event) {
      if($event) {
        this.requestAdditionalVisits.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      requestAdditionalVisit,
    }: { requestAdditionalVisit?: RequestAdditionalVisit },
  ) {
    this.dialog.open(tpl, { data: { requestAdditionalVisit }, closeButton: false })
  }

}
