import { FuseConfigService } from './../../../../../@fuse/services/config/config.service';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CheckboxRenderer as originCheckBoxRenderer } from '@case-clinical/web/core/feature';
import { ColDef, ColumnApi, FilterChangedEvent, GridApi, SortChangedEvent, StatusPanelDef } from '@ag-grid-community/core'
import { ColumnOption, DateFormat, ExportConfig, FileFormat, TimeFormat } from '../export/table-export.component';
import { dateFormatter } from '@case-clinical/web/core/data-access';
import { Subject } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import { CheckboxRenderer } from './CheckboxRenderer'

@Component({
  styleUrls:['./style.scss'],
  selector: 'table-view',
  templateUrl: './table-view.component.html'
})
export class TableViewComponent implements OnInit, OnDestroy {
  // Only used for tree mode
  @Input() autoHeight = false;
  @Input() pagination = false;
  @Input() treeMode = false;
  @Input() autogroupField = 'name'
  @Input() suppressRowClickSelection = false
  @Input() floatingFilter = true
  // Used for common mode
  @Input() data: any[];
  @Input() customFrameworkComponents = null;
  @Input() showSidebar = true;
  @Input() columnDefs: ColDef[]
  @Output() itemDidSelect = new EventEmitter<any>()
  @Output() selectionDidChange = new EventEmitter<any[]>()
  @Output() firstDataDidRender = new EventEmitter<void>()
  @Output() filteredData = new EventEmitter<any>()
  @Input() checkBoxSelection = false;


