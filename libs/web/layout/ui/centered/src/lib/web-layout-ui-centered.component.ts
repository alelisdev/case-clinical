import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation'
import { Navigation } from '@case-clinical/web/core/data-access'
import { FuseNavigationListStore } from '@case-clinical/core/navigation';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Component({
    selector: 'centered-layout',
    templateUrl: './web-layout-ui-centered.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CenteredLayoutComponent implements OnInit, OnDestroy {
    navigation!: Navigation
    isScreenSmall = false
    private _unsubscribeAll: Subject<any> = new Subject<any>()

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private store: FuseNavigationListStore ,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      this.store.vm$.pipe((takeUntil(this._unsubscribeAll)))
      .subscribe((s: any) => {
          if(s && s.data ){
              const nav = <Navigation>{
                   compact: s.menuItems,
                   default: s.menuItems,
                   futuristic: s.menuItems,
                   horizontal: s.menuItems,
               }
               console.log('new Nav', nav)
             this.navigation = nav
          }
          else
          {
              const navigation: FuseNavigationItem[] = [{
                  id      : 'dashboards',
                  title   : 'Dashboards',
                  subtitle: 'Quick Access to Core Features',
                  type    : 'group',
                  icon    : 'heroicons_outline:home',
                  children: [
                      {
                          id   : 'dashboards.underwriting',
                          title: '',
                          type : 'basic',
                          icon : 'heroicons_outline:clipboard-check',
                          link : '/dashboards/underwriting'
                      },
                  ]
              }];

              this.navigation = <Navigation>{
                  compact: navigation,
                  default: navigation,
                  futuristic: navigation,
                  horizontal: navigation,
              }
              console.log('Setting the navigation', this.navigation)
          }
      })

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md')
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name)

        if (navigation) {
            // Toggle the opened status
            navigation.toggle()
        }
    }
}
