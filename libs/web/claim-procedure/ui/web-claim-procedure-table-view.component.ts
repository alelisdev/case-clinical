


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ClaimProcedure } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-claim-procedure-table-view',
  templateUrl: './web-claim-procedure-table-view.component.html'
 })
export class WebClaimProcedureTableViewComponent
    {
  @Input() claimProcedures: ClaimProcedure[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createClaimProcedure($event) {
      if($event) {
        this.claimProcedures.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      claimProcedure,
    }: { claimProcedure?: ClaimProcedure },
  ) {
    this.dialog.open(tpl, { data: { claimProcedure }, closeButton: false })
  }

}
