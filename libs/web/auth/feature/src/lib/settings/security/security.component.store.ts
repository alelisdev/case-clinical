import { AccountUpdatePasswordInput } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { FormService } from '@case-clinical/web/ui/form'
import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { Injectable } from '@angular/core'
import { SettingsService } from '../business-logic/settings.service'
import { switchMap, tap, withLatestFrom } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'

export interface SecurityState {
  loading: boolean
  query: string
}

@Injectable()
export class SecurityStore extends ComponentStore<SecurityState> {
  constructor(
    private data: WebCoreDataAccessService,
    private formService: FormService,
    private loading: FuseLoadingService,
    private service: SettingsService,
    private toast: WebUiToastService,
  ) {
    super({
      query: '',
      loading: false,
    })
  }

  /********** Selectors Start ************/
  loading$ = this.select((s) => s.loading)
  vm$ = this.select(this.loading$, (loading) => ({
    loading,
  }))
  /********** Selectors End ************/

  /********** Updaters Start ************/
  updatePasswordEffect = this.effect<any>((formData$) =>
    formData$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap((formData) => {
        const sendData: AccountUpdatePasswordInput = {
          currentPassword: formData?.oldPassword,
          password: formData?.newPassword,
          verified: formData?.passConfirm,
        }
        console.log(sendData)
        return this.service.updatePassword(sendData).pipe(
          tapResponse(
            () => {
              this.toast.success('Successfully updated Password', { duration: 3000 })
              this.patchState({
                loading: false,
              })
            },
            () => {
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
  /********** Updaters End ************/
}
