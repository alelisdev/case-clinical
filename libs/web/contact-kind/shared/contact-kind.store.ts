
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContactKindService } from './contact-kind.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContactKindInput, UserUpdateContactKindInput, WebCoreDataAccessService, CorePaging, ContactKind,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContactKindFeatureState {
  errors?: any
  loading?: boolean
  item?: ContactKind
  done: boolean,
  formName?: string

  contactKinds: ContactKind[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContactKindFeatureStore extends ComponentStore<ContactKindFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactKindService: ContactKindService
) {
    super({ 
      loading: false,
      contactKinds: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contactKindId')) {
      var contactKindId = this.route.snapshot.paramMap.get('contactKindId')
      this.setFormName('contactKind_edit')
    } else {
      this.setFormName('contactKind_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contactKinds$ = this.select((s) => s.contactKinds)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contactKinds$,

    (errors, loading, item, formName, contactKinds,  ) => ({
    errors,
    loading,
    item,
    formName,
    contactKinds,

            
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







    

  readonly setItem = this.updater((state, item: ContactKind) => ({...state, item}))

  addNewContactKind = this.updater((state, contactKind: ContactKind) => ({ ...state, contactKinds: [...state.contactKinds, contactKind] }))

  updateContactKind = this.updater((state, contactKind: ContactKind) => {
    return {
      ...state,
      contactKinds: state.contactKinds.map((el) => {
        if (el.id === contactKind.id) {
          return contactKind
        } else {
          return el
        }
      }),
    }
  })

  addContactKinds = this.updater((state, newContactKinds: any[]) => ({...state, contactKinds: state.contactKinds.concat(newContactKinds) }))
  updateContactKinds = this.updater((state, updatedContactKinds: any[]) => {
    return {
      ...state,
      contactKinds: state.contactKinds.map((contactKind) => {
        const updated = updatedContactKinds.find((el) => el.id === contactKind.id);
        return updated ? updated : contactKind;
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
        return this.contactKindService.validateContactKindExcelData(excelData);
      })
    )
  }


  readonly loadContactKindEffect = this.effect<string>((contactKindId$) =>
    contactKindId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contactKindId) =>
        this.data.userContactKind({ contactKindId }).pipe(
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



  readonly loadContactKindsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactKinds({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contactKinds: res.data.items,
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

  readonly createContactKindEffect = this.effect<UserCreateContactKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contactKindService.createContactKind({...input }).pipe(
          tapResponse(
            (contactKind: ContactKind) => {
              this.addNewContactKind(contactKind)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contactKind, loading: false, done: true }), 300);
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

    readonly updateContactKindEffect = this.effect<UserUpdateContactKindInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contactKindService.updateContactKind(input, input.id).pipe(
              tapResponse(
                (contactKind) => {
                  this.updateContactKind(contactKind)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contactKind, loading: false, done: true }), 300);
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
  
    readonly deleteContactKindEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contactKind]) => {
          return this.data.userDeleteContactKind({contactKindId: contactKind.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContactKindInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactKindService.importContactKinds(data).pipe(
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

            this.addContactKinds(created);
            this.updateContactKinds(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
