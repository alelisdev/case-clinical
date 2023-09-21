


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Ethnicity } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-ethnicity-table-view',
  templateUrl: './web-ethnicity-table-view.component.html'
 })
export class WebEthnicityTableViewComponent
    {
  @Input() ethnicities: Ethnicity[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createEthnicity($event) {
      if($event) {
        this.ethnicities.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      ethnicity,
    }: { ethnicity?: Ethnicity },
  ) {
    this.dialog.open(tpl, { data: { ethnicity }, closeButton: false })
  }

}
