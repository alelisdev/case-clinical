


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Firm } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-firm-table-view',
  templateUrl: './web-firm-table-view.component.html'
 })
export class WebFirmTableViewComponent
    {
  @Input() firms: Firm[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createFirm($event) {
      if($event) {
        this.firms.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      firm,
    }: { firm?: Firm },
  ) {
    this.dialog.open(tpl, { data: { firm }, closeButton: false })
  }

}
