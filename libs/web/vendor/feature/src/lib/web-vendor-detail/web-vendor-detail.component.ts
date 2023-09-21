
import { WebVendorDetailStore } from './web-vendor-detail.store'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDrawer } from '@angular/material/sidenav'
import { map, Subject, takeUntil, tap } from 'rxjs'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { Vendor } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: `./web-vendor-detail.component.html`,
  providers: [WebVendorDetailStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebVendorDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: Vendor
  readonly vm$ = this.store.vm$

  constructor(
    private readonly store: WebVendorDetailStore,
    private readonly route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {}
  ngAfterViewInit(): void {
    var routeString: string = this.route.snapshot.pathFromRoot.map((r)=> r.url).join('/').replace('//','/')

    this.vm$
      .pipe(
        tap((s) => {
          if(s?.item?.id != undefined) {
          this.menuData = [
            {
              id: 'Details',
              title: 'Vendor Details',
              type: 'group',
              children: [

                {
                  id: 'details.overview',
                  title: 'Overview',
                  type: 'basic',
                  link: `${routeString}/overview`,
                },
{
                  id: 'details.assignedDocument',
                  title: 'Assigned Documents',
                  type: 'basic',
                  link: `${routeString}/assigned-documents`,

                },
{
                  id: 'details.caseAccount',
                  title: 'Case Accounts',
                  type: 'basic',
                  link: `${routeString}/case-accounts`,

                },
{
                  id: 'details.clinicalProvider',
                  title: 'Clinical Providers',
                  type: 'basic',
                  link: `${routeString}/clinical-providers`,

                },
{
                  id: 'details.contract',
                  title: 'Contracts',
                  type: 'basic',
                  link: `${routeString}/contracts`,

                },
{
                  id: 'details.durableMedicalEquipment',
                  title: 'Durable Medical Equipments',
                  type: 'basic',
                  link: `${routeString}/durable-medical-equipments`,

                },
{
                  id: 'details.procedureVendor',
                  title: 'Procedure Vendors',
                  type: 'basic',
                  link: `${routeString}/procedure-vendors`,

                },
{
                  id: 'details.vendorLocation',
                  title: 'Vendor Locations',
                  type: 'basic',
                  link: `${routeString}/vendor-locations`,

                }
              ],
            },
          ]
        }
      }),
      )
      .subscribe()
  }

  ngOnInit(): void {
    // Subscribe to media query change
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('md')) {
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

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteVendorEffect(item)
    }
  }
}


