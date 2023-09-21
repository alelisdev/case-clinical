import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EventEmitter, Injectable } from "@angular/core";
import { FormService } from '@case-clinical/web/ui/form';
import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { SettingsService } from '../business-logic/settings.service';
import { switchMap, tap } from 'rxjs';
import { User } from '@case-clinical/web/core/data-access';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface AccountState {
  loading: boolean,
  query: string,
  canGoNext: boolean,
  profile?: User
}

@Injectable()
export class AccountStore extends ComponentStore<AccountState> {
  constructor(private formService: FormService, private loading: FuseLoadingService, private toast: WebUiToastService, private service: SettingsService) {
    super({
      query: "",
      loading: false,
      canGoNext: false,
    })
  }

  profile$ = this.select(s => s.profile)
  loading$ = this.select(s => s.loading)
  canGoNext$ = this.select(s => s.canGoNext, { debounce: true })

  vm$ = this.select(
    this.loading$,
    this.canGoNext$,
    this.profile$,
    (
      loading,
      canGoNext,
      profile,
    ) => ({
      loading,
      canGoNext,
      profile
    })
  )

  loadAccountProfileEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(() => this.service.accountProfile().pipe(
      tapResponse(
        (data) => {
            this.patchState({
              loading: false,
              profile: data
            })
          },
          (error) => {
            this.patchState({
              loading: false
            })
          }
        )
      )
    )
  ))

  updateAccountEffect = this.effect<{ input: any, resultEmitter: EventEmitter<void> }>(data$ => data$.pipe(
    tap((data) => { this.patchState({ loading: true }) }),
    switchMap((data) => this.service.updateAccount(data.input).pipe(
      tapResponse(
        (result) => {
          this.toast.success('Successfully updated account', { duration: 3000 })
          data.resultEmitter.emit()
          this.patchState({
            loading: false,
            canGoNext: true,
          })
        },
        (error: any) => {
          if(error.graphQLErrors) {
            this.toast.error(error.message, { duration: 3000 })
          } else {
            this.toast.error(error.Message, { duration: 3000 })
            this.formService.setErrors(error.Data)
            this.patchState({
              loading: false
            })
          }
        }
      )
    )
    )
  ))
}
