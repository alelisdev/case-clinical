import { IAfterGuiAttachedParams } from "@ag-grid-community/all-modules";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ICellRendererParams } from "@ag-grid-community/core";
import { Component } from "@angular/core";

@Component({
  selector: 'btn-copy-cell-renderer',
  template: `
    <div class="w-full h-full flex">
      <button (click)="btnClickedHandler()" color='primary' style="margin:auto">
      <ui-la-icon icon="copy" size="2x" class="text-green-500"></ui-la-icon>
      </button>
    </div>
  `,
})
export class BtnCopyCellRenderer implements ICellRendererAngularComp {
  private params: any;

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
