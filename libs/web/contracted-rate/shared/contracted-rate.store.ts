
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContractedRateService } from './contracted-rate.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContractedRateInput, UserUpdateContractedRateInput, WebCoreDataAccessService, CorePaging, ContractedRate, Contract,ContractedRateKind,ContractKind,VisitKind,ClinicalProvider,Specialty } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContractedRateFeatureState {
  errors?: any
  loading?: boolean
  item?: ContractedRate
  done: boolean,
  formName?: string
contractId?: string,contractedRateKindId?: string,contractKindId?: string,visitKindId?: string,clinicalProviderId?: string,specialtyId?: string,
  contractedRates: ContractedRate[]
 contracts?: Contract[],
 contractedRateKinds?: ContractedRateKind[],
 contractKinds?: ContractKind[],
 visitKinds?: VisitKind[],
 clinicalProviders?: ClinicalProvider[],
 specialties?: Specialty[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContractedRateFeatureStore extends ComponentStore<ContractedRateFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractedRateService: ContractedRateService
) {
    super({ 
      loading: false,
      contractedRates: [],
      done: false,
      searchQuery: '',
      formName: undefined,
contractId: undefined,
contractedRateKindId: undefined,
contractKindId: undefined,
visitKindId: undefined,
clinicalProviderId: undefined,
specialtyId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contractedRateId')) {
      var contractedRateId = this.route.snapshot.paramMap.get('contractedRateId')
      this.setFormName('contractedRate_edit')
    } else {
      this.setFormName('contractedRate_create')
    }


    if(this.route.snapshot.paramMap.has("contractId")) {
      var contractId = this.route.snapshot.paramMap.get("contractId")
      this.setContractId(contractId)
    }


    if(this.route.snapshot.paramMap.has("contractedRateKindId")) {
      var contractedRateKindId = this.route.snapshot.paramMap.get("contractedRateKindId")
      this.setContractedRateKindId(contractedRateKindId)
    }


    if(this.route.snapshot.paramMap.has("contractKindId")) {
      var contractKindId = this.route.snapshot.paramMap.get("contractKindId")
      this.setContractKindId(contractKindId)
    }


    if(this.route.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.route.snapshot.paramMap.get("visitKindId")
      this.setVisitKindId(visitKindId)
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId")
      this.setClinicalProviderId(clinicalProviderId)
    }


    if(this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId")
      this.setSpecialtyId(specialtyId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contractedRates$ = this.select((s) => s.contractedRates)
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly contractedRateKinds$ = this.select((s) => s.contractedRateKinds || [])
  readonly contractKinds$ = this.select((s) => s.contractKinds || [])
  readonly visitKinds$ = this.select((s) => s.visitKinds || [])
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly specialties$ = this.select((s) => s.specialties || [])

readonly contractId$ = this.select((s) => s.contractId)

readonly contractedRateKindId$ = this.select((s) => s.contractedRateKindId)

readonly contractKindId$ = this.select((s) => s.contractKindId)

readonly visitKindId$ = this.select((s) => s.visitKindId)

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

readonly specialtyId$ = this.select((s) => s.specialtyId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contractedRates$,
this.contracts$,this.contractedRateKinds$,this.contractKinds$,this.visitKinds$,this.clinicalProviders$,this.specialties$,
    (errors, loading, item, formName, contractedRates, contracts,contractedRateKinds,contractKinds,visitKinds,clinicalProviders,specialties ) => ({
    errors,
    loading,
    item,
    formName,
    contractedRates,

            contracts,contractedRateKinds,contractKinds,visitKinds,clinicalProviders,specialties
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.contractId$,
this.contractedRateKindId$,
this.contractKindId$,
this.visitKindId$,
this.clinicalProviderId$,
this.specialtyId$, this.searchQuery$, (paging, contractId,
contractedRateKindId,
contractKindId,
visitKindId,
clinicalProviderId,
specialtyId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contractId: contractId,contractedRateKindId: contractedRateKindId,contractKindId: contractKindId,visitKindId: visitKindId,clinicalProviderId: clinicalProviderId,specialtyId: specialtyId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setContractId = this.updater((state, contractId: string) => ({
                ...state,
    contractId,
  }))


            readonly setContractedRateKindId = this.updater((state, contractedRateKindId: string) => ({
                ...state,
    contractedRateKindId,
  }))


            readonly setContractKindId = this.updater((state, contractKindId: string) => ({
                ...state,
    contractKindId,
  }))


            readonly setVisitKindId = this.updater((state, visitKindId: string) => ({
                ...state,
    visitKindId,
  }))


            readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string) => ({
                ...state,
    clinicalProviderId,
  }))


            readonly setSpecialtyId = this.updater((state, specialtyId: string) => ({
                ...state,
    specialtyId,
  }))



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


  readonly filterContractedRateKinds = (term) => 
        this.data.userSelectContractedRateKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contractedRateKinds = res.data.items;
              this.patchState({contractedRateKinds})
              return contractedRateKinds
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


  readonly filterContractKinds = (term) => 
        this.data.userSelectContractKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contractKinds = res.data.items;
              this.patchState({contractKinds})
              return contractKinds
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


  readonly filterVisitKinds = (term) => 
        this.data.userSelectVisitKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let visitKinds = res.data.items;
              this.patchState({visitKinds})
              return visitKinds
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


  readonly filterClinicalProviders = (term) => 
        this.data.userSelectClinicalProviders({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let clinicalProviders = res.data.items;
              this.patchState({clinicalProviders})
              return clinicalProviders
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


  readonly filterSpecialties = (term) => 
        this.data.userSelectSpecialties({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let specialties = res.data.items;
              this.patchState({specialties})
              return specialties
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



  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addContractedRateKind = this.updater((state, contractedRateKind: ContractedRateKind) => ({
    ...state, contractedRateKinds: state.contractedRateKinds.concat(contractedRateKind)
  }))


  readonly addContractKind = this.updater((state, contractKind: ContractKind) => ({
    ...state, contractKinds: state.contractKinds.concat(contractKind)
  }))


  readonly addVisitKind = this.updater((state, visitKind: VisitKind) => ({
    ...state, visitKinds: state.visitKinds.concat(visitKind)
  }))


  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))


  readonly addSpecialty = this.updater((state, specialty: Specialty) => ({
    ...state, specialties: state.specialties.concat(specialty)
  }))

    

  readonly setItem = this.updater((state, item: ContractedRate) => ({...state, item}))

  addNewContractedRate = this.updater((state, contractedRate: ContractedRate) => ({ ...state, contractedRates: [...state.contractedRates, contractedRate] }))

  updateContractedRate = this.updater((state, contractedRate: ContractedRate) => {
    return {
      ...state,
      contractedRates: state.contractedRates.map((el) => {
        if (el.id === contractedRate.id) {
          return contractedRate
        } else {
          return el
        }
      }),
    }
  })

  addContractedRates = this.updater((state, newContractedRates: any[]) => ({...state, contractedRates: state.contractedRates.concat(newContractedRates) }))
  updateContractedRates = this.updater((state, updatedContractedRates: any[]) => {
    return {
      ...state,
      contractedRates: state.contractedRates.map((contractedRate) => {
        const updated = updatedContractedRates.find((el) => el.id === contractedRate.id);
        return updated ? updated : contractedRate;
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
        return this.contractedRateService.validateContractedRateExcelData(excelData, vm.contracts,vm.contractedRateKinds,vm.contractKinds,vm.visitKinds,vm.clinicalProviders,vm.specialties);
      })
    )
  }


  readonly loadContractedRateEffect = this.effect<string>((contractedRateId$) =>
    contractedRateId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contractedRateId) =>
        this.data.userContractedRate({ contractedRateId }).pipe(
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



  readonly loadContractedRatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContractedRates({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contractedRates: res.data.items,
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

  readonly createContractedRateEffect = this.effect<UserCreateContractedRateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contractedRateService.createContractedRate({...input }).pipe(
          tapResponse(
            (contractedRate: ContractedRate) => {
              this.addNewContractedRate(contractedRate)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contractedRate, loading: false, done: true }), 300);
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

    readonly updateContractedRateEffect = this.effect<UserUpdateContractedRateInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contractedRateService.updateContractedRate(input, input.id).pipe(
              tapResponse(
                (contractedRate) => {
                  this.updateContractedRate(contractedRate)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contractedRate, loading: false, done: true }), 300);
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
  
    readonly deleteContractedRateEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contractedRate]) => {
          return this.data.userDeleteContractedRate({contractedRateId: contractedRate.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContractedRateInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contractedRateService.importContractedRates(data).pipe(
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

            this.addContractedRates(created);
            this.updateContractedRates(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
