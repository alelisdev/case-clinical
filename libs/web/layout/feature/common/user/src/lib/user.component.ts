import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { BooleanInput } from '@angular/cdk/coercion'
import { Subject } from 'rxjs'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    providers: [WebAuthStore],
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true
    readonly vm$ = this._userService.vm$
    
    private _unsubscribeAll: Subject<any> = new Subject<any>()

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: WebAuthStore,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user change
        // this.vm$.pipe(takeUntil(this._unsubscribeAll)), map((userState: any) => {
        //     this.user = userState.user
        //     console.log('hit the init')
        //     this._changeDetectorRef.markForCheck()
        // })
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
     * Update the user status
     *
     * @param status
     */
    async updateUserStatus(status: string): Promise<void> {
        await this._userService.update(status)
        this._changeDetectorRef.markForCheck()
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out'])
    }
}
