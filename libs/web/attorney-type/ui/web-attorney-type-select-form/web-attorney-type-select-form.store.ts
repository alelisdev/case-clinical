
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAttorneyTypeInput,
  UserUpdateAttorneyTypeInput,
  AttorneyType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AttorneyTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  attorneyTypes: AttorneyType[]
}

@Injectable()
export class WebAttorneyTypeSelectFormStore extends ComponentStore<AttorneyTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      attorneyTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly attorneyTypes$ = this.select((s) => s.attorneyTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.attorneyTypes$,
    (errors, loading, attorneyTypes) => ({
      errors,
      loading,
      attorneyTypes
    }),
    { debounce: true },
  )

  addNewAttorneyType = this.updater((state, attorneyType: AttorneyType) => ({ attorneyTypes: [...state.attorneyTypes, attorneyType] }))

  updateAttorneyType = this.updater((state, attorneyType: AttorneyType) => {
    return {
      ...state,
      attorneyTypes: state.attorneyTypes.map((el) => {
        if (el.id === attorneyType.id) {
          return attorneyType
        } else {
          return el
        }
      }),
    }
  })

  readonly createAttorneyTypeEffect = this.effect<{ input: UserCreateAttorneyTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAttorneyType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAttorneyType(res.data.created)
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

  readonly updateAttorneyTypeEffect = this.effect<{ input: UserUpdateAttorneyTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAttorneyType({ attorneyTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAttorneyType(res.data.updated)
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

  loadAttorneyTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAttorneyTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                attorneyTypes: data.data.items,
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

