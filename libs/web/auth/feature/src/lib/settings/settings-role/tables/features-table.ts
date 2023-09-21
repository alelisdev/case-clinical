import { ColDef } from '@ag-grid-community/core';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core'
import { TableViewComponent } from '@case-clinical/web/datatable/ui';
import { Subject, takeUntil } from 'rxjs';
import { SettingsRoleStore } from '../settings-role.store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-table-view',
  template: `
    <table-view
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [treeMode]="true"
      [floatingFilter]="false"
      [data]="items"
      autogroupField="feature"
      [showSidebar]="false"
      [columnDefs]="columnDefs"
      ></table-view>
  `
})
export class WebFeaturesTableViewComponent implements OnInit, OnDestroy {
  @ViewChild(TableViewComponent) tableView: TableViewComponent

  @Input() items : any[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() permissionsSelected: EventEmitter<any> = new EventEmitter<any>()

  private _unsubscribeAll: Subject<any> = new Subject<any>()
  columnDefs: ColDef[] = [
    {
      field: 'feature',
      rowGroup: true,
      hide: true
    }
  ]

  constructor(private _store: SettingsRoleStore,) {

  }

  ngOnInit(): void {
    this._store.refreshTableData$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
      if(data.refreshTable) {
        console.log(data)
        this.setSelected(data.selectedPermissionIds)
      }
    })
    this._store.loadRoleFeaturePermissionsEffect(null);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  selectionDidChange(selectedRows) {
    let featureIds = []
    const selectedPermissionIds = selectedRows.map((rowData) => {
      featureIds.push(rowData.featureId)
      return rowData.id
    })
    const uniqueFeatureIds = new Set(featureIds)
    featureIds = [...uniqueFeatureIds]
    this.permissionsSelected.emit({ selectedPermissionIds: selectedPermissionIds, featureIds: featureIds })
  }

  setSelected(ids: string[]) {
    this.tableView.gridApi.forEachNode((node) => {
      if(ids.includes(node.data?.id)) {
        node.setSelected(true)
      } else {
        node.setSelected(false)
      }
    })
  }

  onSelected(selected) {
    this.itemDidSelect.emit(selected)
  }
}
