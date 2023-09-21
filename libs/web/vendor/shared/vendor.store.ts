
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { VendorService } from './vendor.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateVendorInput, UserUpdateVendorInput, WebCoreDataAccessService, CorePaging, Vendor, VendorType } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface VendorFeatureState {
  errors?: any
  loading?: boolean
  item?: Vendor
  done: boolean,
  formName?: string
vendorTypeId?: string,
  vendors: Vendor[]
 vendorTypes?: VendorType[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebVendorFeatureStore extends ComponentStore<VendorFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly vendorService: VendorService
) {
    super({
      loading: false,
      vendors: [],
      done: false,
      searchQuery: '',
      formName: undefined,
vendorTypeId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('vendorId')) {
      var vendorId = this.route.snapshot.paramMap.get('vendorId')
      this.setFormName('vendor_edit')
    } else {
      this.setFormName('vendor_create')
    }


    if(this.route.snapshot.paramMap.has("vendorTypeId")) {
      var vendorTypeId = this.route.snapshot.paramMap.get("vendorTypeId")
      this.setVendorTypeId(vendorTypeId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly vendors$ = this.select((s) => s.vendors)
  readonly vendorTypes$ = this.select((s) => s.vendorTypes || [])

readonly vendorTypeId$ = this.select((s) => s.vendorTypeId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.vendors$,
this.vendorTypes$,
    (errors, loading, item, formName, vendors, vendorTypes ) => ({
    errors,
    loading,
    item,
    formName,
    vendors,

            vendorTypes
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.vendorTypeId$, this.searchQuery$, (paging, vendorTypeId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    vendorTypeId: vendorTypeId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setVendorTypeId = this.updater((state, vendorTypeId: string) => ({
                ...state,
    vendorTypeId,
  }))



  readonly filterVendorTypes = (term) =>
        this.data.userSelectVendorTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendorTypes = res.data.items;
              this.patchState({vendorTypes})
              return vendorTypes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addVendorType = this.updater((state, vendorType: VendorType) => ({
    ...state, vendorTypes: state.vendorTypes.concat(vendorType)
  }))



  readonly setItem = this.updater((state, item: Vendor) => ({...state, item}))

  addNewVendor = this.updater((state, vendor: Vendor) => ({ ...state, vendors: [...state.vendors, vendor] }))

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

  addVendors = this.updater((state, newVendors: any[]) => ({...state, vendors: state.vendors.concat(newVendors) }))
  updateVendors = this.updater((state, updatedVendors: any[]) => {
    return {
      ...state,
      vendors: state.vendors.map((vendor) => {
        const updated = updatedVendors.find((el) => el.id === vendor.id);
        return updated ? updated : vendor;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.vendorService.validateVendorExcelData(excelData, vm.vendorTypes);
      })
    )
  }


  readonly loadVendorEffect = this.effect<string>((vendorId$) =>
    vendorId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((vendorId) =>
        this.data.userVendor({ vendorId }).pipe(
          tapResponse(
            (res) => {
              console.log(res.data.item)
                    this.patchState({
                    item: res.data.item,
                    errors: res.errors,
                    loading: false
                })
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



  readonly loadVendorsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userVendors({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                vendors: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

  readonly createVendorEffect = this.effect<UserCreateVendorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.vendorService.createVendor({...input }).pipe(
          tapResponse(
            (vendor: Vendor) => {
              this.addNewVendor(vendor)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: vendor, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updateVendorEffect = this.effect<UserUpdateVendorInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.vendorService.updateVendor(input, input.id).pipe(
              tapResponse(
                (vendor) => {
                  this.updateVendor(vendor)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: vendor, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )

    readonly deleteVendorEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, vendor]) => {
          return this.data.userDeleteVendor({vendorId: vendor.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateVendorInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.vendorService.importVendors(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addVendors(created);
            this.updateVendors(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
