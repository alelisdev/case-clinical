
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { FavoriteProviderService } from './favorite-provider.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateFavoriteProviderInput, UserUpdateFavoriteProviderInput, WebCoreDataAccessService, CorePaging, FavoriteProvider, ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface FavoriteProviderFeatureState {
  errors?: any
  loading?: boolean
  item?: FavoriteProvider
  done: boolean,
  formName?: string
clinicalProviderId?: string,
  favoriteProviders: FavoriteProvider[]
 clinicalProviders?: ClinicalProvider[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebFavoriteProviderFeatureStore extends ComponentStore<FavoriteProviderFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly favoriteProviderService: FavoriteProviderService
) {
    super({
      loading: false,
      favoriteProviders: [],
      done: false,
      searchQuery: '',
      formName: undefined,
clinicalProviderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('favoriteProviderId')) {
      var favoriteProviderId = this.route.snapshot.paramMap.get('favoriteProviderId')
      this.setFormName('favoriteProvider_edit')
    } else {
      this.setFormName('favoriteProvider_create')
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId")
      this.setClinicalProviderId(clinicalProviderId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly favoriteProviders$ = this.select((s) => s.favoriteProviders)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.favoriteProviders$,
this.clinicalProviders$,
    (errors, loading, item, formName, favoriteProviders, clinicalProviders ) => ({
    errors,
    loading,
    item,
    formName,
    favoriteProviders,

            clinicalProviders
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.clinicalProviderId$, this.searchQuery$, (paging, clinicalProviderId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    clinicalProviderId: clinicalProviderId,
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



  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))



  readonly setItem = this.updater((state, item: FavoriteProvider) => ({...state, item}))

  addNewFavoriteProvider = this.updater((state, favoriteProvider: FavoriteProvider) => ({ ...state, favoriteProviders: [...state.favoriteProviders, favoriteProvider] }))

  updateFavoriteProvider = this.updater((state, favoriteProvider: FavoriteProvider) => {
    return {
      ...state,
      favoriteProviders: state.favoriteProviders.map((el) => {
        if (el.id === favoriteProvider.id) {
          return favoriteProvider
        } else {
          return el
        }
      }),
    }
  })

  addFavoriteProviders = this.updater((state, newFavoriteProviders: any[]) => ({...state, favoriteProviders: state.favoriteProviders.concat(newFavoriteProviders) }))
  updateFavoriteProviders = this.updater((state, updatedFavoriteProviders: any[]) => {
    return {
      ...state,
      favoriteProviders: state.favoriteProviders.map((favoriteProvider) => {
        const updated = updatedFavoriteProviders.find((el) => el.id === favoriteProvider.id);
        return updated ? updated : favoriteProvider;
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
        return this.favoriteProviderService.validateFavoriteProviderExcelData(excelData, vm.clinicalProviders);
      })
    )
  }


  readonly loadFavoriteProviderEffect = this.effect<string>((favoriteProviderId$) =>
    favoriteProviderId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((favoriteProviderId) =>
        this.data.userFavoriteProvider({ favoriteProviderId }).pipe(
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



  readonly loadFavoriteProvidersEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userFavoriteProviders({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                favoriteProviders: res.data.items,
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

  readonly createFavoriteProviderEffect = this.effect<UserCreateFavoriteProviderInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.favoriteProviderService.createFavoriteProvider({...input }).pipe(
          tapResponse(
            (favoriteProvider: FavoriteProvider) => {
              this.addNewFavoriteProvider(favoriteProvider)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: favoriteProvider, loading: false, done: true }), 300);
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

    readonly updateFavoriteProviderEffect = this.effect<UserUpdateFavoriteProviderInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.favoriteProviderService.updateFavoriteProvider(input, input.id).pipe(
              tapResponse(
                (favoriteProvider) => {
                  this.updateFavoriteProvider(favoriteProvider)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: favoriteProvider, loading: false, done: true }), 300);
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

      readonly deleteFavoriteProviderEffect = this.effect(
        ($) =>
          $.pipe(
            tap(() => this.patchState({ loading: true })),
            withLatestFrom(this.item$),
            switchMap(([_, favoriteProvider]) => {
              return this.data.userDeleteFavoriteProvider({favoriteProviderId: favoriteProvider.id})
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

      readonly deleteSpecificFavoriteProviderEffect = this.effect<FavoriteProvider>(
        (favoriteProvider$) =>
          favoriteProvider$.pipe(
            switchMap((favoriteProvider) =>
              this.data
                .userDeleteFavoriteProvider({
                    favoriteProviderId: favoriteProvider.id,
                })
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
                ),
            ),
          ),
      )

  readonly importExcelEffect = this.effect<UserUpdateFavoriteProviderInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.favoriteProviderService.importFavoriteProviders(data).pipe(
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

            this.addFavoriteProviders(created);
            this.updateFavoriteProviders(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
