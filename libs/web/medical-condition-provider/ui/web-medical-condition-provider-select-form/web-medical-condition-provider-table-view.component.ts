


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MedicalConditionProvider } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-medical-condition-provider-table-view',
  templateUrl: './web-medical-condition-provider-table-view.component.html'
 })
export class WebMedicalConditionProviderTableViewComponent
    {
  @Input() medicalConditionProviders: MedicalConditionProvider[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createMedicalConditionProvider($event) {
      if($event) {
        this.medicalConditionProviders.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      medicalConditionProvider,
    }: { medicalConditionProvider?: MedicalConditionProvider },
  ) {
    this.dialog.open(tpl, { data: { medicalConditionProvider }, closeButton: false })
  }

}
