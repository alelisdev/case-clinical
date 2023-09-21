
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorAuthorizationEquipmentInput,
  UserUpdatePriorAuthorizationEquipmentInput,
  PriorAuthorizationEquipment,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationEquipmentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorAuthorizationEquipments: PriorAuthorizationEquipment[]
}

@Injectable()
export class WebPriorAuthorizationEquipmentSelectFormStore extends ComponentStore<PriorAuthorizationEquipmentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorAuthorizationEquipments: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorAuthorizationEquipments$ = this.select((s) => s.priorAuthorizationEquipments)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorAuthorizationEquipments$,
    (errors, loading, priorAuthorizationEquipments) => ({
      errors,
      loading,
      priorAuthorizationEquipments
    }),
    { debounce: true },
  )

  addNewPriorAuthorizationEquipment = this.updater((state, priorAuthorizationEquipment: PriorAuthorizationEquipment) => ({ priorAuthorizationEquipments: [...state.priorAuthorizationEquipments, priorAuthorizationEquipment] }))

  updatePriorAuthorizationEquipment = this.updater((state, priorAuthorizationEquipment: PriorAuthorizationEquipment) => {
    return {
      ...state,
      priorAuthorizationEquipments: state.priorAuthorizationEquipments.map((el) => {
        if (el.id === priorAuthorizationEquipment.id) {
          return priorAuthorizationEquipment
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorAuthorizationEquipmentEffect = this.effect<{ input: UserCreatePriorAuthorizationEquipmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorAuthorizationEquipment({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorAuthorizationEquipment(res.data.created)
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

  readonly updatePriorAuthorizationEquipmentEffect = this.effect<{ input: UserUpdatePriorAuthorizationEquipmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorAuthorizationEquipment({ priorAuthorizationEquipmentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorAuthorizationEquipment(res.data.updated)
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

  loadPriorAuthorizationequipmentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorAuthorizationequipments({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorAuthorizationEquipments: data.data.items,
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

