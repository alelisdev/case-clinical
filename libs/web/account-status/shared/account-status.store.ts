
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AccountStatusService } from './account-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAccountStatusInput, UserUpdateAccountStatusInput, WebCoreDataAccessService, CorePaging, AccountStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AccountStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: AccountStatus
  done: boolean,
  formName?: string

  accountStatuses: AccountStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAccountStatusFeatureStore extends ComponentStore<AccountStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly accountStatusService: AccountStatusService
) {
    super({ 
      loading: false,
      accountStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('accountStatusId')) {
      var accountStatusId = this.route.snapshot.paramMap.get('accountStatusId')
      this.setFormName('accountStatus_edit')
    } else {
      this.setFormName('accountStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly accountStatuses$ = this.select((s) => s.accountStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.accountStatuses$,

    (errors, loading, item, formName, accountStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    accountStatuses,

            
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







    

  readonly setItem = this.updater((state, item: AccountStatus) => ({...state, item}))

  addNewAccountStatus = this.updater((state, accountStatus: AccountStatus) => ({ ...state, accountStatuses: [...state.accountStatuses, accountStatus] }))

  updateAccountStatus = this.updater((state, accountStatus: AccountStatus) => {
    return {
      ...state,
      accountStatuses: state.accountStatuses.map((el) => {
        if (el.id === accountStatus.id) {
          return accountStatus
        } else {
          return el
        }
      }),
    }
  })

  addAccountStatuses = this.updater((state, newAccountStatuses: any[]) => ({...state, accountStatuses: state.accountStatuses.concat(newAccountStatuses) }))
  updateAccountStatuses = this.updater((state, updatedAccountStatuses: any[]) => {
    return {
      ...state,
      accountStatuses: state.accountStatuses.map((accountStatus) => {
        const updated = updatedAccountStatuses.find((el) => el.id === accountStatus.id);
        return updated ? updated : accountStatus;
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
        return this.accountStatusService.validateAccountStatusExcelData(excelData);
      })
    )
  }


  readonly loadAccountStatusEffect = this.effect<string>((accountStatusId$) =>
    accountStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((accountStatusId) =>
        this.data.userAccountStatus({ accountStatusId }).pipe(
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



  readonly loadAccountStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAccountStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                accountStatuses: res.data.items,
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

  readonly createAccountStatusEffect = this.effect<UserCreateAccountStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.accountStatusService.createAccountStatus({...input }).pipe(
          tapResponse(
            (accountStatus: AccountStatus) => {
              this.addNewAccountStatus(accountStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: accountStatus, loading: false, done: true }), 300);
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

    readonly updateAccountStatusEffect = this.effect<UserUpdateAccountStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.accountStatusService.updateAccountStatus(input, input.id).pipe(
              tapResponse(
                (accountStatus) => {
                  this.updateAccountStatus(accountStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: accountStatus, loading: false, done: true }), 300);
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
  
    readonly deleteAccountStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, accountStatus]) => {
          return this.data.userDeleteAccountStatus({accountStatusId: accountStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAccountStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.accountStatusService.importAccountStatuses(data).pipe(
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

            this.addAccountStatuses(created);
            this.updateAccountStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
