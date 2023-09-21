
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { DurableMedicalEquipmentService } from './durable-medical-equipment.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateDurableMedicalEquipmentInput, UserUpdateDurableMedicalEquipmentInput, WebCoreDataAccessService, CorePaging, DurableMedicalEquipment, Vendor } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface DurableMedicalEquipmentFeatureState {
  errors?: any
  loading?: boolean
  item?: DurableMedicalEquipment
  done: boolean,
  formName?: string
vendorId?: string,
  durableMedicalEquipments: DurableMedicalEquipment[]
 vendors?: Vendor[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebDurableMedicalEquipmentFeatureStore extends ComponentStore<DurableMedicalEquipmentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly durableMedicalEquipmentService: DurableMedicalEquipmentService
) {
    super({ 
      loading: false,
      durableMedicalEquipments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
vendorId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('durableMedicalEquipmentId')) {
      var durableMedicalEquipmentId = this.route.snapshot.paramMap.get('durableMedicalEquipmentId')
      this.setFormName('durableMedicalEquipment_edit')
    } else {
      this.setFormName('durableMedicalEquipment_create')
    }


    if(this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly durableMedicalEquipments$ = this.select((s) => s.durableMedicalEquipments)
  readonly vendors$ = this.select((s) => s.vendors || [])

readonly vendorId$ = this.select((s) => s.vendorId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.durableMedicalEquipments$,
this.vendors$,
    (errors, loading, item, formName, durableMedicalEquipments, vendors ) => ({
    errors,
    loading,
    item,
    formName,
    durableMedicalEquipments,

            vendors
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.vendorId$, this.searchQuery$, (paging, vendorId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    vendorId: vendorId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))



  readonly filterVendors = (term) => 
        this.data.userSelectVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendors = res.data.items;
              this.patchState({vendors})
              return vendors
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



  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))

    

  readonly setItem = this.updater((state, item: DurableMedicalEquipment) => ({...state, item}))

  addNewDurableMedicalEquipment = this.updater((state, durableMedicalEquipment: DurableMedicalEquipment) => ({ ...state, durableMedicalEquipments: [...state.durableMedicalEquipments, durableMedicalEquipment] }))

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

  addDurableMedicalEquipments = this.updater((state, newDurableMedicalEquipments: any[]) => ({...state, durableMedicalEquipments: state.durableMedicalEquipments.concat(newDurableMedicalEquipments) }))
  updateDurableMedicalEquipments = this.updater((state, updatedDurableMedicalEquipments: any[]) => {
    return {
      ...state,
      durableMedicalEquipments: state.durableMedicalEquipments.map((durableMedicalEquipment) => {
        const updated = updatedDurableMedicalEquipments.find((el) => el.id === durableMedicalEquipment.id);
        return updated ? updated : durableMedicalEquipment;
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
        return this.durableMedicalEquipmentService.validateDurableMedicalEquipmentExcelData(excelData, vm.vendors);
      })
    )
  }


  readonly loadDurableMedicalEquipmentEffect = this.effect<string>((durableMedicalEquipmentId$) =>
    durableMedicalEquipmentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((durableMedicalEquipmentId) =>
        this.data.userDurableMedicalEquipment({ durableMedicalEquipmentId }).pipe(
          tapResponse(
            (res) => {
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



  readonly loadDurableMedicalEquipmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userDurableMedicalEquipments({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                durableMedicalEquipments: res.data.items,
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

  readonly createDurableMedicalEquipmentEffect = this.effect<UserCreateDurableMedicalEquipmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.durableMedicalEquipmentService.createDurableMedicalEquipment({...input }).pipe(
          tapResponse(
            (durableMedicalEquipment: DurableMedicalEquipment) => {
              this.addNewDurableMedicalEquipment(durableMedicalEquipment)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: durableMedicalEquipment, loading: false, done: true }), 300);
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

    readonly updateDurableMedicalEquipmentEffect = this.effect<UserUpdateDurableMedicalEquipmentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.durableMedicalEquipmentService.updateDurableMedicalEquipment(input, input.id).pipe(
              tapResponse(
                (durableMedicalEquipment) => {
                  this.updateDurableMedicalEquipment(durableMedicalEquipment)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: durableMedicalEquipment, loading: false, done: true }), 300);
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
  
    readonly deleteDurableMedicalEquipmentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, durableMedicalEquipment]) => {
          return this.data.userDeleteDurableMedicalEquipment({durableMedicalEquipmentId: durableMedicalEquipment.id})
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

  readonly importExcelEffect = this.effect<UserUpdateDurableMedicalEquipmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.durableMedicalEquipmentService.importDurableMedicalEquipments(data).pipe(
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

            this.addDurableMedicalEquipments(created);
            this.updateDurableMedicalEquipments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
