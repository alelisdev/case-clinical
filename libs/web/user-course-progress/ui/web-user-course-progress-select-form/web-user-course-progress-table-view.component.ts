


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserCourseProgress } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-user-course-progress-table-view',
  templateUrl: './web-user-course-progress-table-view.component.html'
 })
export class WebUserCourseProgressTableViewComponent
    {
  @Input() userCourseProgresses: UserCourseProgress[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createUserCourseProgress($event) {
      if($event) {
        this.userCourseProgresses.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      userCourseProgress,
    }: { userCourseProgress?: UserCourseProgress },
  ) {
    this.dialog.open(tpl, { data: { userCourseProgress }, closeButton: false })
  }

}
