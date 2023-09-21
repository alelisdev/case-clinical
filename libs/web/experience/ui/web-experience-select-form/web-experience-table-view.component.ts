


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Experience } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-experience-table-view',
  templateUrl: './web-experience-table-view.component.html'
 })
export class WebExperienceTableViewComponent
    {
  @Input() experiences: Experience[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createExperience($event) {
      if($event) {
        this.experiences.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      experience,
    }: { experience?: Experience },
  ) {
    this.dialog.open(tpl, { data: { experience }, closeButton: false })
  }

}
