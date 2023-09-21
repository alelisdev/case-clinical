/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy } from '@angular/core'
import { UiFormBaseField } from '../../types/base-field-type';
import { WebAuthStore } from '@case-clinical/web/auth/data-access';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { DataContextService } from '../../context-provider/data-context.service';
import { FormService } from '../../form.service';
import { TailwindService } from '@case-clinical/web/ui/formly-designer';
import { Subject } from 'rxjs';
import { BooleanInput } from '@angular/cdk/coercion';
import { Router } from '@angular/router'

@Component({
  styleUrls: ['./ui-form-navbar.component.scss'],
  templateUrl: './ui-form-navbar.component.html',
  selector: 'ui-form-navbar',
  providers: [WebAuthStore],
})
export class UiFormNavbarComponent extends UiFormBaseField implements OnDestroy  {

  showMenuDrawer = false;
  subscriber: any
  subscriberId: string|undefined = undefined;
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_showAvatar: BooleanInput
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() showAvatar: boolean = true
  readonly vm$ = this._userService.vm$

  private _unsubscribeAll: Subject<any> = new Subject<any>()

  applicationIdentifier = "crx-hr5hbpp1";

  sessionLoaded = (data: unknown) => {
    console.log('loaded', { data });
  };

  constructor(
    private authStore: WebAuthStore,
    private _userService: WebAuthStore,
    public apiService: WebCoreDataAccessService,
    public cd: ChangeDetectorRef,
    public service: DataContextService,
    public formService: FormService,
    public tailwindService: TailwindService,
    private _router: Router,
    public elementRef: ElementRef
  ) {
    super(apiService, cd, service, formService, tailwindService, cd, elementRef);
    this.subscriber = authStore.user$.subscribe((user) => {
      console.log(user);
      if(user?.id) this.subscriberId = user.id;
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriber?.unsubscribe();
  }

  /**
     * Sign out
     */
  signOut(): void {
    this._router.navigate(['/sign-out'])
  }

  /**
     * Sign out
     */
  viewProfile(): void {
    this._router.navigate(['/profile'])
  }
}
