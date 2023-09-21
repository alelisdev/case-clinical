import { ColDef } from '@ag-grid-community/core';
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'ui-academy-category-table-view',
  template: `
      <table-view
        class="w-full h-full"
        (itemDidSelect)="onSelected($event)"
        [data]="customers"
        [columnDefs]="columnDefs"
      ></table-view>
  `,
})
export class WebAcademyCategoryTableViewComponent {
  @Input() customers: any[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()

  columnDefs: ColDef[] = [
    { field: 'id', filter: 'agTextColumnFilter' ,hide:true },
    { field: 'title', filter: 'agTextColumnFilter'  },
    { field: 'slug', filter: 'agTextColumnFilter'  },
    { field: 'createdAt', filter: 'agDateColumnFilter' ,hide:true },
    { field: 'updatedAt', filter: 'agDateColumnFilter' ,hide:true },
  ]

  onSelected(selected) {
    this.itemDidSelect.emit(selected)
  }
}
