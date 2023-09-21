import { Component, OnDestroy } from '@angular/core'

import { ICellRendererAngularComp } from '@ag-grid-community/angular'
import { ICellRendererParams, IAfterGuiAttachedParams } from '@ag-grid-community/core'

@Component({
  selector: 'checkbox-renderer',
  template: ` <input type="checkbox" (click)="checkedHandler($event)" [checked]="this.params.value" /> `,
})
export class CheckboxRenderer implements ICellRendererAngularComp, OnDestroy {
  public params: any

  agInit(params: any): void {
    this.params = params
  }

  checkedHandler(event) {
    let checked = event.target.checked
    let colId = this.params.column.colId
    this.params.node.setDataValue(colId, checked)
  }

  ngOnDestroy(): void {
    
  }

  refresh(params: ICellRendererParams): boolean {
    return false
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    
  }

}