  public rowSelection: 'single' | 'multiple' = 'multiple';
  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [{ statusPanel: 'agAggregationComponent' }],
  };

  private _unsubscribeAll: Subject<any> = new Subject<any>()

  private defaultFilterStates
  private isExporting = false
  public gridApi: GridApi
  private gridColumnApi: ColumnApi
  modules = AllModules

  public autoGroupColumnDef: ColDef = {
    headerName: 'Feature Permissions',
    minWidth: 80,
    field: 'permission',
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      suppressCount: true,
      checkbox: true,
    },
  };

  excelStyles = [
    {
      id: 'dateTime',
      dataType: 'DateTime',
      numberFormat: { format: 'mm/dd/yy' },
    }
  ]

  defaultColDef: ColDef

  sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        minWidth: 225,
        width: 225,
        maxWidth: 225,
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: 'right',
    defaultToolPanel: 'none',
  };

  frameworkComponents = {
    checkboxRenderer: CheckboxRenderer,  //originCheckBoxRenderer  have to issue when checkbox selection in grid
  }

  agGridClassName = this.configService.agGridClassName$;

  public gridOptions: GridOptions;
  public checkBoxSelected = false;
  constructor(private configService: FuseConfigService) {

  }

  ngOnInit(): void {
    this.gridOptions = {
      onCellClicked: this.onCellClicked.bind(this),
    };

    if(this.customFrameworkComponents) {
      this.frameworkComponents = {
        ...this.frameworkComponents,
        ...this.customFrameworkComponents,
      }
    }
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      floatingFilter: this.floatingFilter,
      hide: false,
      resizable: true,
      sortable: true
    }
    if(this.showSidebar === null) this.showSidebar = true;
    if(this.columnDefs.length > 0) {
      this.columnDefs = this.columnDefs.map((colDef, index) => {
        let columnDefinition = colDef;
        if(colDef['filter'] === 'agDateColumnFilter') {
          columnDefinition = {
            ...colDef,
            cellClass: 'dateTime',
            valueFormatter: params => dateFormatter(params.data[colDef.field]),
            filterParams: {
              comparator: ( filterLocalDateAtMidnight: Date, cellValue: string)=>{
                const dateAsString = cellValue;
                if (dateAsString == null) return -1;
                const dateParts = dateAsString.split(/[/|-]/);
                const cellDate = new Date(
                  Number(dateParts[0]),
                  Number(dateParts[1])-1,
                  Number(dateParts[2]),
                );

                if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                  return 0;
                }

                if (cellDate < filterLocalDateAtMidnight) {
                  return -1;
                }
                if (cellDate > filterLocalDateAtMidnight) {
                  return 1;
                }
                return 0;
              }
            }
          }
        }
        if(index == 0 && this.checkBoxSelection){
          columnDefinition = {
            ...columnDefinition,
            headerCheckboxSelection: true,
            checkboxSelection: true,
          }
        }

        return columnDefinition;
      });

    }
  }

  onCellClicked(params) {

    console.log(params);
    this.checkBoxSelected = true;
    // let firstfield = "";
    // for(let i=0; i<this.columnDefs.length; i++){
    //   if(!this.columnDefs[i].hide){
    //     firstfield = this.columnDefs[i].field;
    //     break;
    //   }
    // }

    // if(params.column.getColId() == firstfield){
    //   console.log('$$$$$$$$$$$$$====');
    // }
    // Your cell click handling logic...
  }

  // onSelectionChanged(event) {
  //   if (this.isCheckboxClicked) {
  //       // Prevent default action of selection changed
  //       event.api.deselectAll();
  //       this.isCheckboxClicked = false;  // reset the flag
  //   } else {
  //       // Handle selection change
  //   }
  // }

  get getClasses(){
    if(this.columnDefs.length ==5)
      return "w-full h-full hideHorizontalScrollbar";
    return "w-full h-full";
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onSelectionChanged(event) {

    const selectedRows = this.gridApi.getSelectedRows();

    if(this.checkBoxSelected){
      this.itemDidSelect.emit(selectedRows[0])
      this.selectionDidChange.emit(selectedRows)
      event.api.deselectAll();
    }else{
      this.selectionDidChange.emit(selectedRows)
    }
    this.checkBoxSelected = false;

  }

  onGridReady(params): void {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    this.defaultFilterStates = this.gridApi.getFilterModel()
  }

  onSortChanged({ columnApi }: SortChangedEvent): void {
    console.log('Table View: onSortChanged')
  }

  onFilterChanged({ api }: FilterChangedEvent): void {
    this.filteredData.emit(this.gridApi.getDisplayedRowCount())
  }

  onFirstDataRendered(): void {
    this.firstDataDidRender.emit()
  }

  setFilterState(filterState) {
    if(filterState)
      this.gridApi.setFilterModel(filterState)
    else
      this.gridApi.setFilterModel(this.defaultFilterStates)
  }

  setColumnState(columnDefs) {
    if(columnDefs) this.gridApi.setColumnDefs(columnDefs);
    else this.gridApi.setColumnDefs(this.columnDefs);
  }

  getTableViewState() {
    return {
      columnDefs: this.gridApi.getColumnDefs(),
      filterState: this.gridApi.getFilterModel()
    }
  }

  // This function is called when importing excel file
  // return expected excel columns in the import file
  // If excel file columns did not match this expected one, then excel import fails
  getImportColumns() {
    const columns = {};
    const filterToType = {
      agTextColumnFilter: 'string',
      agNumberColumnFilter: 'number',
      agDateColumnFilter: 'date',
      agSetColumnFilter: 'set',
    }
    let alphabetaIndex = 0;
    let alphabets = [...Array(26).keys()].map((_, index) => {
      return String.fromCharCode(index + 65)
    })

    const twoLengthAlphabetsWithPrefixA = [...Array(26).keys()].map((_, index) => {
      return "A" + String.fromCharCode(index + 65);
    })
    const twoLengthAlphabetsWithPrefixB = [...Array(26).keys()].map((_, index) => {
      return "B" + String.fromCharCode(index + 65);
    })
    const twoLengthAlphabetsWithPrefixC = [...Array(26).keys()].map((_, index) => {
      return "C" + String.fromCharCode(index + 65);
    })

    alphabets = alphabets.concat(twoLengthAlphabetsWithPrefixA);
    alphabets = alphabets.concat(twoLengthAlphabetsWithPrefixB);
    alphabets = alphabets.concat(twoLengthAlphabetsWithPrefixC);

    this.columnDefs.map((col) => {
      if (alphabetaIndex >= alphabets.length)
        return;
      const filter = String(col.filter)
      columns[alphabets[alphabetaIndex]] = {
        field: col.field,
        type: filterToType[filter],
        headerName: col.headerName || null
      }
      alphabetaIndex++
    })
    return columns;
  }

  exportTableView(exportConfig: ExportConfig) {
    if(this.isExporting) return;

    this.isExporting = true;

    const config = {

    }

    switch(exportConfig.columnOption) {
      case ColumnOption.ALL:
        config['allColumns'] = true;
        break;
      case ColumnOption.NAME:
        config['columnKeys'] = ['name', 'Name']
        break;
      default:
        break;
    }

    let timeFormat = ''
    switch(exportConfig.timeFormat) {
      case TimeFormat.DATE_ONLY:
        timeFormat = '';
        break;
      case TimeFormat.HH_MM:
        timeFormat = 'hh:mm';
        break;
      case TimeFormat.HH_MM_SS:
        timeFormat = 'hh:mm:ss';
        break;
      case TimeFormat.HH_MM_SS_SSSXXX:
        timeFormat = 'hh:mm:ss.sssxxx';
        break;
      default:
        break;
    }

    let dateTimeFormat: string
    switch(exportConfig.dateFormat) {
      case DateFormat.NORMAL:
        dateTimeFormat = timeFormat === '' ? 'mm/dd/yyy' : `mm/dd/yyy ${timeFormat}`;
        break;
      case DateFormat.ISO:
        dateTimeFormat = 'yyy-mm-ddThh:mm:ss'
        break;
      default:
        dateTimeFormat = '';
        break;
    }

    this.excelStyles = [
      {
        id: 'dateTime',
        dataType: 'DateTime',
        numberFormat: { format: dateTimeFormat },
      }
    ]

    // Wait until the excelStyle reaches the grid component
    setTimeout(() => {
      if(exportConfig.fileFormat === FileFormat.EXCEL) {
        this.gridApi.exportDataAsExcel({ ...config, fileName: exportConfig.fileName })
      } else {
        // const config: CsvExportParams;
        this.gridApi.exportDataAsCsv({ ...config, fileName: exportConfig.fileName })
      }
      this.isExporting = false;
    }, 500)
  }
}
