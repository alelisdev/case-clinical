


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CalculationBasisType } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-calculation-basis-type-table-view',
  templateUrl: './web-calculation-basis-type-table-view.component.html'
 })
export class WebCalculationBasisTypeTableViewComponent
    {
  @Input() calculationBasisTypes: CalculationBasisType[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createCalculationBasisType($event) {
      if($event) {
        this.calculationBasisTypes.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      calculationBasisType,
    }: { calculationBasisType?: CalculationBasisType },
  ) {
    this.dialog.open(tpl, { data: { calculationBasisType }, closeButton: false })
  }

}
