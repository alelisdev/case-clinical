import { Component, ViewChild, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { of, switchMap } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'ui-form-builder-example',
  styleUrls: ['./form-builder-example.component.scss'],
  templateUrl: './form-builder-example.component.html'
})
export class FormBuilderExampleComponent implements OnInit {
//   formData = {
//     days: [
//       'Monday', 'Tuesday', 'Wendesday', "Thursday", "Monday", 'Satuday', "Sunday"
//     ],
//     accidentTypes: this.filterAccidentTypes()
//   }

//   constructor(private data: WebCoreDataAccessService) {

//   }

// filterAccidentTypes() {
//     return this.data.userAccidentTypes({ input: {} }).pipe(
//       switchMap((response) => of(response.data.items))
//     )
//   }

//   submit(data) {
//     alert(JSON.stringify(data))
//   }

@ViewChild('drawer') drawer: MatDrawer;
  panels: any[] = [];

  signupSetting = true;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;
  selectedPanel = null
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Setup available panels

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  formFieldSelected($event) {
    console.log($event)
    if($event) {
      this.selectedPanel = $event.name;

      // Close the drawer on 'over' mode
      if (this.drawerMode === 'over') {
        this.drawer.close();
      }
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
