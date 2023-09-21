
import { WebLegalCaseDetailStore } from './web-legal-case-detail.store'
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
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router'
import { MatDrawer } from '@angular/material/sidenav'
import { map, Subject, takeUntil, tap } from 'rxjs'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { LegalCase } from '@case-clinical/web/core/data-access'
import { Ng7DynamicBreadcrumbService } from '@case-clinical/web/ui/breadcrumbs'

@Component({
  templateUrl: `./web-legal-case-detail.component.html`,
  providers: [WebLegalCaseDetailStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebLegalCaseDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: LegalCase
  readonly vm$ = this.store.vm$

  legalCaseId: string;
  legalCaseName: string;

  constructor(
    private readonly store: WebLegalCaseDetailStore,
    private readonly route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private readonly breadcrumbService: Ng7DynamicBreadcrumbService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {

    // Get Legal Case Id
    this.legalCaseId = this.route.snapshot.paramMap.get('legalCaseId');

    // Get Legal Case Name From Resolver
    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      this.legalCaseName = data.legalCaseName;
    });

    // Update Breadcrumbs for current url
    this.updateBreadCrumbs(this.router.url);

    // Detect Router Change and Update Breadcrumbs accordingly
    this.router.events.pipe(takeUntil(this._unsubscribeAll)).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.updateBreadCrumbs(event.url);
      }
    });
  }

  updateBreadCrumbs(url: string) {
    const urlSplits = url?.split('/');
    const indexOfDetails = urlSplits.indexOf('details');
    const relativeUrl = urlSplits?.length > 0 ? urlSplits[indexOfDetails + 1] : undefined;

    let breadcrumbs: any[] = [
      {
        name: 'Legal Cases',
        path: '/queues/legal-cases',
      },
      {
        name: this.legalCaseName,
        path: `/queues/legal-cases/${this.legalCaseId}/details/overview`,
      },
    ];

    switch (relativeUrl) {
      case 'overview':
        break;
      case 'appointments':
        breadcrumbs.push(
          {
            name: 'Appointments',
            path: `queues/legal-cases/${this.legalCaseId}/details/appointments`
          }
        )
        break;
      case 'case-accounts':
        breadcrumbs.push(
          {
            name: 'Case Accounts',
            path: `queues/legal-cases/${this.legalCaseId}/details/case-accounts`
          }
        )
        break;
      case 'case-procedures':
        breadcrumbs.push(
          {
            name: 'Case Procedures',
            path: `queues/legal-cases/${this.legalCaseId}/details/case-procedures`
          }
        )
        break;
      case 'insurances':
        breadcrumbs.push(
          {
            name: 'Insurances',
            path: `queues/legal-cases/${this.legalCaseId}/details/insurances`
          }
        )
        break;
      case 'invoices':
        breadcrumbs.push(
          {
            name: 'Invoices',
            path: `queues/legal-cases/${this.legalCaseId}/details/invoices`
          }
        )
        break;
      case 'prior-meds-to-dates':
        breadcrumbs.push(
          {
            name: 'Prior Meds To Dates',
            path: 'queues/legal-cases/:id/details/prior-meds-to-dates'
          }
        )
        break;
      case 'negotiations':
        breadcrumbs.push(
          {
            name: 'Negotiations',
            path: 'queues/legal-cases/:id/details/negotiations'
          }
        )
      case 'mailbox':
          breadcrumbs.push(
            {
              name: 'Mailbox',
              path: 'queues/legal-cases/:id/details/mailbox'
            }
          )
        break;
      default:
        break;
    }
    this.breadcrumbService.updateBreadcrumb(breadcrumbs);
  }

  ngAfterViewInit(): void {


    var routeString: string = this.route.snapshot.pathFromRoot.map((r) => r.url).join('/').replace('//', '/')

    this.vm$
      .pipe(
        tap((s) => {
          if(s?.item?.id != undefined) {
          this.menuData = [
            {
              id: 'Details',
              title: 'Legal Case Details',
              type: 'group',
              children: [

                {
                  id: 'details.overview',
                  title: 'Overview',
                  type: 'basic',
                  link: `${routeString}/overview`,
                },
{
                  id: 'details.appointment',
                  title: 'Appointments',
                  type: 'basic',
                  link: `${routeString}/appointments`,

                },
{
                  id: 'details.caseAccount',
                  title: 'Case Accounts',
                  type: 'basic',
                  link: `${routeString}/case-accounts`,

                },
// {
//                   id: 'details.casePreAccident',
//                   title: 'Case Pre Accidents',
//                   type: 'basic',
//                   link: `${routeString}/case-pre-accidents`,

//                 },
// {
//                   id: 'details.casePreInjury',
//                   title: 'Case Pre Injuries',
//                   type: 'basic',
//                   link: `${routeString}/case-pre-injuries`,

//                 },
// {
//                   id: 'details.casePreProblem',
//                   title: 'Case Pre Problems',
//                   type: 'basic',
//                   link: `${routeString}/case-pre-problems`,

//                 },
// {
//                   id: 'details.casePreProcedure',
//                   title: 'Case Pre Procedures',
//                   type: 'basic',
//                   link: `${routeString}/case-pre-procedures`,

//                 },
{
                  id: 'details.caseProcedure',
                  title: 'Case Procedures',
                  type: 'basic',
                  link: `${routeString}/case-procedures`,

                },
{
                  id: 'details.insurance',
                  title: 'Insurances',
                  type: 'basic',
                  link: `${routeString}/insurances`,

                },
                {
                  id: 'details.invoice',
                  title: 'Invoices',
                  type: 'basic',
                  link: `${routeString}/invoices`,

                },
{
                  id: 'details.priorMedsToDate',
                  title: 'Prior Meds to Dates',
                  type: 'basic',
                  link: `${routeString}/prior-meds-to-dates`,

                },
{
                  id: 'details.Negotiations',
                  title: 'Negotiations',
                  type: 'basic',
                  link: `${routeString}/negotiations`,

                },
                {
                  id: 'details.Mailbox',
                  title: 'Mailbox',
                  type: 'basic',
                  link: `${routeString}/mailbox`,

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
      this.store.deleteLegalCaseEffect(item)
    }
  }
}


