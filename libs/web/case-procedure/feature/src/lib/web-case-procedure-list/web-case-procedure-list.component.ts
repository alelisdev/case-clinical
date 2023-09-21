import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
import { WebCaseProcedureSelectTableViewComponent } from '@case-clinical/web/case-procedure/ui'
import { ColDef } from '@ag-grid-community/core'

import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { ICellRendererParams } from 'ag-grid-community'
import { GroupCellRendererParams } from '@ag-grid-enterprise/all-modules'
import { IDetailCellRendererParams } from '@ag-grid-community/all-modules'

import { MasterDetailModule, RowGroupingModule } from '@ag-grid-enterprise/all-modules'

@Component({
  template: `
    <ng-container *featureFlag="'CaseProcedure.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <!-- <ag-grid-angular
          #agGrid
          id="myGrid"
          class="ag-theme-alpine h-full w-full"
          [rowData]="vm.caseProcedures"
          [columnDefs]="columnDefs"
          [modules]="modules"
          [enableColResize]="true"
          [enableSorting]="true"
          [enableFilter]="true"
          [sideBar]="sideBar"
          (selectionChanged)="onSelectionChanged($event)"
          [frameworkComponents]="frameworkComponents"
          [defaultColDef]="defaultColDef"
          (sortChanged)="onSortChanged($event)"
          (filterChanged)="onFilterChanged($event)"
          [rowSelection]="'multiple'"
          [rowMultiSelectWithClick]="true"
          [checkboxSelection]="true"
          [masterDetail]="true"
          [detailRowAutoHeight]="true"
          [detailCellRendererParams]="procedureVendorRendererParams"
          (firstDataRendered)="onFirstDataRendered($event)"
          (gridReady)="onGridReady($event)"
          (rowClicked)="onRowClicked($event)"
        ></ag-grid-angular> -->

        <ui-data-list
          class="h-full w-full"
          [data]="vm.caseProcedures"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="caseProcedure"
          title="CaseProcedure"
          [cardViewTemplate]="cardViewTemplate"
        ></ui-data-list>
      </ng-container>
    </ng-container>

    <ng-template #cardViewTemplate>
      <ui-formly-json-form
        class="w-full h-full"
        [formName]="'caseProcedure_kanban_list'"
        [showSubmitButton]="false"
        [model]="{}"
        [componentStore]="store"
        [formData]="formData">
      </ui-formly-json-form>
    </ng-template>
  `,
  providers: [
    WebCaseProcedureFeatureStore,
    WebLegalCaseFeatureStore,
    WebAppointmentFeatureStore,
    WebLocationFeatureStore,
  ],
})
export class WebCaseProcedureListComponent implements OnInit {
  @ViewChild(WebCaseProcedureSelectTableViewComponent) tableView: WebCaseProcedureSelectTableViewComponent

  modules = [ClientSideRowModelModule, MasterDetailModule, RowGroupingModule]
  readonly vm$ = this.store.vm$

  rowGroupPanelShow = 'always'
  formData = {
    caseProcedures: this.store.caseProcedures$,
  }

