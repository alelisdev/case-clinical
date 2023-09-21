


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MedLevel } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-med-level-table-view',
  templateUrl: './web-med-level-table-view.component.html'
 })
export class WebMedLevelTableViewComponent
    {
  @Input() medLevels: MedLevel[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createMedLevel($event) {
      if($event) {
        this.medLevels.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      medLevel,
    }: { medLevel?: MedLevel },
  ) {
    this.dialog.open(tpl, { data: { medLevel }, closeButton: false })
  }

}
