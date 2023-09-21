


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TaskTag } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-task-tag-table-view',
  templateUrl: './web-task-tag-table-view.component.html'
 })
export class WebTaskTagTableViewComponent
    {
  @Input() taskTags: TaskTag[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTaskTag($event) {
      if($event) {
        this.taskTags.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      taskTag,
    }: { taskTag?: TaskTag },
  ) {
    this.dialog.open(tpl, { data: { taskTag }, closeButton: false })
  }

}
