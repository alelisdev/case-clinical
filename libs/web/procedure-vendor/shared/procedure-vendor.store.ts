
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureVendorService } from './procedure-vendor.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureVendorInput, UserUpdateProcedureVendorInput, WebCoreDataAccessService, CorePaging, ProcedureVendor, CaseProcedure,Contract,Vendor,ProcedureVendorStatus } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureVendorFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureVendor
  done: boolean,
  formName?: string
procedureId?: string,contractId?: string,vendorId?: string,statusId?: string,
  procedureVendors: ProcedureVendor[]
 caseProcedures?: CaseProcedure[],
 contracts?: Contract[],
 vendors?: Vendor[],
 procedureVendorStatuses?: ProcedureVendorStatus[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureVendorFeatureStore extends ComponentStore<ProcedureVendorFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureVendorService: ProcedureVendorService
) {
    super({
      loading: false,
      procedureVendors: [],
      done: false,
      searchQuery: '',
      formName: undefined,
procedureId: undefined,
contractId: undefined,
vendorId: undefined,
statusId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureVendorId')) {
      var procedureVendorId = this.route.snapshot.paramMap.get('procedureVendorId')
      this.setFormName('procedureVendor_edit')
    } else {
      this.setFormName('procedureVendor_create')
    }


    if(this.route.snapshot.paramMap.has("caseProcedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("caseProcedureId")
      this.setProcedureId(procedureId)
    }


    if(this.route.snapshot.paramMap.has("contractId")) {
      var contractId = this.route.snapshot.paramMap.get("contractId")
      this.setContractId(contractId)
    }


    if(this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }


    if(this.route.snapshot.paramMap.has("statusId")) {
      var statusId = this.route.snapshot.paramMap.get("statusId")
      this.setStatusId(statusId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureVendors$ = this.select((s) => s.procedureVendors)
  readonly caseProcedures$ = this.select((s) => s.caseProcedures || [])
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly procedureVendorStatuses$ = this.select((s) => s.procedureVendorStatuses || [])

readonly procedureId$ = this.select((s) => s.procedureId)

readonly contractId$ = this.select((s) => s.contractId)

readonly vendorId$ = this.select((s) => s.vendorId)

readonly statusId$ = this.select((s) => s.statusId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureVendors$,
this.caseProcedures$,this.contracts$,this.vendors$,this.procedureVendorStatuses$,
    (errors, loading, item, formName, procedureVendors, caseProcedures,contracts,vendors,procedureVendorStatuses ) => ({
    errors,
    loading,
    item,
    formName,
    procedureVendors,

            caseProcedures,contracts,vendors,procedureVendorStatuses
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.procedureId$,
this.contractId$,
this.vendorId$,
this.statusId$, this.searchQuery$, (paging, procedureId,
contractId,
vendorId,
statusId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    procedureId: procedureId,contractId: contractId,vendorId: vendorId,statusId: statusId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setProcedureId = this.updater((state, procedureId: string) => ({
                ...state,
    procedureId,
  }))


            readonly setContractId = this.updater((state, contractId: string) => ({
                ...state,
    contractId,
  }))


            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))


            readonly setStatusId = this.updater((state, statusId: string) => ({
                ...state,
    statusId,
  }))



  readonly filterCaseProcedures = (term) =>
        this.data.userSelectCaseProcedures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseProcedures = res.data.items;
              this.patchState({caseProcedures})
              return caseProcedures
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


  readonly filterContracts = (term) =>
        this.data.userSelectContracts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contracts = res.data.items;
              this.patchState({contracts})
              return contracts
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


  readonly filterProcedureVendorStatuses = (term) =>
        this.data.userSelectProcedureVendorStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureVendorStatuses = res.data.items;
              this.patchState({procedureVendorStatuses})
              return procedureVendorStatuses
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



  readonly addCaseProcedure = this.updater((state, caseProcedure: CaseProcedure) => ({
    ...state, caseProcedures: state.caseProcedures.concat(caseProcedure)
  }))


  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))


  readonly addProcedureVendorStatus = this.updater((state, procedureVendorStatus: ProcedureVendorStatus) => ({
    ...state, procedureVendorStatuses: state.procedureVendorStatuses.concat(procedureVendorStatus)
  }))



  readonly setItem = this.updater((state, item: ProcedureVendor) => ({...state, item}))

  addNewProcedureVendor = this.updater((state, procedureVendor: ProcedureVendor) => ({ ...state, procedureVendors: [...state.procedureVendors, procedureVendor] }))

  updateProcedureVendor = this.updater((state, procedureVendor: ProcedureVendor) => {
    return {
      ...state,
      procedureVendors: state.procedureVendors.map((el) => {
        if (el.id === procedureVendor.id) {
          return procedureVendor
        } else {
          return el
        }
      }),
    }
  })

  addProcedureVendors = this.updater((state, newProcedureVendors: any[]) => ({...state, procedureVendors: state.procedureVendors.concat(newProcedureVendors) }))
  updateProcedureVendors = this.updater((state, updatedProcedureVendors: any[]) => {
    return {
      ...state,
      procedureVendors: state.procedureVendors.map((procedureVendor) => {
        const updated = updatedProcedureVendors.find((el) => el.id === procedureVendor.id);
        return updated ? updated : procedureVendor;
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
        return this.procedureVendorService.validateProcedureVendorExcelData(excelData, vm.caseProcedures,vm.contracts,vm.vendors,vm.procedureVendorStatuses);
      })
    )
  }


  readonly loadProcedureVendorEffect = this.effect<string>((procedureVendorId$) =>
    procedureVendorId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureVendorId) =>
        this.data.userProcedureVendor({ procedureVendorId }).pipe(
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



  readonly loadProcedureVendorsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureVendors({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureVendors: res.data.items,
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

  readonly createProcedureVendorEffect = this.effect<UserCreateProcedureVendorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureVendorService.createProcedureVendor({...input }).pipe(
          tapResponse(
            (procedureVendor: ProcedureVendor) => {
              this.addNewProcedureVendor(procedureVendor)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureVendor, loading: false, done: true }), 300);
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

    readonly updateProcedureVendorEffect = this.effect<UserUpdateProcedureVendorInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureVendorService.updateProcedureVendor(input, input.id).pipe(
              tapResponse(
                (procedureVendor) => {
                  this.updateProcedureVendor(procedureVendor)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureVendor, loading: false, done: true }), 300);
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

    readonly deleteProcedureVendorEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureVendor]) => {
          return this.data.userDeleteProcedureVendor({procedureVendorId: procedureVendor.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureVendorInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureVendorService.importProcedureVendors(data).pipe(
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

            this.addProcedureVendors(created);
            this.updateProcedureVendors(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
