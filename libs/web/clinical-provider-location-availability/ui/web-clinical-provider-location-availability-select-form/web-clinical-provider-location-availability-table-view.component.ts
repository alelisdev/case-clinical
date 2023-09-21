


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClinicalProviderLocationAvailability } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-clinical-provider-location-availability-table-view',
  templateUrl: './web-clinical-provider-location-availability-table-view.component.html'
 })
export class WebClinicalProviderLocationAvailabilityTableViewComponent
    {
  @Input() clinicalProviderLocationAvailabilities: ClinicalProviderLocationAvailability[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClinicalProviderLocationAvailability($event) {
      if($event) {
        this.clinicalProviderLocationAvailabilities.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      clinicalProviderLocationAvailability,
    }: { clinicalProviderLocationAvailability?: ClinicalProviderLocationAvailability },
  ) {
    this.dialog.open(tpl, { data: { clinicalProviderLocationAvailability }, closeButton: false })
  }

}
