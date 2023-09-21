


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Service } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-service-table-view',
  templateUrl: './web-service-table-view.component.html'
 })
export class WebServiceTableViewComponent
    {
  @Input() services: Service[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createService($event) {
      if($event) {
        this.services.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      service,
    }: { service?: Service },
  ) {
    this.dialog.open(tpl, { data: { service }, closeButton: false })
  }

}
