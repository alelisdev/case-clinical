
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateVendorInput,
  UserUpdateVendorInput,
  Vendor,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface VendorFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  vendors: Vendor[]
}

@Injectable()
export class WebVendorSelectFormStore extends ComponentStore<VendorFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      vendors: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly vendors$ = this.select((s) => s.vendors)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.vendors$,
    (errors, loading, vendors) => ({
      errors,
      loading,
      vendors
    }),
    { debounce: true },
  )

  addNewVendor = this.updater((state, vendor: Vendor) => ({ vendors: [...state.vendors, vendor] }))

  updateVendor = this.updater((state, vendor: Vendor) => {
    return {
      ...state,
      vendors: state.vendors.map((el) => {
        if (el.id === vendor.id) {
          return vendor
        } else {
          return el
        }
      }),
    }
  })

  readonly createVendorEffect = this.effect<{ input: UserCreateVendorInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateVendor({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewVendor(res.data.created)
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

  readonly updateVendorEffect = this.effect<{ input: UserUpdateVendorInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateVendor({ vendorId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateVendor(res.data.updated)
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

  loadVendorsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userVendors({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                vendors: data.data.items,
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

