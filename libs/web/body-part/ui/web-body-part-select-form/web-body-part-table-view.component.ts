


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BodyPart } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-body-part-table-view',
  templateUrl: './web-body-part-table-view.component.html'
 })
export class WebBodyPartTableViewComponent
    {
  @Input() bodyParts: BodyPart[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createBodyPart($event) {
      if($event) {
        this.bodyParts.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      bodyPart,
    }: { bodyPart?: BodyPart },
  ) {
    this.dialog.open(tpl, { data: { bodyPart }, closeButton: false })
  }

}
