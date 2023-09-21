
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { JournalEntryService } from './journal-entry.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateJournalEntryInput, UserUpdateJournalEntryInput, WebCoreDataAccessService, CorePaging, JournalEntry, CaseAccount } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface JournalEntryFeatureState {
  errors?: any
  loading?: boolean
  item?: JournalEntry
  done: boolean,
  formName?: string
caseAccountId?: string,
  journalEntries: JournalEntry[]
 caseAccounts?: CaseAccount[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebJournalEntryFeatureStore extends ComponentStore<JournalEntryFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly journalEntryService: JournalEntryService
) {
    super({ 
      loading: false,
      journalEntries: [],
      done: false,
      searchQuery: '',
      formName: undefined,
caseAccountId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('journalEntryId')) {
      var journalEntryId = this.route.snapshot.paramMap.get('journalEntryId')
      this.setFormName('journalEntry_edit')
    } else {
      this.setFormName('journalEntry_create')
    }


    if(this.route.snapshot.paramMap.has("caseAccountId")) {
      var caseAccountId = this.route.snapshot.paramMap.get("caseAccountId")
      this.setCaseAccountId(caseAccountId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly journalEntries$ = this.select((s) => s.journalEntries)
  readonly caseAccounts$ = this.select((s) => s.caseAccounts || [])

readonly caseAccountId$ = this.select((s) => s.caseAccountId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.journalEntries$,
this.caseAccounts$,
    (errors, loading, item, formName, journalEntries, caseAccounts ) => ({
    errors,
    loading,
    item,
    formName,
    journalEntries,

            caseAccounts
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.caseAccountId$, this.searchQuery$, (paging, caseAccountId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    caseAccountId: caseAccountId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setCaseAccountId = this.updater((state, caseAccountId: string) => ({
                ...state,
    caseAccountId,
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



  readonly addCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({
    ...state, caseAccounts: state.caseAccounts.concat(caseAccount)
  }))

    

  readonly setItem = this.updater((state, item: JournalEntry) => ({...state, item}))

  addNewJournalEntry = this.updater((state, journalEntry: JournalEntry) => ({ ...state, journalEntries: [...state.journalEntries, journalEntry] }))

  updateJournalEntry = this.updater((state, journalEntry: JournalEntry) => {
    return {
      ...state,
      journalEntries: state.journalEntries.map((el) => {
        if (el.id === journalEntry.id) {
          return journalEntry
        } else {
          return el
        }
      }),
    }
  })

  addJournalEntries = this.updater((state, newJournalEntries: any[]) => ({...state, journalEntries: state.journalEntries.concat(newJournalEntries) }))
  updateJournalEntries = this.updater((state, updatedJournalEntries: any[]) => {
    return {
      ...state,
      journalEntries: state.journalEntries.map((journalEntry) => {
        const updated = updatedJournalEntries.find((el) => el.id === journalEntry.id);
        return updated ? updated : journalEntry;
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
        return this.journalEntryService.validateJournalEntryExcelData(excelData, vm.caseAccounts);
      })
    )
  }


  readonly loadJournalEntryEffect = this.effect<string>((journalEntryId$) =>
    journalEntryId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((journalEntryId) =>
        this.data.userJournalEntry({ journalEntryId }).pipe(
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



  readonly loadJournalEntriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userJournalEntries({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                journalEntries: res.data.items,
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

  readonly createJournalEntryEffect = this.effect<UserCreateJournalEntryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.journalEntryService.createJournalEntry({...input }).pipe(
          tapResponse(
            (journalEntry: JournalEntry) => {
              this.addNewJournalEntry(journalEntry)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: journalEntry, loading: false, done: true }), 300);
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

    readonly updateJournalEntryEffect = this.effect<UserUpdateJournalEntryInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.journalEntryService.updateJournalEntry(input, input.id).pipe(
              tapResponse(
                (journalEntry) => {
                  this.updateJournalEntry(journalEntry)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: journalEntry, loading: false, done: true }), 300);
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
  
    readonly deleteJournalEntryEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, journalEntry]) => {
          return this.data.userDeleteJournalEntry({journalEntryId: journalEntry.id})
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

  readonly importExcelEffect = this.effect<UserUpdateJournalEntryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.journalEntryService.importJournalEntries(data).pipe(
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

            this.addJournalEntries(created);
            this.updateJournalEntries(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
