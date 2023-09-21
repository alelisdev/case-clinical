
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClinicalProviderTagService } from './clinical-provider-tag.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClinicalProviderTagInput, UserUpdateClinicalProviderTagInput, WebCoreDataAccessService, CorePaging, ClinicalProviderTag, ClinicalProvider,Tag } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ClinicalProviderTagFeatureState {
  errors?: any
  loading?: boolean
  item?: ClinicalProviderTag
  done: boolean,
  formName?: string
clinicalProviderId?: string,tagId?: string,
  clinicalProviderTags: ClinicalProviderTag[]
 clinicalProviders?: ClinicalProvider[],
 tags?: Tag[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebClinicalProviderTagFeatureStore extends ComponentStore<ClinicalProviderTagFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly clinicalProviderTagService: ClinicalProviderTagService
) {
    super({ 
      loading: false,
      clinicalProviderTags: [],
      done: false,
      searchQuery: '',
      formName: undefined,
clinicalProviderId: undefined,
tagId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('clinicalProviderTagId')) {
      var clinicalProviderTagId = this.route.snapshot.paramMap.get('clinicalProviderTagId')
      this.setFormName('clinicalProviderTag_edit')
    } else {
      this.setFormName('clinicalProviderTag_create')
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId")
      this.setClinicalProviderId(clinicalProviderId)
    }


    if(this.route.snapshot.paramMap.has("tagId")) {
      var tagId = this.route.snapshot.paramMap.get("tagId")
      this.setTagId(tagId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly clinicalProviderTags$ = this.select((s) => s.clinicalProviderTags)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly tags$ = this.select((s) => s.tags || [])

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

readonly tagId$ = this.select((s) => s.tagId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderTags$,
this.clinicalProviders$,this.tags$,
    (errors, loading, item, formName, clinicalProviderTags, clinicalProviders,tags ) => ({
    errors,
    loading,
    item,
    formName,
    clinicalProviderTags,

            clinicalProviders,tags
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.clinicalProviderId$,
this.tagId$, this.searchQuery$, (paging, clinicalProviderId,
tagId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    clinicalProviderId: clinicalProviderId,tagId: tagId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string) => ({
                ...state,
    clinicalProviderId,
  }))


            readonly setTagId = this.updater((state, tagId: string) => ({
                ...state,
    tagId,
  }))



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


  readonly filterTags = (term) => 
        this.data.userSelectTags({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let tags = res.data.items;
              this.patchState({tags})
              return tags
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



  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))


  readonly addTag = this.updater((state, tag: Tag) => ({
    ...state, tags: state.tags.concat(tag)
  }))

    

  readonly setItem = this.updater((state, item: ClinicalProviderTag) => ({...state, item}))

  addNewClinicalProviderTag = this.updater((state, clinicalProviderTag: ClinicalProviderTag) => ({ ...state, clinicalProviderTags: [...state.clinicalProviderTags, clinicalProviderTag] }))

  updateClinicalProviderTag = this.updater((state, clinicalProviderTag: ClinicalProviderTag) => {
    return {
      ...state,
      clinicalProviderTags: state.clinicalProviderTags.map((el) => {
        if (el.id === clinicalProviderTag.id) {
          return clinicalProviderTag
        } else {
          return el
        }
      }),
    }
  })

  addClinicalProviderTags = this.updater((state, newClinicalProviderTags: any[]) => ({...state, clinicalProviderTags: state.clinicalProviderTags.concat(newClinicalProviderTags) }))
  updateClinicalProviderTags = this.updater((state, updatedClinicalProviderTags: any[]) => {
    return {
      ...state,
      clinicalProviderTags: state.clinicalProviderTags.map((clinicalProviderTag) => {
        const updated = updatedClinicalProviderTags.find((el) => el.id === clinicalProviderTag.id);
        return updated ? updated : clinicalProviderTag;
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
        return this.clinicalProviderTagService.validateClinicalProviderTagExcelData(excelData, vm.clinicalProviders,vm.tags);
      })
    )
  }


  readonly loadClinicalProviderTagEffect = this.effect<string>((clinicalProviderTagId$) =>
    clinicalProviderTagId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((clinicalProviderTagId) =>
        this.data.userClinicalProviderTag({ clinicalProviderTagId }).pipe(
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



  readonly loadClinicalProviderTagsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userClinicalProviderTags({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                clinicalProviderTags: res.data.items,
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

  readonly createClinicalProviderTagEffect = this.effect<UserCreateClinicalProviderTagInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.clinicalProviderTagService.createClinicalProviderTag({...input }).pipe(
          tapResponse(
            (clinicalProviderTag: ClinicalProviderTag) => {
              this.addNewClinicalProviderTag(clinicalProviderTag)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: clinicalProviderTag, loading: false, done: true }), 300);
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

    readonly updateClinicalProviderTagEffect = this.effect<UserUpdateClinicalProviderTagInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.clinicalProviderTagService.updateClinicalProviderTag(input, input.id).pipe(
              tapResponse(
                (clinicalProviderTag) => {
                  this.updateClinicalProviderTag(clinicalProviderTag)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: clinicalProviderTag, loading: false, done: true }), 300);
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
  
    readonly deleteClinicalProviderTagEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, clinicalProviderTag]) => {
          return this.data.userDeleteClinicalProviderTag({clinicalProviderTagId: clinicalProviderTag.id})
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

  readonly importExcelEffect = this.effect<UserUpdateClinicalProviderTagInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.clinicalProviderTagService.importClinicalProviderTags(data).pipe(
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

            this.addClinicalProviderTags(created);
            this.updateClinicalProviderTags(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
