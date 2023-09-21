


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MedicalCondition } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-medical-condition-table-view',
  templateUrl: './web-medical-condition-table-view.component.html'
 })
export class WebMedicalConditionTableViewComponent
    {
  @Input() medicalConditions: MedicalCondition[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createMedicalCondition($event) {
      if($event) {
        this.medicalConditions.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      medicalCondition,
    }: { medicalCondition?: MedicalCondition },
  ) {
    this.dialog.open(tpl, { data: { medicalCondition }, closeButton: false })
  }

}
