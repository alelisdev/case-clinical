
import { WebContactDetailStore } from './web-contact-detail.store'
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
import { Contact } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: `./web-contact-detail.component.html`,
  providers: [WebContactDetailStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebContactDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: Contact
  readonly vm$ = this.store.vm$

  constructor(
    private readonly store: WebContactDetailStore,
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
              title: 'Contact Details',
              type: 'group',
              children: [

                {
                  id: 'details.overview',
                  title: 'Overview',
                  type: 'basic',
                  link: `${routeString}/overview`,
                },
{
                  id: 'details.contactEmail',
                  title: 'Contact Emails',
                  type: 'basic',
                  link: `${routeString}/contact-emails`,

                },
{
                  id: 'details.contactPhoneNumber',
                  title: 'Contact Phone Numbers',
                  type: 'basic',
                  link: `${routeString}/contact-phone-numbers`,

                },
{
                  id: 'details.contactSetting',
                  title: 'Contact Settings',
                  type: 'basic',
                  link: `${routeString}/contact-settings`,

                },
{
                  id: 'details.contactTag',
                  title: 'Contact Tags',
                  type: 'basic',
                  link: `${routeString}/contact-tags`,

                },
{
                  id: 'details.implant',
                  title: 'Implants',
                  type: 'basic',
                  link: `${routeString}/implants`,

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
      this.store.deleteContactEffect(item)
    }
  }
}


