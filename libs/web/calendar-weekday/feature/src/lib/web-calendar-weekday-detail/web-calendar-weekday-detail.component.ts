
import { WebCalendarWeekdayDetailStore } from './web-calendar-weekday-detail.store'
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
import { MatDrawer } from '@angular/material/sidenav'
import { map, Subject, takeUntil, tap } from 'rxjs'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { CalendarWeekday } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: `./web-calendar-weekday-detail.component.html`,
  providers: [WebCalendarWeekdayDetailStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebCalendarWeekdayDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: CalendarWeekday
  readonly vm$ = this.store.vm$

  constructor(
    private readonly store: WebCalendarWeekdayDetailStore,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {}
  ngAfterViewInit(): void {
    this.vm$
      .pipe(
        tap((s) => {
          this.menuData = [
            {
              id: 'Details',
              title: 'Calendar Weekday Details',
              type: 'group',
              children: [
                {
                  id: 'details.overview',
                  title: 'Overview',
                  type: 'basic',
                  link: `/queues/calendar-weekdays/${s?.item?.id}/details/overview`,
                },

              ],
            },
          ]
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
      this.store.deleteCalendarWeekdayEffect(item)
    }
  }
}


