
import { WebPriorAuthorizationRequestDetailStore } from './web-prior-authorization-request-detail.store'
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
import { PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: `./web-prior-authorization-request-detail.component.html`,
  providers: [WebPriorAuthorizationRequestDetailStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebPriorAuthorizationRequestDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: PriorAuthorizationRequest
  readonly vm$ = this.store.vm$

  constructor(
    private readonly store: WebPriorAuthorizationRequestDetailStore,
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
              title: 'Prior Authorization Request Details',
              type: 'group',
              children: [

                {
                  id: 'details.overview',
                  title: 'Overview',
                  type: 'basic',
                  link: `${routeString}/overview`,
                },
{
                  id: 'details.claim',
                  title: 'Claims',
                  type: 'basic',
                  link: `${routeString}/claims`,

                },
{
                  id: 'details.priorAuthDme',
                  title: 'Prior Auth Dmes',
                  type: 'basic',
                  link: `${routeString}/prior-auth-dmes`,

                },
{
                  id: 'details.priorAuthGuideline',
                  title: 'Prior Auth Guidelines',
                  type: 'basic',
                  link: `${routeString}/prior-auth-guidelines`,

                },
{
                  id: 'details.priorAuthorizationDiagnosisCode',
                  title: 'Prior Authorization Diagnosis Codes',
                  type: 'basic',
                  link: `${routeString}/prior-authorization-diagnosis-codes`,

                },
{
                  id: 'details.priorAuthorizationEquipment',
                  title: 'Prior Authorization Equipments',
                  type: 'basic',
                  link: `${routeString}/prior-authorization-equipments`,

                },
{
                  id: 'details.priorAuthorizationImplant',
                  title: 'Prior Authorization Implants',
                  type: 'basic',
                  link: `${routeString}/prior-authorization-implants`,

                },
{
                  id: 'details.priorAuthorizationProcedureCode',
                  title: 'Prior Authorization Procedure Codes',
                  type: 'basic',
                  link: `${routeString}/prior-authorization-procedure-codes`,

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
      this.store.deletePriorAuthorizationRequestEffect(item)
    }
  }
}


