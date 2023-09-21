import { tapResponse } from '@ngrx/component-store'
import { Injectable, Injector } from '@angular/core'
import { switchMap, tap } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AccountUpdatePasswordInput } from '@case-clinical/shared/util/sdk'
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
export interface State extends ProviderBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class ChangePasswordStore extends ProviderBaseStore<State> {
  locationAvalabilityId = ''
  constructor(
    private toast: WebUiToastService,
    private data: WebCoreDataAccessService,
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
        const passwordForm: AccountUpdatePasswordInput = {
          currentPassword: formData?.oldPassword,
          password: formData?.newPassword,
          verified: formData?.passConfirm,
        }
        return this.data.accountUpdatePassword({ input: passwordForm }).pipe(
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

  vm$ = this.select(this.loading$, this.user$, this.vendor$, (loading, user, vendor) => {
    return {
      loading,
      user,
      vendor,
    }
  })

  override getInitialState(): State {
    return {
      query: '',
      loading: false,
    }
  }
}
