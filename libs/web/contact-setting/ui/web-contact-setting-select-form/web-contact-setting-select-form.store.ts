
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContactSettingInput,
  UserUpdateContactSettingInput,
  ContactSetting,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactSettingFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contactSettings: ContactSetting[]
}

@Injectable()
export class WebContactSettingSelectFormStore extends ComponentStore<ContactSettingFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contactSettings: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contactSettings$ = this.select((s) => s.contactSettings)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contactSettings$,
    (errors, loading, contactSettings) => ({
      errors,
      loading,
      contactSettings
    }),
    { debounce: true },
  )

  addNewContactSetting = this.updater((state, contactSetting: ContactSetting) => ({ contactSettings: [...state.contactSettings, contactSetting] }))

  updateContactSetting = this.updater((state, contactSetting: ContactSetting) => {
    return {
      ...state,
      contactSettings: state.contactSettings.map((el) => {
        if (el.id === contactSetting.id) {
          return contactSetting
        } else {
          return el
        }
      }),
    }
  })

  readonly createContactSettingEffect = this.effect<{ input: UserCreateContactSettingInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContactSetting({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContactSetting(res.data.created)
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

  readonly updateContactSettingEffect = this.effect<{ input: UserUpdateContactSettingInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContactSetting({ contactSettingId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContactSetting(res.data.updated)
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

  loadContactSettingsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContactSettings({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contactSettings: data.data.items,
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

