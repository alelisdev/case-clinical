
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { InsuranceService } from './insurance.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateInsuranceInput, UserUpdateInsuranceInput, WebCoreDataAccessService, CorePaging, Insurance, LegalCase,InsuranceType,InsuranceSector,Lead } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface InsuranceFeatureState {
  errors?: any
  loading?: boolean
  item?: Insurance
  done: boolean,
  formName?: string
legalCaseId?: string,insuranceTypeId?: string,insuranceSectorId?: string,leadId?: string,
  insurances: Insurance[]
 legalCases?: LegalCase[],
 insuranceTypes?: InsuranceType[],
 insuranceSectors?: InsuranceSector[],
 leads?: Lead[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebInsuranceFeatureStore extends ComponentStore<InsuranceFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceService: InsuranceService
) {
    super({ 
      loading: false,
      insurances: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
insuranceTypeId: undefined,
insuranceSectorId: undefined,
leadId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('insuranceId')) {
      var insuranceId = this.route.snapshot.paramMap.get('insuranceId')
      this.setFormName('insurance_edit')
    } else {
      this.setFormName('insurance_create')
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }


    if(this.route.snapshot.paramMap.has("insuranceTypeId")) {
      var insuranceTypeId = this.route.snapshot.paramMap.get("insuranceTypeId")
      this.setInsuranceTypeId(insuranceTypeId)
    }


    if(this.route.snapshot.paramMap.has("insuranceSectorId")) {
      var insuranceSectorId = this.route.snapshot.paramMap.get("insuranceSectorId")
      this.setInsuranceSectorId(insuranceSectorId)
    }


    if(this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId")
      this.setLeadId(leadId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly insurances$ = this.select((s) => s.insurances)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly insuranceTypes$ = this.select((s) => s.insuranceTypes || [])
  readonly insuranceSectors$ = this.select((s) => s.insuranceSectors || [])
  readonly leads$ = this.select((s) => s.leads || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly insuranceTypeId$ = this.select((s) => s.insuranceTypeId)

readonly insuranceSectorId$ = this.select((s) => s.insuranceSectorId)

readonly leadId$ = this.select((s) => s.leadId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.insurances$,
this.legalCases$,this.insuranceTypes$,this.insuranceSectors$,this.leads$,
    (errors, loading, item, formName, insurances, legalCases,insuranceTypes,insuranceSectors,leads ) => ({
    errors,
    loading,
    item,
    formName,
    insurances,

            legalCases,insuranceTypes,insuranceSectors,leads
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.insuranceTypeId$,
this.insuranceSectorId$,
this.leadId$, this.searchQuery$, (paging, legalCaseId,
insuranceTypeId,
insuranceSectorId,
leadId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,insuranceTypeId: insuranceTypeId,insuranceSectorId: insuranceSectorId,leadId: leadId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))


            readonly setInsuranceTypeId = this.updater((state, insuranceTypeId: string) => ({
                ...state,
    insuranceTypeId,
  }))


            readonly setInsuranceSectorId = this.updater((state, insuranceSectorId: string) => ({
                ...state,
    insuranceSectorId,
  }))


            readonly setLeadId = this.updater((state, leadId: string) => ({
                ...state,
    leadId,
  }))



  readonly filterLegalCases = (term) => 
        this.data.userSelectLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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


  readonly filterInsuranceTypes = (term) => 
        this.data.userSelectInsuranceTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let insuranceTypes = res.data.items;
              this.patchState({insuranceTypes})
              return insuranceTypes
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


  readonly filterInsuranceSectors = (term) => 
        this.data.userSelectInsuranceSectors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let insuranceSectors = res.data.items;
              this.patchState({insuranceSectors})
              return insuranceSectors
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


  readonly filterLeads = (term) => 
        this.data.userSelectLeads({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let leads = res.data.items;
              this.patchState({leads})
              return leads
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



  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addInsuranceType = this.updater((state, insuranceType: InsuranceType) => ({
    ...state, insuranceTypes: state.insuranceTypes.concat(insuranceType)
  }))


  readonly addInsuranceSector = this.updater((state, insuranceSector: InsuranceSector) => ({
    ...state, insuranceSectors: state.insuranceSectors.concat(insuranceSector)
  }))


  readonly addLead = this.updater((state, lead: Lead) => ({
    ...state, leads: state.leads.concat(lead)
  }))

    

  readonly setItem = this.updater((state, item: Insurance) => ({...state, item}))

  addNewInsurance = this.updater((state, insurance: Insurance) => ({ ...state, insurances: [...state.insurances, insurance] }))

  updateInsurance = this.updater((state, insurance: Insurance) => {
    return {
      ...state,
      insurances: state.insurances.map((el) => {
        if (el.id === insurance.id) {
          return insurance
        } else {
          return el
        }
      }),
    }
  })

  addInsurances = this.updater((state, newInsurances: any[]) => ({...state, insurances: state.insurances.concat(newInsurances) }))
  updateInsurances = this.updater((state, updatedInsurances: any[]) => {
    return {
      ...state,
      insurances: state.insurances.map((insurance) => {
        const updated = updatedInsurances.find((el) => el.id === insurance.id);
        return updated ? updated : insurance;
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
        return this.insuranceService.validateInsuranceExcelData(excelData, vm.legalCases,vm.insuranceTypes,vm.insuranceSectors,vm.leads);
      })
    )
  }


  readonly loadInsuranceEffect = this.effect<string>((insuranceId$) =>
    insuranceId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((insuranceId) =>
        this.data.userInsurance({ insuranceId }).pipe(
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



  readonly loadInsurancesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userInsurances({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                insurances: res.data.items,
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

  readonly createInsuranceEffect = this.effect<UserCreateInsuranceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.insuranceService.createInsurance({...input }).pipe(
          tapResponse(
            (insurance: Insurance) => {
              this.addNewInsurance(insurance)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: insurance, loading: false, done: true }), 300);
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

    readonly updateInsuranceEffect = this.effect<UserUpdateInsuranceInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.insuranceService.updateInsurance(input, input.id).pipe(
              tapResponse(
                (insurance) => {
                  this.updateInsurance(insurance)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: insurance, loading: false, done: true }), 300);
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
  
    readonly deleteInsuranceEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, insurance]) => {
          return this.data.userDeleteInsurance({insuranceId: insurance.id})
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

  readonly importExcelEffect = this.effect<UserUpdateInsuranceInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.insuranceService.importInsurances(data).pipe(
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

            this.addInsurances(created);
            this.updateInsurances(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
