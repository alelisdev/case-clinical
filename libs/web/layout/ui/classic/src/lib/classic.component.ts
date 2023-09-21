import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation, FuseNavigationListStore } from '@case-clinical/core/navigation';
import { User } from '@case-clinical/web/core/data-access';
import { WebAuthStore } from '@case-clinical/web/auth/data-access';

@Component({
    selector     : 'classic-layout',
    templateUrl  : './classic.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [FuseNavigationListStore]
})
export class ClassicLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean | undefined;
    navigation: Navigation  | undefined;
    user: User  | undefined;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    readonly vm$ = this.store.vm$

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private store: FuseNavigationListStore ,
        private _userService: WebAuthStore,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.store.loadNavigationsEffect()
        // Subscribe to navigation data
        this.store.vm$.pipe((takeUntil(this._unsubscribeAll)))
        .subscribe((s: any) => {
            if(s && s.data ){
                console.log('subscribe to navs', s)
                let nav = <Navigation>{
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
                let navigation: FuseNavigationItem[] = [{
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

        // Subscribe to the user service
        this._userService.user$
        .pipe((takeUntil(this._unsubscribeAll)))
        .subscribe((user: User) => {
            this.user = user;
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
