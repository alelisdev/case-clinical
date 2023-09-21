
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateFirmInput,
  UserUpdateFirmInput,
  Firm,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface FirmFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  firms: Firm[]
}

@Injectable()
export class WebFirmSelectFormStore extends ComponentStore<FirmFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      firms: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly firms$ = this.select((s) => s.firms)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.firms$,
    (errors, loading, firms) => ({
      errors,
      loading,
      firms
    }),
    { debounce: true },
  )

  addNewFirm = this.updater((state, firm: Firm) => ({ firms: [...state.firms, firm] }))

  updateFirm = this.updater((state, firm: Firm) => {
    return {
      ...state,
      firms: state.firms.map((el) => {
        if (el.id === firm.id) {
          return firm
        } else {
          return el
        }
      }),
    }
  })

  readonly createFirmEffect = this.effect<{ input: UserCreateFirmInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateFirm({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewFirm(res.data.created)
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

  readonly updateFirmEffect = this.effect<{ input: UserUpdateFirmInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateFirm({ firmId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateFirm(res.data.updated)
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

  loadFirmsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userFirms({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                firms: data.data.items,
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

