
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAgreementTypeInput,
  UserUpdateAgreementTypeInput,
  AgreementType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AgreementTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  agreementTypes: AgreementType[]
}

@Injectable()
export class WebAgreementTypeSelectFormStore extends ComponentStore<AgreementTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      agreementTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly agreementTypes$ = this.select((s) => s.agreementTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.agreementTypes$,
    (errors, loading, agreementTypes) => ({
      errors,
      loading,
      agreementTypes
    }),
    { debounce: true },
  )

  addNewAgreementType = this.updater((state, agreementType: AgreementType) => ({ agreementTypes: [...state.agreementTypes, agreementType] }))

  updateAgreementType = this.updater((state, agreementType: AgreementType) => {
    return {
      ...state,
      agreementTypes: state.agreementTypes.map((el) => {
        if (el.id === agreementType.id) {
          return agreementType
        } else {
          return el
        }
      }),
    }
  })

  readonly createAgreementTypeEffect = this.effect<{ input: UserCreateAgreementTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAgreementType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAgreementType(res.data.created)
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

  readonly updateAgreementTypeEffect = this.effect<{ input: UserUpdateAgreementTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAgreementType({ agreementTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAgreementType(res.data.updated)
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

  loadAgreementTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAgreementTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                agreementTypes: data.data.items,
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

