import { IAfterGuiAttachedParams } from "@ag-grid-community/all-modules";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ICellRendererParams } from "@ag-grid-community/core";
import { Component } from "@angular/core";

@Component({
  selector: 'btn-delete-cell-renderer',
  template: `
    <div class="w-full h-full flex">
      <button (click)="$event.preventDefault(); btnClickedHandler()" color='primary' style="margin:auto">
      <ui-la-icon icon="trash" size="2x" class="text-red-500"></ui-la-icon>
      </button>
    </div>
  `,
})
export class BtnDeleteCellRenderer implements ICellRendererAngularComp {
  public params: any;

  get canDelete() {
    console.log(this.params.node.data)
    return !this.params.node.group;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {

  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params);
  }
}
