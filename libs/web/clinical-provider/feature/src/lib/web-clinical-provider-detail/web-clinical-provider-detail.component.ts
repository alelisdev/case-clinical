
import { WebClinicalProviderDetailStore } from './web-clinical-provider-detail.store'
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
import { ClinicalProvider } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: `./web-clinical-provider-detail.component.html`,
  providers: [WebClinicalProviderDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebClinicalProviderDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: ClinicalProvider
  readonly vm$ = this.store.vm$

  constructor(
    private readonly store: WebClinicalProviderDetailStore,
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
              title: 'Clinical Provider Details',
              type: 'group',
              children: [

                {
                  id: 'details.overview',
                  title: 'Overview',
                  type: 'basic',
                  link: `${routeString}/overview`,
                },
{
                  id: 'details.user',
                  title: 'User',
                  type: 'basic',
                  link: `${routeString}/users/${s.item.user?.id ? s.item.user?.id : 'create'}`,

                },{
                  id: 'details.appointment',
                  title: 'Appointments',
                  type: 'basic',
                  link: `${routeString}/appointments`,

                },
{
                  id: 'details.clinicalProviderLocation',
                  title: 'Clinical Provider Locations',
                  type: 'basic',
                  link: `${routeString}/clinical-provider-locations`,

                },
{
                  id: 'details.clinicalProviderSpecialty',
                  title: 'Clinical Provider Specialties',
                  type: 'basic',
                  link: `${routeString}/clinical-provider-specialties`,

                },
{
                  id: 'details.clinicalProviderTag',
                  title: 'Clinical Provider Tags',
                  type: 'basic',
                  link: `${routeString}/clinical-provider-tags`,

                },
{
                  id: 'details.favoriteProvider',
                  title: 'Favorite Providers',
                  type: 'basic',
                  link: `${routeString}/favorite-providers`,

                },
{
                  id: 'details.medicalConditionProvider',
                  title: 'Medical Condition Providers',
                  type: 'basic',
                  link: `${routeString}/medical-condition-providers`,

                },
{
                  id: 'details.medicalRecord',
                  title: 'Medical Records',
                  type: 'basic',
                  link: `${routeString}/medical-records`,

                },
{
                  id: 'details.education',
                  title: 'Educations',
                  type: 'basic',
                  link: `${routeString}/educations`,

                },
{
                  id: 'details.experience',
                  title: 'Experiences',
                  type: 'basic',
                  link: `${routeString}/experiences`,

                },
{
                  id: 'details.award',
                  title: 'Awards',
                  type: 'basic',
                  link: `${routeString}/awards`,

                },
{
                  id: 'details.pchProvider',
                  title: 'Pch Providers',
                  type: 'basic',
                  link: `${routeString}/pch-providers`,

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
      this.store.deleteClinicalProviderEffect(item)
    }
  }
}


