
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateEquipmentInput,
  UserUpdateEquipmentInput,
  Equipment,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface EquipmentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  equipments: Equipment[]
}

@Injectable()
export class WebEquipmentSelectFormStore extends ComponentStore<EquipmentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      equipments: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly equipments$ = this.select((s) => s.equipments)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.equipments$,
    (errors, loading, equipments) => ({
      errors,
      loading,
      equipments
    }),
    { debounce: true },
  )

  addNewEquipment = this.updater((state, equipment: Equipment) => ({ equipments: [...state.equipments, equipment] }))

  updateEquipment = this.updater((state, equipment: Equipment) => {
    return {
      ...state,
      equipments: state.equipments.map((el) => {
        if (el.id === equipment.id) {
          return equipment
        } else {
          return el
        }
      }),
    }
  })

  readonly createEquipmentEffect = this.effect<{ input: UserCreateEquipmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateEquipment({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewEquipment(res.data.created)
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

  readonly updateEquipmentEffect = this.effect<{ input: UserUpdateEquipmentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateEquipment({ equipmentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateEquipment(res.data.updated)
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

  loadEquipmentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userEquipments({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                equipments: data.data.items,
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

