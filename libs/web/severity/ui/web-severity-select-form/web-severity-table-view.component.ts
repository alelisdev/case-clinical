


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Severity } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-severity-table-view',
  templateUrl: './web-severity-table-view.component.html'
 })
export class WebSeverityTableViewComponent
    {
  @Input() severities: Severity[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createSeverity($event) {
      if($event) {
        this.severities.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      severity,
    }: { severity?: Severity },
  ) {
    this.dialog.open(tpl, { data: { severity }, closeButton: false })
  }

}
