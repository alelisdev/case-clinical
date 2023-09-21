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
    <button mat-menu-item [matMenuTriggerFor]="userStatus">
      <span>Replace <span class='font-bold'>{{params.data.name}}</span> with</span>
    </button>
    <button mat-menu-item (click)="params.createCallback(params.data.name)">
      <span>Create <span class='font-bold'>{{ params.data.name }}</span></span>
    </button>
    <button mat-menu-item (click)="params.removeCallback(params.data.name)">
      <span>Remove all with <span class='font-bold'>{{ params.data.name }}</span></span>
    </button>
    <button mat-menu-item (click)="params.rejectRowCallback(params.data.name)">
      <span>Reject Row</span>
    </button>
  </mat-menu>

  <mat-menu class="user-status-menu" #userStatus="matMenu">
    <button (click)="params.replaceCallback(params.data.name, option)" *ngFor="let option of params.options" mat-menu-item>
      <span>{{option}}</span>
    </button>
  </mat-menu>
  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class EditActionCellRenderer implements ICellRendererAngularComp {
  public params: any;

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  agInit(params: any): void {
    this.params = params;
    console.log(this.params)
  }

  btnClickedHandler() {
    this.params.clicked(this.params);
  }
}
