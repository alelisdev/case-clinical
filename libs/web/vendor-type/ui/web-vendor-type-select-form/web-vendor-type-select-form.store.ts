
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateVendorTypeInput,
  UserUpdateVendorTypeInput,
  VendorType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface VendorTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  vendorTypes: VendorType[]
}

@Injectable()
export class WebVendorTypeSelectFormStore extends ComponentStore<VendorTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      vendorTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly vendorTypes$ = this.select((s) => s.vendorTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.vendorTypes$,
    (errors, loading, vendorTypes) => ({
      errors,
      loading,
      vendorTypes
    }),
    { debounce: true },
  )

  addNewVendorType = this.updater((state, vendorType: VendorType) => ({ vendorTypes: [...state.vendorTypes, vendorType] }))

  updateVendorType = this.updater((state, vendorType: VendorType) => {
    return {
      ...state,
      vendorTypes: state.vendorTypes.map((el) => {
        if (el.id === vendorType.id) {
          return vendorType
        } else {
          return el
        }
      }),
    }
  })

  readonly createVendorTypeEffect = this.effect<{ input: UserCreateVendorTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateVendorType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewVendorType(res.data.created)
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

  readonly updateVendorTypeEffect = this.effect<{ input: UserUpdateVendorTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateVendorType({ vendorTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateVendorType(res.data.updated)
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

  loadVendorTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userVendorTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                vendorTypes: data.data.items,
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

