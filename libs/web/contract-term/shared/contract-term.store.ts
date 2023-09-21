
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContractTermService } from './contract-term.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContractTermInput, UserUpdateContractTermInput, WebCoreDataAccessService, CorePaging, ContractTerm, Contract } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContractTermFeatureState {
  errors?: any
  loading?: boolean
  item?: ContractTerm
  done: boolean,
  formName?: string
contractTermId?: string,
  contractTerms: ContractTerm[]
 contracts?: Contract[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContractTermFeatureStore extends ComponentStore<ContractTermFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractTermService: ContractTermService
) {
    super({ 
      loading: false,
      contractTerms: [],
      done: false,
      searchQuery: '',
      formName: undefined,
contractTermId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contractTermId')) {
      var contractTermId = this.route.snapshot.paramMap.get('contractTermId')
      this.setFormName('contractTerm_edit')
    } else {
      this.setFormName('contractTerm_create')
    }


    if(this.route.snapshot.paramMap.has("contractTermId")) {
      var contractTermId = this.route.snapshot.paramMap.get("contractTermId")
      this.setContractTermId(contractTermId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contractTerms$ = this.select((s) => s.contractTerms)
  readonly contracts$ = this.select((s) => s.contracts || [])

readonly contractTermId$ = this.select((s) => s.contractTermId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contractTerms$,
this.contracts$,
    (errors, loading, item, formName, contractTerms, contracts ) => ({
    errors,
    loading,
    item,
    formName,
    contractTerms,

            contracts
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.contractTermId$, this.searchQuery$, (paging, contractTermId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contractTermId: contractTermId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setContractTermId = this.updater((state, contractTermId: string) => ({
                ...state,
    contractTermId,
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



  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))

    

  readonly setItem = this.updater((state, item: ContractTerm) => ({...state, item}))

  addNewContractTerm = this.updater((state, contractTerm: ContractTerm) => ({ ...state, contractTerms: [...state.contractTerms, contractTerm] }))

  updateContractTerm = this.updater((state, contractTerm: ContractTerm) => {
    return {
      ...state,
      contractTerms: state.contractTerms.map((el) => {
        if (el.id === contractTerm.id) {
          return contractTerm
        } else {
          return el
        }
      }),
    }
  })

  addContractTerms = this.updater((state, newContractTerms: any[]) => ({...state, contractTerms: state.contractTerms.concat(newContractTerms) }))
  updateContractTerms = this.updater((state, updatedContractTerms: any[]) => {
    return {
      ...state,
      contractTerms: state.contractTerms.map((contractTerm) => {
        const updated = updatedContractTerms.find((el) => el.id === contractTerm.id);
        return updated ? updated : contractTerm;
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
        return this.contractTermService.validateContractTermExcelData(excelData, vm.contracts);
      })
    )
  }


  readonly loadContractTermEffect = this.effect<string>((contractTermId$) =>
    contractTermId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contractTermId) =>
        this.data.userContractTerm({ contractTermId }).pipe(
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



  readonly loadContractTermsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContractTerms({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contractTerms: res.data.items,
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

  readonly createContractTermEffect = this.effect<UserCreateContractTermInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contractTermService.createContractTerm({...input }).pipe(
          tapResponse(
            (contractTerm: ContractTerm) => {
              this.addNewContractTerm(contractTerm)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contractTerm, loading: false, done: true }), 300);
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

    readonly updateContractTermEffect = this.effect<UserUpdateContractTermInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contractTermService.updateContractTerm(input, input.id).pipe(
              tapResponse(
                (contractTerm) => {
                  this.updateContractTerm(contractTerm)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contractTerm, loading: false, done: true }), 300);
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
  
    readonly deleteContractTermEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contractTerm]) => {
          return this.data.userDeleteContractTerm({contractTermId: contractTerm.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContractTermInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contractTermService.importContractTerms(data).pipe(
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

            this.addContractTerms(created);
            this.updateContractTerms(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
