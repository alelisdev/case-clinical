
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { WriteOffService } from './write-off.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateWriteOffInput, UserUpdateWriteOffInput, WebCoreDataAccessService, CorePaging, WriteOff, CaseAccount,WriteOffStatus } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface WriteOffFeatureState {
  errors?: any
  loading?: boolean
  item?: WriteOff
  done: boolean,
  formName?: string
accountId?: string,writeOffStatusId?: string,
  writeOffs: WriteOff[]
 caseAccounts?: CaseAccount[],
 writeOffStatuses?: WriteOffStatus[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebWriteOffFeatureStore extends ComponentStore<WriteOffFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly writeOffService: WriteOffService
) {
    super({ 
      loading: false,
      writeOffs: [],
      done: false,
      searchQuery: '',
      formName: undefined,
accountId: undefined,
writeOffStatusId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('writeOffId')) {
      var writeOffId = this.route.snapshot.paramMap.get('writeOffId')
      this.setFormName('writeOff_edit')
    } else {
      this.setFormName('writeOff_create')
    }


    if(this.route.snapshot.paramMap.has("accountId")) {
      var accountId = this.route.snapshot.paramMap.get("accountId")
      this.setAccountId(accountId)
    }


    if(this.route.snapshot.paramMap.has("writeOffStatusId")) {
      var writeOffStatusId = this.route.snapshot.paramMap.get("writeOffStatusId")
      this.setWriteOffStatusId(writeOffStatusId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly writeOffs$ = this.select((s) => s.writeOffs)
  readonly caseAccounts$ = this.select((s) => s.caseAccounts || [])
  readonly writeOffStatuses$ = this.select((s) => s.writeOffStatuses || [])

readonly accountId$ = this.select((s) => s.accountId)

readonly writeOffStatusId$ = this.select((s) => s.writeOffStatusId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.writeOffs$,
this.caseAccounts$,this.writeOffStatuses$,
    (errors, loading, item, formName, writeOffs, caseAccounts,writeOffStatuses ) => ({
    errors,
    loading,
    item,
    formName,
    writeOffs,

            caseAccounts,writeOffStatuses
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.accountId$,
this.writeOffStatusId$, this.searchQuery$, (paging, accountId,
writeOffStatusId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    accountId: accountId,writeOffStatusId: writeOffStatusId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setAccountId = this.updater((state, accountId: string) => ({
                ...state,
    accountId,
  }))


            readonly setWriteOffStatusId = this.updater((state, writeOffStatusId: string) => ({
                ...state,
    writeOffStatusId,
  }))



  readonly filterCaseAccounts = (term) => 
        this.data.userSelectCaseAccounts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseAccounts = res.data.items;
              this.patchState({caseAccounts})
              return caseAccounts
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


  readonly filterWriteOffStatuses = (term) => 
        this.data.userSelectWriteOffStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let writeOffStatuses = res.data.items;
              this.patchState({writeOffStatuses})
              return writeOffStatuses
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



  readonly addCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({
    ...state, caseAccounts: state.caseAccounts.concat(caseAccount)
  }))


  readonly addWriteOffStatus = this.updater((state, writeOffStatus: WriteOffStatus) => ({
    ...state, writeOffStatuses: state.writeOffStatuses.concat(writeOffStatus)
  }))

    

  readonly setItem = this.updater((state, item: WriteOff) => ({...state, item}))

  addNewWriteOff = this.updater((state, writeOff: WriteOff) => ({ ...state, writeOffs: [...state.writeOffs, writeOff] }))

  updateWriteOff = this.updater((state, writeOff: WriteOff) => {
    return {
      ...state,
      writeOffs: state.writeOffs.map((el) => {
        if (el.id === writeOff.id) {
          return writeOff
        } else {
          return el
        }
      }),
    }
  })

  addWriteOffs = this.updater((state, newWriteOffs: any[]) => ({...state, writeOffs: state.writeOffs.concat(newWriteOffs) }))
  updateWriteOffs = this.updater((state, updatedWriteOffs: any[]) => {
    return {
      ...state,
      writeOffs: state.writeOffs.map((writeOff) => {
        const updated = updatedWriteOffs.find((el) => el.id === writeOff.id);
        return updated ? updated : writeOff;
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
        return this.writeOffService.validateWriteOffExcelData(excelData, vm.caseAccounts,vm.writeOffStatuses);
      })
    )
  }


  readonly loadWriteOffEffect = this.effect<string>((writeOffId$) =>
    writeOffId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((writeOffId) =>
        this.data.userWriteOff({ writeOffId }).pipe(
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



  readonly loadWriteOffsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userWriteOffs({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                writeOffs: res.data.items,
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

  readonly createWriteOffEffect = this.effect<UserCreateWriteOffInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.writeOffService.createWriteOff({...input }).pipe(
          tapResponse(
            (writeOff: WriteOff) => {
              this.addNewWriteOff(writeOff)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: writeOff, loading: false, done: true }), 300);
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

    readonly updateWriteOffEffect = this.effect<UserUpdateWriteOffInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.writeOffService.updateWriteOff(input, input.id).pipe(
              tapResponse(
                (writeOff) => {
                  this.updateWriteOff(writeOff)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: writeOff, loading: false, done: true }), 300);
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
  
    readonly deleteWriteOffEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, writeOff]) => {
          return this.data.userDeleteWriteOff({writeOffId: writeOff.id})
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

  readonly importExcelEffect = this.effect<UserUpdateWriteOffInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.writeOffService.importWriteOffs(data).pipe(
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

            this.addWriteOffs(created);
            this.updateWriteOffs(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
