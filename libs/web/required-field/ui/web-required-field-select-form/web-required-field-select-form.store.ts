
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateRequiredFieldInput,
  UserUpdateRequiredFieldInput,
  RequiredField,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RequiredFieldFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  requiredFields: RequiredField[]
}

@Injectable()
export class WebRequiredFieldSelectFormStore extends ComponentStore<RequiredFieldFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      requiredFields: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly requiredFields$ = this.select((s) => s.requiredFields)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.requiredFields$,
    (errors, loading, requiredFields) => ({
      errors,
      loading,
      requiredFields
    }),
    { debounce: true },
  )

  addNewRequiredField = this.updater((state, requiredField: RequiredField) => ({ requiredFields: [...state.requiredFields, requiredField] }))

  updateRequiredField = this.updater((state, requiredField: RequiredField) => {
    return {
      ...state,
      requiredFields: state.requiredFields.map((el) => {
        if (el.id === requiredField.id) {
          return requiredField
        } else {
          return el
        }
      }),
    }
  })

  readonly createRequiredFieldEffect = this.effect<{ input: UserCreateRequiredFieldInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateRequiredField({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewRequiredField(res.data.created)
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

  readonly updateRequiredFieldEffect = this.effect<{ input: UserUpdateRequiredFieldInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateRequiredField({ requiredFieldId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateRequiredField(res.data.updated)
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

  loadRequiredFieldsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userRequiredFields({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                requiredFields: data.data.items,
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

