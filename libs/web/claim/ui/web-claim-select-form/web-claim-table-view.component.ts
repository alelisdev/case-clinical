


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Claim } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-claim-table-view',
  templateUrl: './web-claim-table-view.component.html'
 })
export class WebClaimTableViewComponent
    {
  @Input() claims: Claim[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClaim($event) {
      if($event) {
        this.claims.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      claim,
    }: { claim?: Claim },
  ) {
    this.dialog.open(tpl, { data: { claim }, closeButton: false })
  }

}
