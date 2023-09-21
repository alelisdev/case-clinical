import { catchError, debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TemplateRef, ChangeDetectorRef, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core'
import { ExportConfig } from '@case-clinical/web/datatable/ui';
import { Router, ActivatedRoute } from '@angular/router'
import { DataListTableViewComponent } from '../data-list-table/data-list-table.component';
import { ColDef } from '@ag-grid-community/core';
import { StackedListItem } from '@case-clinical/web/ui/stacked-list';
import { DataListService } from '../business/data-list.service';
import { EMPTY, of, Subject } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { WebExcelDataTableViewComponent } from './excel-data-table-view';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { WebUiSearchComponent } from '@case-clinical/web/ui/search';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  styles:[`
    .invoiceCreateForm{
        height: 5vh !important;
    }
  `],
  selector: 'ui-data-list',
  templateUrl: './data-list.component.html',
})
export class WebDataListComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(DataListTableViewComponent) tableView: DataListTableViewComponent
  @ViewChild(WebUiSearchComponent) searchComponent: WebUiSearchComponent
  @Output() excelDataHasBeenPopulated = new EventEmitter<any[]>()
  @Output() searchQueryDidChange = new EventEmitter<string>()
  @Input() data: unknown[]
  @Input() tableName: string
  @Input() type = 'default'
  @Input() validateFunc: Function
  @Input() createNewFunc: Function
  @Input() title: string
  @Input() createLink: string
  @Input() columnDefs: ColDef[]
  @Output() selectionDidChange = new EventEmitter<any[]>()
  @Input() checkBoxSelection = false;
  @Input() actionTemplateForCheckBox?: TemplateRef<any>
  @Input() cardViewTemplate?: TemplateRef<any>
  headerTitle = "";

  activeView = 'table'
  searchFocused: false
  filterQuery = '';

  searchQuerySubject = new Subject();
  searchQuery$ = this.searchQuerySubject.asObservable();

  paging = {
    limit: 10000,
    skip: 0,
    total: 0
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DataListService,
    private toast: WebUiToastService,
    private readonly dialog: DialogService,
    private loadingService: FuseLoadingService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if(this.filterQuery.length > 0) {
      this.searchComponent.setValue(this.filterQuery);
    }
  }

  ngOnInit(): void {

    console.log(this.actionTemplateForCheckBox);
    // Load Previous Grid State(Pagination/Filter Search/Sorting/Rearrange) From Local Storage

    // Load Filter Search Query
    this.filterQuery = localStorage.getItem(`${this.tableName}_${this.type}_filter_q`) ?? '';
    console.log(this.filterQuery);

    try {
      this.headerTitle = this.title.split(/(?=[A-Z])/).join(' ');
    } catch (e) {
      this.headerTitle = this.title;
    }

    this.getTableState = this.getTableState.bind(this)
    this.searchQuery$.pipe(
      debounceTime(300),
    ).subscribe((value: string) => {
      console.log('search query = ', value);
      if(value === null) return;
      localStorage.setItem(`${this.tableName}_${this.type}_filter_q`, value ?? '');
      this.searchQueryDidChange.emit(value);
    })
  }

  ngOnDestroy(): void {
    // Save Current Grid State(Pagination/Filter Search/Sorting/Rearrange) To Local Storage


    this.searchQuerySubject.next(null);
    this.searchQuerySubject.complete();
  }

  get fullTableName() {
    return `${this.tableName}-${this.type}`
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data) {
      this.paging.total = this.data?.length || 0
    }
  }


  onSkipChange(pageIndex: number) {
    this.paging.skip = pageIndex
  }

  onSearchQueryChange(searchQuery: string) {
    console.log({ searchQuery })
    if (searchQuery.length > 0) {
      this.searchQuerySubject.next(searchQuery)
    } else {
      this.searchQuerySubject.next("")
    }
  }

  onSubmitSearchQuery() {
    // this.paging.skip = 0;
    // this.searchQueryDidChange.emit(this.searchQuery)
  }

  setSearchFocus(searchFocused) {
    this.searchFocused = searchFocused;
  }

  setActiveView(viewName) {
    this.activeView = viewName
  }

  columnStateDidChange(columnState) {
    this.tableView?.setColumnState(columnState)
  }

  filterStateDidChange(filterState) {
    this.tableView?.setFilterState(filterState)
  }

  itemDidSelect(selected) {
    this.router.navigate([selected?.id], { relativeTo: this.route });
  }

  filteredData(filteredItems)
  {
    this.paging.total = filteredItems || 0
  }

  getTableState() {
    return this.tableView.getTableViewState()
  }

  exportBtnDidClick(exportConfig: ExportConfig) {
    this.tableView.exportTableView(exportConfig)
  }

  onExcelFileSelected(event): void {
    if (event.target.files.length > 0) {
      this.loadingService._setLoadingStatus(true,"");
      const file = event.target.files[0]
      const columns = this.tableView.getImportColumns();
      this.service.importRecords(file, columns, this.tableName).pipe(
        catchError(error => {
          console.log('importExcelError = ', error)
          this.toast.error(error.Message, { duration: 3000 })
          return EMPTY;
        })
      ).subscribe(
        (result) => {
          this.loadingService._setLoadingStatus(false,"");
          this.dialog.open(WebExcelDataTableViewComponent, {
            data: {
              ...result,
              tableName: this.tableName,
              validateFunc: this.validateFunc,
              createNewFunc:  this.createNewFunc
            },
            height: '90%',
            width: '80%',
          }).afterClosed$.subscribe(( { status, data }) => {
            if(status === 'confirmed') {
              this.excelDataHasBeenPopulated.emit(data)
            }
          })
        }
      )
    }
  }

  get items() {
    return this.mapDataToItems(this.data)
  }

  public mapDataToItems(data: any[]) {
    return (data || []).map(
      ({ name, id, createdAt }) =>
      ({
        title: name,
        path: id,
        leftMeta: {
          icon: 'calendar',
          text: createdAt,
        },
      } as StackedListItem),
    )
  }
}
