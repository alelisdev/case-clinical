


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Country } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-country-table-view',
  templateUrl: './web-country-table-view.component.html'
 })
export class WebCountryTableViewComponent
    {
  @Input() countries: Country[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCountry($event) {
      if($event) {
        this.countries.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      country,
    }: { country?: Country },
  ) {
    this.dialog.open(tpl, { data: { country }, closeButton: false })
  }

}
