


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Education } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-education-table-view',
  templateUrl: './web-education-table-view.component.html'
 })
export class WebEducationTableViewComponent
    {
  @Input() educations: Education[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createEducation($event) {
      if($event) {
        this.educations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      education,
    }: { education?: Education },
  ) {
    this.dialog.open(tpl, { data: { education }, closeButton: false })
  }

}
