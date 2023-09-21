

import { Component, OnInit, ViewChild } from '@angular/core'
import { WebUserListStore } from './web-user-list.store'
import { WebUserSelectTableViewComponent } from '@case-clinical/web/user/ui';
import { ColDef } from '@ag-grid-community/core';
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ng-container *featureFlag="'User.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.data"
          [columnDefs]="columnDefs"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="user"
          title="User"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [WebUserListStore],
})
export class WebUserListComponent implements OnInit {
  @ViewChild(WebUserSelectTableViewComponent) tableView: WebUserSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [,
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ headerName: 'Developer', field: 'developer', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'username', filter: 'agTextColumnFilter'  },
{ field: 'password', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'avatarUrl', filter: 'agTextColumnFilter'  },
{ field: 'line1', filter: 'agTextColumnFilter'  },
{ field: 'line2', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },
{ field: 'phone', filter: 'agTextColumnFilter'  },
{ field: 'bio', filter: 'agTextColumnFilter'  },
{ field: 'slug', filter: 'agTextColumnFilter'  },
{ field: 'status', filter: 'agTextColumnFilter'  },

{
      headerName: 'Signup Status',
      field: 'signupStatus',
      valueFormatter: params => currencyFormatter(params.data?.signupStatus, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Verified', field: 'verified', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'customerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'planId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },
{ field: 'cellPhone', filter: 'agTextColumnFilter'  },
{ field: 'education', filter: 'agTextColumnFilter'  },
{ field: 'officeName', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebUserListStore,
  ) {
  }

 ngOnInit(): void {
    this.store.loadUsersEffect()
 }

  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) {this.store.importExcelEffect(excelData)}

  searchQueryDidChange(searchQuery) {this.store.setSearchQuery(searchQuery)
    this.store.loadUsersEffect()
  }
}
