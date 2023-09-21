


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { VisitKind } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-visit-kind-table-view',
  templateUrl: './web-visit-kind-table-view.component.html'
 })
export class WebVisitKindTableViewComponent
    {
  @Input() visitKinds: VisitKind[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createVisitKind($event) {
      if($event) {
        this.visitKinds.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      visitKind,
    }: { visitKind?: VisitKind },
  ) {
    this.dialog.open(tpl, { data: { visitKind }, closeButton: false })
  }

}
