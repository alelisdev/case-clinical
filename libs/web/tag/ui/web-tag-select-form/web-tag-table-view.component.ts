


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Tag } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-tag-table-view',
  templateUrl: './web-tag-table-view.component.html'
 })
export class WebTagTableViewComponent
    {
  @Input() tags: Tag[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTag($event) {
      if($event) {
        this.tags.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      tag,
    }: { tag?: Tag },
  ) {
    this.dialog.open(tpl, { data: { tag }, closeButton: false })
  }

}
