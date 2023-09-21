


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClinicalProviderTag } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-clinical-provider-tag-table-view',
  templateUrl: './web-clinical-provider-tag-table-view.component.html'
 })
export class WebClinicalProviderTagTableViewComponent
    {
  @Input() clinicalProviderTags: ClinicalProviderTag[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClinicalProviderTag($event) {
      if($event) {
        this.clinicalProviderTags.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      clinicalProviderTag,
    }: { clinicalProviderTag?: ClinicalProviderTag },
  ) {
    this.dialog.open(tpl, { data: { clinicalProviderTag }, closeButton: false })
  }

}
