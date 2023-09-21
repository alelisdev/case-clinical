


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Implant } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-implant-table-view',
  templateUrl: './web-implant-table-view.component.html'
 })
export class WebImplantTableViewComponent
    {
  @Input() implants: Implant[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createImplant($event) {
      if($event) {
        this.implants.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      implant,
    }: { implant?: Implant },
  ) {
    this.dialog.open(tpl, { data: { implant }, closeButton: false })
  }

}
