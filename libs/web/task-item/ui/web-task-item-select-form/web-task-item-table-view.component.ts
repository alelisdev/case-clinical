


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TaskItem } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-task-item-table-view',
  templateUrl: './web-task-item-table-view.component.html'
 })
export class WebTaskItemTableViewComponent
    {
  @Input() taskItems: TaskItem[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createTaskItem($event) {
      if($event) {
        this.taskItems.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      taskItem,
    }: { taskItem?: TaskItem },
  ) {
    this.dialog.open(tpl, { data: { taskItem }, closeButton: false })
  }

}