  public procedureVendorRendererParams: any = {
    // level 2 procedure vendors
    detailGridOptions: {
      columnDefs: [
        { field: 'name', cellRenderer: 'agGroupCellRenderer'  },
        { field: 'contract.name' },
        { field: 'vendor.name' },
        { field: 'estimate'  },
        { field: 'fundingApproved',  cellRenderer: 'agCheckboxCellRenderer' },
    ],
      defaultColDef: {
        flex: 1,
      },
      masterDetail: true,
      detailRowAutoHeight:true,
      detailCellRendererParams: {
        // level 3 case accounts
        detailGridOptions: {
          columnDefs: [
            { field: 'name', cellRenderer: 'agGroupCellRenderer' },
            { field: 'count' },
            { field: 'description' },
            { field: 'medicareRate' },
            { field: 'providerPercentOfMedicare' },
            { field: 'contractedAmount' },
            { field: 'markupPercent' },
            { field: 'reimbursedTotal' },
            { field: 'initialRevenue' },
            { field: 'factor' },
            { field: 'retailBill' },
            { field: 'estMargin' },
            { field: 'roi' },
            { field: 'attorneyPaid' },
            { field: 'percentOfRetail' },
          ],
          defaultColDef: {
            flex: 1,
          },
          masterDetail: true,
          detailRowAutoHeight:true,
          detailCellRendererParams: {
            // level 4 journal entries
            detailGridOptions: {
              columnDefs: [
                { field: 'name', cellRenderer: 'agGroupCellRenderer' },
                { field: 'amount' },
                { field: 'locationName' },
                { field: 'fromTo' },
                { field: 'process' },
                { field: 'perAccountOrAggregateJE' },
                { field: 'costRate' },
                { field: 'accountType' },
                { field: 'accountNumber' },
                { field: 'postingDate' },
                { field: 'documentDate' },
                { field: 'dueDate' },

              ],
              defaultColDef: {
                flex: 1,
              },
            },
            getDetailRowData: (params) => {
              params.successCallback(params.data.journalEntries)
            },
          } as IDetailCellRendererParams,
        },
        getDetailRowData: (params) => {
          params.successCallback(params.data.caseAccounts)
        },
      } as IDetailCellRendererParams,
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.procedureVendors)
    },
  } as IDetailCellRendererParams

  columnDefs: any[] = [
  {
  
  masterDetail: true,
  detailRowAutoHeight:true,
  detailRendererParams: this.procedureVendorRendererParams,
  headerName: 'Procedure',
  children: [
    { field: 'procedureType.name', headerName: 'Procedure Type', filter: 'agSetColumnFilter',enableRowGroup: true, cellRenderer: 'agGroupCellRenderer'  },
    { field: 'procedureStatus.name', headerName: 'Procedure Status', filter: 'agSetColumnFilter', enableRowGroup: true },
    { field: 'location.name', headerName: 'Location', filter: 'agTextColumnFilter',enableRowGroup: true },
    { field: 'id', filter: 'agTextColumnFilter', hide: true },
    {
      field: 'createdAt',
      filter: 'agDateColumnFilter',
      cellClass: 'dateTime',
      valueFormatter: (params) => dateFormatter(params.data?.createdAt),
      hide: true,
    },
    {
      field: 'updatedAt',
      filter: 'agDateColumnFilter',
      cellClass: 'dateTime',
      valueFormatter: (params) => dateFormatter(params.data?.updatedAt),
      hide: true,
    },
    { field: 'name', filter: 'agTextColumnFilter' },
    { field: 'legalCaseId', filter: 'agTextColumnFilter', hide: true },
    { field: 'appointmentId', filter: 'agTextColumnFilter', hide: true },
    { field: 'locationId', filter: 'agTextColumnFilter', hide: true },
    { field: 'procedureDate', filter: 'agDateColumnFilter' },

    {
      headerName: 'Cost',
      field: 'cost',
      valueFormatter: (params) => currencyFormatter(params.data?.cost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
    },
    { field: 'notes', filter: 'agTextColumnFilter' },
    { field: 'createdBy', filter: 'agTextColumnFilter' },
    { field: 'dateCreated', filter: 'agDateColumnFilter' },
    { headerName: 'Removed', field: 'removed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
    { field: 'approvedDate', filter: 'agDateColumnFilter' },
    { field: 'procedureReasonName', filter: 'agTextColumnFilter' },
    { field: 'decisionDate', filter: 'agDateColumnFilter' },
    { field: 'nextActionDate', filter: 'agDateColumnFilter' },
  ]},
  {
    headerName: 'Legal Case',
    children: [
      { field: 'legalCase.accidentType.name', headerName: 'Accident Type', filter: 'agSetColumnFilter',enableRowGroup: true },
      { field: 'legalCase.patient.name', headerName: 'Patient', filter: 'agTextColumnFilter',enableRowGroup: true },
      { field: 'legalCase.medLevel.name', headerName: 'Med Level', filter: 'agSetColumnFilter',enableRowGroup: true },
      { field: 'legalCase.firm.name', headerName: 'Firm', filter: 'agSetColumnFilter',enableRowGroup: true },
      { field: 'legalCase.attorney.name', headerName: 'Attorney', filter: 'agSetColumnFilter',enableRowGroup: true },
      { field: 'legalCase.agent.name', headerName: 'Assigned To', filter: 'agSetColumnFilter',enableRowGroup: true },
    ]
},
  {
    headerName: 'Appointment',
    children: [
      { field: 'appointment.appointmentStatus.name', headerName: 'Appointment Status', filter: 'agSetColumnFilter',enableRowGroup: true },
      { field: 'appointment.medicalRecordStatus.name', headerName: 'Medical Record Status', filter: 'agSetColumnFilter',enableRowGroup: true },
      { field: 'appointment.appointmentDateAndTime', filter: 'agDateColumnFilter',enableRowGroup: true  },
      { field: 'appointment.patient.name', headerName: 'Patient', filter: 'agTextColumnFilter',enableRowGroup: true },
      { headerName: 'MedicalReport', field: 'appointment.medicalReport.name', filter: 'agTextColumnFilter' ,enableRowGroup: true },
      { headerName: 'Bill', field: 'appointment.bill.name', filter: 'agTextColumnFilter' ,enableRowGroup: true },
      { headerName: 'Imaging', field: 'appointment.imaging.name', filter: 'agTextColumnFilter',enableRowGroup: true  },
    ]
},
  ]

  constructor(
    public readonly store: WebCaseProcedureFeatureStore,
    private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore,
    private readonly appointmentFeatureStore: WebAppointmentFeatureStore,
    private readonly locationFeatureStore: WebLocationFeatureStore,
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

  ngOnInit(): void {
    this.store.loadCaseProceduresEffect()
    this.store.filterLegalCases('').subscribe()
    this.store.filterAppointments('').subscribe()
    this.store.filterLocations('').subscribe()
  }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        case 'legalCase': {
          const legalCaseCreateActionResultListener = this.legalCaseFeatureStore.actionResult$.subscribe((result) => {
            if (result.done) {
              this.store.addLegalCase(result.item)
              setTimeout(() => {
                observer.next(true)
                observer.complete()
              }, 300)
              legalCaseCreateActionResultListener.unsubscribe()
            }
          })
          this.legalCaseFeatureStore.createLegalCaseEffect({ name: newName })
          break
        }

        case 'appointment': {
          const appointmentCreateActionResultListener = this.appointmentFeatureStore.actionResult$.subscribe(
            (result) => {
              if (result.done) {
                this.store.addAppointment(result.item)
                setTimeout(() => {
                  observer.next(true)
                  observer.complete()
                }, 300)
                appointmentCreateActionResultListener.unsubscribe()
              }
            },
          )
          this.appointmentFeatureStore.createAppointmentEffect({ name: newName })
          break
        }

        case 'location': {
          const locationCreateActionResultListener = this.locationFeatureStore.actionResult$.subscribe((result) => {
            if (result.done) {
              this.store.addLocation(result.item)
              setTimeout(() => {
                observer.next(true)
                observer.complete()
              }, 300)
              locationCreateActionResultListener.unsubscribe()
            }
          })
          this.locationFeatureStore.createLocationEffect({ name: newName })
          break
        }

        default:
          observer.next(false)
      }
    })
  }

  validateImportData(excelData: any[]) {
    return new Observable((resolver) => {
      this.store
        .validateImportData(excelData)
        .subscribe((result) => {
          resolver.next(result)
          resolver.complete()
        })
        .unsubscribe()
    })
  }

  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) {
    this.store.importExcelEffect(excelData)
  }

  searchQueryDidChange(searchQuery) {
    this.store.setSearchQuery(searchQuery)
    this.store.loadCaseProceduresEffect()
  }

  onFirstDataRendered(params) {
    console.log('clicked', params)
  }

  onGridReady(params) {
    this.store.caseProcedures$
      .pipe(
        tap((data) => {
          params.api.setRowData(data)
        }),
      )
      .subscribe()
  }

  onRowClicked(event) {
    console.log('clicked', event)
    const node = event.api.getDisplayedRowAtIndex(event.rowIndex)!
    node.setExpanded(!node.expanded)
  }

  onSelectionChanged(event) {
    const selectedRows = event.api.getSelectedRows()
    this.store.setSelectedCaseProcedures(selectedRows)
  }
}
