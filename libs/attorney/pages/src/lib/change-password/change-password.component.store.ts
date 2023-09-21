import { AccountUpdatePasswordInput } from '@case-clinical/shared/util/sdk'
import { ActivatedRoute, Router } from '@angular/router'
import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { DatePipe } from '@angular/common'
import { FormService } from '@case-clinical/web/ui/form'
import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { Injectable, Injector } from '@angular/core'
import { switchMap, tap } from 'rxjs'
import { tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ChangePasswordState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class ChangePasswordStore extends AttorneyBaseStore<ChangePasswordState> {
  private subscriber: any
  constructor(
    private data: WebCoreDataAccessService,
    private datePipe: DatePipe,
    private formService: FormService,
    private loading: FuseLoadingService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private toast: WebUiToastService,
    injector: Injector,
  ) {
    super(injector)
  }

  loading$ = this.select((s) => s.loading)

  updatePasswordEffect = this.effect<any>((formData$) =>
    formData$.pipe(
      tap((formData) => {
        this.patchState({ loading: true })
      }),
      switchMap((formData) => {
        const sendData: AccountUpdatePasswordInput = {
          currentPassword: formData?.oldPassword,
          password: formData?.newPassword,
          verified: formData?.passConfirm,
        }
        console.log(formData)
        return this.data.accountUpdatePassword({ input: sendData }).pipe(
          tapResponse(
            (data) => {
              this.toast.success('Successfully updated Password', { duration: 3000 })
              this.patchState({
                loading: false,
              })
            },
            (error) => {
              this.toast.error('Failed to update Password', { duration: 3000 })
              this.patchState({
                loading: false,
              })
            },
          ),
        )
      }),
    ),
  )

  vm$ = this.select(this.loading$, this.user$, (loading, user) => {
    return {
      loading,
      user,
    }
  })

  override getInitialState(): ChangePasswordState {
    return {
      query: '',
      loading: false,
    }
  }
}
