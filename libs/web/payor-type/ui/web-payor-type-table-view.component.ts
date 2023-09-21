


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { PayorType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-payor-type-table-view',
  templateUrl: './web-payor-type-table-view.component.html'
 })
export class WebPayorTypeTableViewComponent
    {
  @Input() payorTypes: PayorType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createPayorType($event) {
      if($event) {
        this.payorTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      payorType,
    }: { payorType?: PayorType },
  ) {
    this.dialog.open(tpl, { data: { payorType }, closeButton: false })
  }

}
