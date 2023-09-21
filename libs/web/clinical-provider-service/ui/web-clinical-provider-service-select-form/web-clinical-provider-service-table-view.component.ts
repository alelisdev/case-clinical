


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClinicalProviderService } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-clinical-provider-service-table-view',
  templateUrl: './web-clinical-provider-service-table-view.component.html'
 })
export class WebClinicalProviderServiceTableViewComponent
    {
  @Input() clinicalProviderServices: ClinicalProviderService[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClinicalProviderService($event) {
      if($event) {
        this.clinicalProviderServices.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      clinicalProviderService,
    }: { clinicalProviderService?: ClinicalProviderService },
  ) {
    this.dialog.open(tpl, { data: { clinicalProviderService }, closeButton: false })
  }

}
