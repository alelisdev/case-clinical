


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Bank } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-bank-table-view',
  templateUrl: './web-bank-table-view.component.html'
 })
export class WebBankTableViewComponent
    {
  @Input() banks: Bank[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createBank($event) {
      if($event) {
        this.banks.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      bank,
    }: { bank?: Bank },
  ) {
    this.dialog.open(tpl, { data: { bank }, closeButton: false })
  }

}
