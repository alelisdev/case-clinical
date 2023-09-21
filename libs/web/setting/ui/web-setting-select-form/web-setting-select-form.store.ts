
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateSettingInput,
  UserUpdateSettingInput,
  Setting,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface SettingFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  settings: Setting[]
}

@Injectable()
export class WebSettingSelectFormStore extends ComponentStore<SettingFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      settings: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly settings$ = this.select((s) => s.settings)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.settings$,
    (errors, loading, settings) => ({
      errors,
      loading,
      settings
    }),
    { debounce: true },
  )

  addNewSetting = this.updater((state, setting: Setting) => ({ settings: [...state.settings, setting] }))

  updateSetting = this.updater((state, setting: Setting) => {
    return {
      ...state,
      settings: state.settings.map((el) => {
        if (el.id === setting.id) {
          return setting
        } else {
          return el
        }
      }),
    }
  })

  readonly createSettingEffect = this.effect<{ input: UserCreateSettingInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateSetting({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewSetting(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
              },
              (errors: any) =>
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                }),
            ),
          ),
        ),
      ),
  )

  readonly updateSettingEffect = this.effect<{ input: UserUpdateSettingInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateSetting({ settingId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateSetting(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
              },
              (errors: any) =>
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                }),
            ),
          ),
        ),
      ),
  )

  loadSettingsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userSettings({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                settings: data.data.items,
              })
            },
            (error) => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )
}

