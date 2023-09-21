


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Injury } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-injury-table-view',
  templateUrl: './web-injury-table-view.component.html'
 })
export class WebInjuryTableViewComponent
    {
  @Input() injuries: Injury[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createInjury($event) {
      if($event) {
        this.injuries.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      injury,
    }: { injury?: Injury },
  ) {
    this.dialog.open(tpl, { data: { injury }, closeButton: false })
  }

}
