
import { WebTemplateDetailStore } from './web-template-detail.store'
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
import { Template } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: `./web-template-detail.component.html`,
  providers: [WebTemplateDetailStore],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebTemplateDetailComponent implements AfterViewInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
  drawerMode: 'side' | 'over'
  drawerOpened: boolean
  menuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  private _item: Template
  readonly vm$ = this.store.vm$

  constructor(
    private readonly store: WebTemplateDetailStore,
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
              title: 'Template Details',
              type: 'group',
              children: [
                {
                  id: 'details.overview',
                  title: 'Overview',
                  type: 'basic',
                  link: `/queues/templates/${s?.item?.id}/details/overview`,
                },
{
                  id: 'details.assignedDocument',
                  title: 'Assigned Documents',
                  type: 'basic',
                  link: `/queues/templates/${s?.item?.id}/details/assigned-documents`,
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
      this.store.deleteTemplateEffect(item)
    }
  }
}


