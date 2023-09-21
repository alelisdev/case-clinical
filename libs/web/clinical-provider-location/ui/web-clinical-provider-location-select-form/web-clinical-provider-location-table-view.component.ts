


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClinicalProviderLocation } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-clinical-provider-location-table-view',
  templateUrl: './web-clinical-provider-location-table-view.component.html'
 })
export class WebClinicalProviderLocationTableViewComponent
    {
  @Input() clinicalProviderLocations: ClinicalProviderLocation[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClinicalProviderLocation($event) {
      if($event) {
        this.clinicalProviderLocations.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      clinicalProviderLocation,
    }: { clinicalProviderLocation?: ClinicalProviderLocation },
  ) {
    this.dialog.open(tpl, { data: { clinicalProviderLocation }, closeButton: false })
  }

}
