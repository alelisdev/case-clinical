import { ChangeDetectionStrategy, ViewEncapsulation, OnDestroy} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WebRoleTableViewComponent } from './roles-table';
import { TeamSetttingStore } from './team.store';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core'
import { UserCreateUserInput } from '@case-clinical/web/core/data-access'


@Component({
    selector       : 'settings-team',
    templateUrl    : './team.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      TeamSetttingStore
    ]
})
export class SettingsTeamComponent implements OnInit, OnDestroy
{
  @ViewChild(WebRoleTableViewComponent) tableView: WebRoleTableViewComponent;
  @ViewChild('dlg') dlgTpl!: TemplateRef<any>;
  fields: FormlyFieldConfig[] = []
  dlgForm = new FormGroup({})
  formModel: any = {}
  dlgOptions: FormlyFormOptions = {}

  ref: any

    vm$ = this.store.vm$
    private _unsubscribeAll: Subject<any> = new Subject<any>()
    /**
     * Constructor
     */
    constructor(private store: TeamSetttingStore,  private readonly dialog: DialogService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.store.fetchUsersAndRolesEffect()
      this.store.selectedTableIds$.pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe((data) => {
        if(data.shouldRefreshTable) {
          this.tableView.setSelected(data.selectedRoleIds)
        }
      })
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null)
      this._unsubscribeAll.complete()
    }

    rowItemsSelected(selectedData) {
      console.log(selectedData)
      this.store.setSelectedRoleIds(selectedData.map((data) => data.id))
    }

    selectUser(user: any) {
      this.store.selectUser(user)
    }

    setOriginalRoleIds() {
      this.store.setOriginalRoleIds()
    }

    saveRoles() {
      this.store.saveRolesEffect()
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    setSearchQuery(searchQuery: string){
      this.store.setSearchQuery(searchQuery)
    }

    openDialog(tpl: TemplateRef<any>, { value, height, width }: { value?: any; height: number; width: number }) {
      this.dlgForm.reset()
      this.ref = this.dialog.open(tpl, {
        data: {
          value: value
        },
        height: height || 'auto',
        width: width || '50%',
      });

      this.ref.afterClosed$.subscribe(result => {
        console.log('Dialog closed', result);
      });
    }

    open(directModel=undefined): void {
      this.dlgForm?.reset();
      this.ref = this.dialog.open(this.dlgTpl, {
        data: {
          value: {}
        },
        height: 'auto',
        width: 'auto',
      })

    }

    submit(formData) { console.log(formData);
       const location = formData['location'];
       alert(JSON.stringify(formData))
       const {name,developer,username,password,firstName,lastName,avatarUrl,line1,line2,city,state,postalCode,phone,bio,slug,status,signupStatus,verified,customerId,planId,dateOfBirth,cellPhone,education,officeName} = formData;
       this.store.createUserEffect({
        name,developer,username,password,firstName,lastName,avatarUrl,line1,line2,city,state,postalCode,phone,bio,slug,status,signupStatus,verified,customerId,planId,dateOfBirth,cellPhone,education,officeName
       })
      this.dlgForm.reset()
      this.dialog.closeAll();
    }

}
