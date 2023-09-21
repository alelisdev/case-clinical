
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { JournalEntryTemplateService } from './journal-entry-template.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateJournalEntryTemplateInput, UserUpdateJournalEntryTemplateInput, WebCoreDataAccessService, CorePaging, JournalEntryTemplate, CaseAccount } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface JournalEntryTemplateFeatureState {
  errors?: any
  loading?: boolean
  item?: JournalEntryTemplate
  done: boolean,
  formName?: string
caseAccountId?: string,
  journalEntryTemplates: JournalEntryTemplate[]
 caseAccounts?: CaseAccount[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebJournalEntryTemplateFeatureStore extends ComponentStore<JournalEntryTemplateFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly journalEntryTemplateService: JournalEntryTemplateService
) {
    super({ 
      loading: false,
      journalEntryTemplates: [],
      done: false,
      searchQuery: '',
      formName: undefined,
caseAccountId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('journalEntryTemplateId')) {
      var journalEntryTemplateId = this.route.snapshot.paramMap.get('journalEntryTemplateId')
      this.setFormName('journalEntryTemplate_edit')
    } else {
      this.setFormName('journalEntryTemplate_create')
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
  readonly journalEntryTemplates$ = this.select((s) => s.journalEntryTemplates)
  readonly caseAccounts$ = this.select((s) => s.caseAccounts || [])

readonly caseAccountId$ = this.select((s) => s.caseAccountId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.journalEntryTemplates$,
this.caseAccounts$,
    (errors, loading, item, formName, journalEntryTemplates, caseAccounts ) => ({
    errors,
    loading,
    item,
    formName,
    journalEntryTemplates,

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

    

  readonly setItem = this.updater((state, item: JournalEntryTemplate) => ({...state, item}))

  addNewJournalEntryTemplate = this.updater((state, journalEntryTemplate: JournalEntryTemplate) => ({ ...state, journalEntryTemplates: [...state.journalEntryTemplates, journalEntryTemplate] }))

  updateJournalEntryTemplate = this.updater((state, journalEntryTemplate: JournalEntryTemplate) => {
    return {
      ...state,
      journalEntryTemplates: state.journalEntryTemplates.map((el) => {
        if (el.id === journalEntryTemplate.id) {
          return journalEntryTemplate
        } else {
          return el
        }
      }),
    }
  })

  addJournalEntryTemplates = this.updater((state, newJournalEntryTemplates: any[]) => ({...state, journalEntryTemplates: state.journalEntryTemplates.concat(newJournalEntryTemplates) }))
  updateJournalEntryTemplates = this.updater((state, updatedJournalEntryTemplates: any[]) => {
    return {
      ...state,
      journalEntryTemplates: state.journalEntryTemplates.map((journalEntryTemplate) => {
        const updated = updatedJournalEntryTemplates.find((el) => el.id === journalEntryTemplate.id);
        return updated ? updated : journalEntryTemplate;
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
        return this.journalEntryTemplateService.validateJournalEntryTemplateExcelData(excelData, vm.caseAccounts);
      })
    )
  }


  readonly loadJournalEntryTemplateEffect = this.effect<string>((journalEntryTemplateId$) =>
    journalEntryTemplateId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((journalEntryTemplateId) =>
        this.data.userJournalEntryTemplate({ journalEntryTemplateId }).pipe(
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



  readonly loadJournalEntryTemplatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userJournalEntryTemplates({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                journalEntryTemplates: res.data.items,
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

  readonly createJournalEntryTemplateEffect = this.effect<UserCreateJournalEntryTemplateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.journalEntryTemplateService.createJournalEntryTemplate({...input }).pipe(
          tapResponse(
            (journalEntryTemplate: JournalEntryTemplate) => {
              this.addNewJournalEntryTemplate(journalEntryTemplate)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: journalEntryTemplate, loading: false, done: true }), 300);
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

    readonly updateJournalEntryTemplateEffect = this.effect<UserUpdateJournalEntryTemplateInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.journalEntryTemplateService.updateJournalEntryTemplate(input, input.id).pipe(
              tapResponse(
                (journalEntryTemplate) => {
                  this.updateJournalEntryTemplate(journalEntryTemplate)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: journalEntryTemplate, loading: false, done: true }), 300);
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
  
    readonly deleteJournalEntryTemplateEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, journalEntryTemplate]) => {
          return this.data.userDeleteJournalEntryTemplate({journalEntryTemplateId: journalEntryTemplate.id})
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

  readonly importExcelEffect = this.effect<UserUpdateJournalEntryTemplateInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.journalEntryTemplateService.importJournalEntryTemplates(data).pipe(
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

            this.addJournalEntryTemplates(created);
            this.updateJournalEntryTemplates(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
