import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { Subject, takeUntil } from 'rxjs';
import { WebFeaturesTableViewComponent } from './tables/features-table';
import { SettingsRoleStore } from './settings-role.store';
import { WebNavigationTableViewComponent } from './tables/routing-table-view.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-role',
  templateUrl: './settings-role.component.html',
  styleUrls: ['./settings-role.component.scss'],
  providers: [
    SettingsRoleStore
  ]
})
export class SettingsRoleComponent implements OnInit, OnDestroy {
  @ViewChild(WebFeaturesTableViewComponent) tableView: WebFeaturesTableViewComponent;
  @ViewChild(WebNavigationTableViewComponent) navigationTableView: WebNavigationTableViewComponent;

  drawerMode: 'over' | 'side' = 'side'
  drawerOpened = true
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  vm$ = this._store.vm$

  constructor(
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: SettingsRoleStore,
  ) { }

  ngOnInit(): void {
    this._store.loadRolesAndFeaturesEffect()

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(({ matchingAliases }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side'
        this.drawerOpened = true
      } else {
        this.drawerMode = 'over'
        this.drawerOpened = false
      }

      // Mark for check
      this._changeDetectorRef.markForCheck()
    })
  }

  savePermissions() {
    this._store.updateRoleFeaturePermissionsEffect()
  }

  onSubmit(roleId: string) {
    console.log('onSubmit, roleId = ', roleId, this.tableView)
    if(this.tableView)
      this._store.loadRoleFeaturePermissionsEffect(roleId)
    else if(this.navigationTableView)
      this._store.loadRoleNavigationsEffect(roleId)
  }

  setOriginalPermissions() {
    this._store.setOriginPermissions()
  }

  permissionSelectionDidChange(data: { selectedPermissionIds: string[], featureIds: string[] }) {
    this._store.setSelectedPermissions(data.selectedPermissionIds)
    this._store.setSelectedFeatureIds(data.featureIds)
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }
}
