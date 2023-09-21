

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebTeamUserFeatureStore } from '@case-clinical/web/team-user/shared'
import { WebTeamUserSelectTableViewComponent } from '@case-clinical/web/team-user/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebTeamFeatureStore } from '@case-clinical/web/team/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { WebTeamRoleFeatureStore } from '@case-clinical/web/team-role/shared'

@Component({
  template: `
    <ng-container *featureFlag="'TeamUser.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.teamUsers"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="teamUser"
          title="TeamUser"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebTeamUserFeatureStore,
    WebTeamFeatureStore,
    WebUserFeatureStore,
    WebTeamRoleFeatureStore
],

})
export class WebTeamUserListComponent implements OnInit {
  @ViewChild(WebTeamUserSelectTableViewComponent) tableView: WebTeamUserSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'team.name', headerName: 'Team', filter: 'agTextColumnFilter' },
{ field: 'user.name', headerName: 'User', filter: 'agTextColumnFilter' },
{ field: 'teamRole.name', headerName: 'Team Role', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'teamId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'userId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'teamRoleId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebTeamUserFeatureStore,
    private readonly teamFeatureStore: WebTeamFeatureStore,
private readonly userFeatureStore: WebUserFeatureStore,
private readonly teamRoleFeatureStore: WebTeamRoleFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadTeamUsersEffect()
    this.store.filterTeams('').subscribe()
    this.store.filterUsers('').subscribe()
    this.store.filterTeamRoles('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'team':
          {
            const teamCreateActionResultListener = this.teamFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addTeam(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                teamCreateActionResultListener.unsubscribe();
              }
            })
            this.teamFeatureStore.createTeamEffect({ name: newName });
            break;
          }


        case 'user':
          {
            const userCreateActionResultListener = this.userFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addUser(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                userCreateActionResultListener.unsubscribe();
              }
            })
            this.userFeatureStore.createUserEffect({ name: newName });
            break;
          }


        case 'teamRole':
          {
            const teamRoleCreateActionResultListener = this.teamRoleFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addTeamRole(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                teamRoleCreateActionResultListener.unsubscribe();
              }
            })
            this.teamRoleFeatureStore.createTeamRoleEffect({ name: newName });
            break;
          }

        default:
          observer.next(false);
      }
    })
  }


  validateImportData(excelData: any[]) {
    return new Observable((resolver) => {
      this.store.validateImportData(excelData).subscribe((result) => {
        resolver.next(result);
        resolver.complete();
      }).unsubscribe();
    })
  }


  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) { this.store.importExcelEffect(excelData) }

  searchQueryDidChange(searchQuery) {
    this.store.setSearchQuery(searchQuery)
    this.store.loadTeamUsersEffect()
  }
}
