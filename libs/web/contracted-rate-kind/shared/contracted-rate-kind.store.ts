
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContractedRateKindService } from './contracted-rate-kind.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContractedRateKindInput, UserUpdateContractedRateKindInput, WebCoreDataAccessService, CorePaging, ContractedRateKind,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContractedRateKindFeatureState {
  errors?: any
  loading?: boolean
  item?: ContractedRateKind
  done: boolean,
  formName?: string

  contractedRateKinds: ContractedRateKind[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContractedRateKindFeatureStore extends ComponentStore<ContractedRateKindFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractedRateKindService: ContractedRateKindService
) {
    super({ 
      loading: false,
      contractedRateKinds: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contractedRateKindId')) {
      var contractedRateKindId = this.route.snapshot.paramMap.get('contractedRateKindId')
      this.setFormName('contractedRateKind_edit')
    } else {
      this.setFormName('contractedRateKind_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contractedRateKinds$ = this.select((s) => s.contractedRateKinds)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contractedRateKinds$,

    (errors, loading, item, formName, contractedRateKinds,  ) => ({
    errors,
    loading,
    item,
    formName,
    contractedRateKinds,

            
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







    

  readonly setItem = this.updater((state, item: ContractedRateKind) => ({...state, item}))

  addNewContractedRateKind = this.updater((state, contractedRateKind: ContractedRateKind) => ({ ...state, contractedRateKinds: [...state.contractedRateKinds, contractedRateKind] }))

  updateContractedRateKind = this.updater((state, contractedRateKind: ContractedRateKind) => {
    return {
      ...state,
      contractedRateKinds: state.contractedRateKinds.map((el) => {
        if (el.id === contractedRateKind.id) {
          return contractedRateKind
        } else {
          return el
        }
      }),
    }
  })

  addContractedRateKinds = this.updater((state, newContractedRateKinds: any[]) => ({...state, contractedRateKinds: state.contractedRateKinds.concat(newContractedRateKinds) }))
  updateContractedRateKinds = this.updater((state, updatedContractedRateKinds: any[]) => {
    return {
      ...state,
      contractedRateKinds: state.contractedRateKinds.map((contractedRateKind) => {
        const updated = updatedContractedRateKinds.find((el) => el.id === contractedRateKind.id);
        return updated ? updated : contractedRateKind;
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
        return this.contractedRateKindService.validateContractedRateKindExcelData(excelData);
      })
    )
  }


  readonly loadContractedRateKindEffect = this.effect<string>((contractedRateKindId$) =>
    contractedRateKindId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contractedRateKindId) =>
        this.data.userContractedRateKind({ contractedRateKindId }).pipe(
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



  readonly loadContractedRateKindsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContractedRateKinds({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contractedRateKinds: res.data.items,
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

  readonly createContractedRateKindEffect = this.effect<UserCreateContractedRateKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contractedRateKindService.createContractedRateKind({...input }).pipe(
          tapResponse(
            (contractedRateKind: ContractedRateKind) => {
              this.addNewContractedRateKind(contractedRateKind)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contractedRateKind, loading: false, done: true }), 300);
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

    readonly updateContractedRateKindEffect = this.effect<UserUpdateContractedRateKindInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contractedRateKindService.updateContractedRateKind(input, input.id).pipe(
              tapResponse(
                (contractedRateKind) => {
                  this.updateContractedRateKind(contractedRateKind)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contractedRateKind, loading: false, done: true }), 300);
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
  
    readonly deleteContractedRateKindEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contractedRateKind]) => {
          return this.data.userDeleteContractedRateKind({contractedRateKindId: contractedRateKind.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContractedRateKindInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contractedRateKindService.importContractedRateKinds(data).pipe(
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

            this.addContractedRateKinds(created);
            this.updateContractedRateKinds(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
