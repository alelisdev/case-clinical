import { ColDef } from '@ag-grid-community/core';
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'ui-table-view-config-table-view',
  template: `
      <table-view
        class="w-full h-full"
        (itemDidSelect)="onSelected($event)"
        [data]="tableViewConfigs"
        [columnDefs]="columnDefs"
      ></table-view>
  `,
})
export class TableViewConfigTableViewComponent {
  @Input() tableViewConfigs: any[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()

  columnDefs: ColDef[] = [
    { field: 'id', filter: 'agTextColumnFilter' ,hide:true },
    { field: 'name', filter: 'agTextColumnFilter'  },
  ]

  onSelected(selected) {
    console.log('table-view-config-table-view: onSelected, value = ', selected)
    this.itemDidSelect.emit(selected)
  }
}
