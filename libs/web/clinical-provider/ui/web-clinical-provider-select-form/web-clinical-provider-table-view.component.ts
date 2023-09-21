


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClinicalProvider } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-clinical-provider-table-view',
  templateUrl: './web-clinical-provider-table-view.component.html'
 })
export class WebClinicalProviderTableViewComponent
    {
  @Input() clinicalProviders: ClinicalProvider[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClinicalProvider($event) {
      if($event) {
        this.clinicalProviders.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      clinicalProvider,
    }: { clinicalProvider?: ClinicalProvider },
  ) {
    this.dialog.open(tpl, { data: { clinicalProvider }, closeButton: false })
  }

}
