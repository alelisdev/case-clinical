


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClinicalProviderSpecialty } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-clinical-provider-specialty-table-view',
  templateUrl: './web-clinical-provider-specialty-table-view.component.html'
 })
export class WebClinicalProviderSpecialtyTableViewComponent
    {
  @Input() clinicalProviderSpecialties: ClinicalProviderSpecialty[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClinicalProviderSpecialty($event) {
      if($event) {
        this.clinicalProviderSpecialties.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      clinicalProviderSpecialty,
    }: { clinicalProviderSpecialty?: ClinicalProviderSpecialty },
  ) {
    this.dialog.open(tpl, { data: { clinicalProviderSpecialty }, closeButton: false })
  }

}
