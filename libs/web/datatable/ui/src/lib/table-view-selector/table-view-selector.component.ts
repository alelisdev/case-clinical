import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { debounceTime, of, switchMap } from 'rxjs';
import { TableViewConfigStore } from '../table-view-config.store';
import { WebUiFormField } from '@case-clinical/web/ui/form'

@Component({
  selector: 'table-view-selector',
  templateUrl: './table-view-selector.component.html',
  styleUrls: ['./table-view-selector.component.scss']
})
export class TableViewSelectorComponent implements OnInit, OnDestroy {
  @ViewChild(NgSelectComponent) ngSelect: NgSelectComponent
  @Input() tableName: string
  @Input() getTableState: () => any
  @Output() columnStateDidChange = new EventEmitter<any>()
  @Output() filterStateDidChange = new EventEmitter<any>()

  filterStateSubscription: any
  columnStateSubscription: any;

  vm$ = this.store.vm$
  selectedId: number
  fields = []

  constructor(private store: TableViewConfigStore) {
    this.selectedId = -1;
  }

  getItems(term) {
    return this.vm$.pipe(switchMap(vm => {
      return of(vm.viewNames)
    }))
  }

  ngOnInit(): void {
    this.getItems = this.getItems.bind(this)
    this.store.loadTableSettings({ tableName: this.tableName })
    this.filterStateSubscription = this.store.filterSettings$.subscribe(filterSettings => {
      this.filterStateDidChange.emit(filterSettings)
    })
    this.columnStateSubscription = this.store.columnDefs$.subscribe(columnSettings => {
      console.log(columnSettings);
      this.columnStateDidChange.emit(columnSettings)
    })
    this.fields = [
      WebUiFormField.selectForm(
        'table-view-config',
        'view',
        {
          placeholder: 'Select view',
          width: '500px',
          valueProp: 'id',
          labelProp: 'name',
          source: this.getItems,
          debounceTime: 5,
          onCreate: (event) => {
            console.log('onCreate', event)
          },
          onUpdate: (event) => {
            console.log('onUpdate', event)
          },
          onChange: (selected) => {
            this.selectedId = selected?.id ?? -1;
            this.store.changeView(this.selectedId !== -1 ? this.selectedId : null)
          },
        },
        {
          className: 'w-full',
        },
      ),
    ]
  }

  ngOnDestroy(): void {
    this.filterStateSubscription?.unsubscribe();
    this.columnStateSubscription?.unsubscribe();
  }

  onSaveButtonDidClick() {
    console.log('saveButtonDidClick')
    if(this.getTableState)
      this.store.saveViewEffect(this.getTableState())
  }
}
