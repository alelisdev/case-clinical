import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import { ICellRendererParams } from "@ag-grid-community/core";
import { Component } from "@angular/core";

@Component({
  styleUrls: ['./edit-action-renderer.scss'],
  template: `
  <button [matMenuTriggerFor]="userActions">
    Choose Action
  </button>

  <mat-menu [xPosition]="'before'" #userActions="matMenu">
    <button mat-menu-item disabled>
      <span>Choose Action</span>
    </button>
    <mat-divider class="my-2"></mat-divider>

    <button *ngFor="let order of orders" mat-menu-item (click)="removeAt(order)">
      <span>Remove <b>{{order+1}}th</b> row</span>
    </button>
    <button mat-menu-item (click)="params.removeAllCallback(params.data['name'])">
      <span>Remove all rows</span>
    </button>
  </mat-menu>
  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NameEditActionCellRenderer implements ICellRendererAngularComp {
  public params: any;
  public orders: number[] = [];

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  removeAt(index) {
    this.params.removeAtCallback(this.params.data.data[index])
  }

  agInit(params: any): void {
    this.params = params;
    console.log(this.params)
    this.orders = [ ...Array(this.params.data.count).keys()];
    console.log({ orders: this.orders })
  }
}
