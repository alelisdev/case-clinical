
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateDurableMedicalEquipmentInput,
  UserUpdateDurableMedicalEquipmentInput,
  DurableMedicalEquipment,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface DurableMedicalEquipmentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  durableMedicalEquipments: DurableMedicalEquipment[]
}

@Injectable()
export class WebDurableMedicalEquipmentSelectFormStore extends ComponentStore<DurableMedicalEquipmentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      durableMedicalEquipments: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly durableMedicalEquipments$ = this.select((s) => s.durableMedicalEquipments)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.durableMedicalEquipments$,
    (errors, loading, durableMedicalEquipments) => ({
      errors,
      loading,
      durableMedicalEquipments
    }),
    { debounce: true },
  )

  addNewDurableMedicalEquipment = this.updater((state, durableMedicalEquipment: DurableMedicalEquipment) => ({ durableMedicalEquipments: [...state.durableMedicalEquipments, durableMedicalEquipment] }))

  updateDurableMedicalEquipment = this.updater((state, durableMedicalEquipment: DurableMedicalEquipment) => {
    return {
      ...state,
      durableMedicalEquipments: state.durableMedicalEquipments.map((el) => {
        if (el.id === durableMedicalEquipment.id) {
          return durableMedicalEquipment
        } else {
          return el
        }
      }),
    }
  })

  readonly createDurableMedicalEquipmentEffect = this.effect<{ input: UserCreateDurableMedicalEquipmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateDurableMedicalEquipment({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewDurableMedicalEquipment(res.data.created)
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

  readonly updateDurableMedicalEquipmentEffect = this.effect<{ input: UserUpdateDurableMedicalEquipmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateDurableMedicalEquipment({ durableMedicalEquipmentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateDurableMedicalEquipment(res.data.updated)
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

  loadDurableMedicalequipmentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userDurableMedicalequipments({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                durableMedicalEquipments: data.data.items,
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

