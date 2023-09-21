


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Award } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-award-table-view',
  templateUrl: './web-award-table-view.component.html'
 })
export class WebAwardTableViewComponent
    {
  @Input() awards: Award[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createAward($event) {
      if($event) {
        this.awards.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      award,
    }: { award?: Award },
  ) {
    this.dialog.open(tpl, { data: { award }, closeButton: false })
  }

}
