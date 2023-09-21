
import { WebDocumentDetailStore } from './web-document-detail.store'
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
import { Document } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: `./web-document-detail.component.html`,
  providers: [WebDocumentDetailStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebDocumentDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: Document
  readonly vm$ = this.store.vm$

  constructor(
    private readonly store: WebDocumentDetailStore,
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
              title: 'Document Details',
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
                  id: 'details.firm',
                  title: 'Firms',
                  type: 'basic',
                  link: `${routeString}/firms`,

                },
{
                  id: 'details.priorAuthorizationRequest',
                  title: 'Prior Authorization Requests',
                  type: 'basic',
                  link: `${routeString}/prior-authorization-requests`,

                },
{
                  id: 'details.priorAuthorizationRequest',
                  title: 'Prior Authorization Requests',
                  type: 'basic',
                  link: `${routeString}/prior-authorization-requests`,

                },
{
                  id: 'details.priorAuthorizationRequest',
                  title: 'Prior Authorization Requests',
                  type: 'basic',
                  link: `${routeString}/prior-authorization-requests`,

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
      this.store.deleteDocumentEffect(item)
    }
  }
}


