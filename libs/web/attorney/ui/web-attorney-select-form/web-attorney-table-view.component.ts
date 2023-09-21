


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Attorney } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-attorney-table-view',
  templateUrl: './web-attorney-table-view.component.html'
 })
export class WebAttorneyTableViewComponent
    {
  @Input() attorneys: Attorney[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAttorney($event) {
      if($event) {
        this.attorneys.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      attorney,
    }: { attorney?: Attorney },
  ) {
    this.dialog.open(tpl, { data: { attorney }, closeButton: false })
  }

}
