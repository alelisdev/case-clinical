import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { dateFormatter } from '@case-clinical/web/core/data-access';
import { MISDashboardStore } from './mis-dashboard.component.store';
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared';
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared';
import { FuseConfigService } from '@fuse/services/config';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { DialogRef } from '@ngneat/dialog';
import { GridApi } from '@ag-grid-community/core'
import { ColDef } from '@ag-grid-community/core';

@Component({
  selector: 'mis-dashboard',
  templateUrl: './mis-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WebRecommendedOrderFeatureStore, WebAuthorizationFeatureStore, MISDashboardStore]
})
export class MisDashboardComponent {
  model: any = {}
  vm$ = this.store.vm$;
  agGridClassName = this.configService.agGridClassName$;
  modules = AllModules
  columnDefs: any[] = [];
  recommendedOrderColumnDefs: ColDef[] = [
    {
      field: 'name',
      cellRenderer: 'agGroupCellRenderer',
      flex: 1,
    },
    {
      field: 'status',
      flex: 1,
    },
    {
      field: 'timeDelta',
      flex: 1,
    },
    { field: 'createdAt', filter: 'agDateColumnFilter', cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt) },
    { field: 'updatedAt', filter: 'agDateColumnFilter', cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt) },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: false,
    hide: false,
    resizable: true,
    sortable: true
  }

  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { field: 'id', filter: 'agTextColumnFilter', hide: true },
        { field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
        { field: 'authorizationCategory.name', headerName: 'Category', filter: 'agTextColumnFilter' },
        { field: 'authorizationType.name', headerName: 'Type', filter: 'agTextColumnFilter' },
        { field: 'name', headerName: 'Orders', filter: 'agTextColumnFilter' },
        { field: 'requestDescription', filter: 'agTextColumnFilter' },
        { field: 'createdAt', filter: 'agDateColumnFilter', cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt) },
        { field: 'updatedAt', filter: 'agDateColumnFilter', cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt) },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        floatingFilter: false,
        hide: false,
        resizable: true,
        sortable: true
      },
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.authorizations);
    },
  };

  nameValidationRowData: any[];
  public gridApi: GridApi

  /**
   * Constructor
   */
  constructor(
    private store: MISDashboardStore,
    private configService: FuseConfigService,
  ) {
  }

  onGridReady(params): void {
    this.gridApi = params.api
  }

}
