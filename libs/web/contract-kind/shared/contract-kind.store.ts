
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContractKindService } from './contract-kind.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContractKindInput, UserUpdateContractKindInput, WebCoreDataAccessService, CorePaging, ContractKind,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContractKindFeatureState {
  errors?: any
  loading?: boolean
  item?: ContractKind
  done: boolean,
  formName?: string

  contractKinds: ContractKind[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContractKindFeatureStore extends ComponentStore<ContractKindFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractKindService: ContractKindService
) {
    super({ 
      loading: false,
      contractKinds: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contractKindId')) {
      var contractKindId = this.route.snapshot.paramMap.get('contractKindId')
      this.setFormName('contractKind_edit')
    } else {
      this.setFormName('contractKind_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contractKinds$ = this.select((s) => s.contractKinds)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contractKinds$,

    (errors, loading, item, formName, contractKinds,  ) => ({
    errors,
    loading,
    item,
    formName,
    contractKinds,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: ContractKind) => ({...state, item}))

  addNewContractKind = this.updater((state, contractKind: ContractKind) => ({ ...state, contractKinds: [...state.contractKinds, contractKind] }))

  updateContractKind = this.updater((state, contractKind: ContractKind) => {
    return {
      ...state,
      contractKinds: state.contractKinds.map((el) => {
        if (el.id === contractKind.id) {
          return contractKind
        } else {
          return el
        }
      }),
    }
  })

  addContractKinds = this.updater((state, newContractKinds: any[]) => ({...state, contractKinds: state.contractKinds.concat(newContractKinds) }))
  updateContractKinds = this.updater((state, updatedContractKinds: any[]) => {
    return {
      ...state,
      contractKinds: state.contractKinds.map((contractKind) => {
        const updated = updatedContractKinds.find((el) => el.id === contractKind.id);
        return updated ? updated : contractKind;
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
        return this.contractKindService.validateContractKindExcelData(excelData);
      })
    )
  }


  readonly loadContractKindEffect = this.effect<string>((contractKindId$) =>
    contractKindId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contractKindId) =>
        this.data.userContractKind({ contractKindId }).pipe(
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



  readonly loadContractKindsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContractKinds({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contractKinds: res.data.items,
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

  readonly createContractKindEffect = this.effect<UserCreateContractKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contractKindService.createContractKind({...input }).pipe(
          tapResponse(
            (contractKind: ContractKind) => {
              this.addNewContractKind(contractKind)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contractKind, loading: false, done: true }), 300);
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

    readonly updateContractKindEffect = this.effect<UserUpdateContractKindInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contractKindService.updateContractKind(input, input.id).pipe(
              tapResponse(
                (contractKind) => {
                  this.updateContractKind(contractKind)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contractKind, loading: false, done: true }), 300);
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
  
    readonly deleteContractKindEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contractKind]) => {
          return this.data.userDeleteContractKind({contractKindId: contractKind.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContractKindInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contractKindService.importContractKinds(data).pipe(
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

            this.addContractKinds(created);
            this.updateContractKinds(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
