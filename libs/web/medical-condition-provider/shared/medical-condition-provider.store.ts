
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { MedicalConditionProviderService } from './medical-condition-provider.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateMedicalConditionProviderInput, UserUpdateMedicalConditionProviderInput, WebCoreDataAccessService, CorePaging, MedicalConditionProvider, ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface MedicalConditionProviderFeatureState {
  errors?: any
  loading?: boolean
  item?: MedicalConditionProvider
  done: boolean,
  formName?: string
clinicalProviderId?: string,
  medicalConditionProviders: MedicalConditionProvider[]
 clinicalProviders?: ClinicalProvider[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebMedicalConditionProviderFeatureStore extends ComponentStore<MedicalConditionProviderFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly medicalConditionProviderService: MedicalConditionProviderService
) {
    super({ 
      loading: false,
      medicalConditionProviders: [],
      done: false,
      searchQuery: '',
      formName: undefined,
clinicalProviderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('medicalConditionProviderId')) {
      var medicalConditionProviderId = this.route.snapshot.paramMap.get('medicalConditionProviderId')
      this.setFormName('medicalConditionProvider_edit')
    } else {
      this.setFormName('medicalConditionProvider_create')
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
  readonly medicalConditionProviders$ = this.select((s) => s.medicalConditionProviders)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.medicalConditionProviders$,
this.clinicalProviders$,
    (errors, loading, item, formName, medicalConditionProviders, clinicalProviders ) => ({
    errors,
    loading,
    item,
    formName,
    medicalConditionProviders,

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

    

  readonly setItem = this.updater((state, item: MedicalConditionProvider) => ({...state, item}))

  addNewMedicalConditionProvider = this.updater((state, medicalConditionProvider: MedicalConditionProvider) => ({ ...state, medicalConditionProviders: [...state.medicalConditionProviders, medicalConditionProvider] }))

  updateMedicalConditionProvider = this.updater((state, medicalConditionProvider: MedicalConditionProvider) => {
    return {
      ...state,
      medicalConditionProviders: state.medicalConditionProviders.map((el) => {
        if (el.id === medicalConditionProvider.id) {
          return medicalConditionProvider
        } else {
          return el
        }
      }),
    }
  })

  addMedicalConditionProviders = this.updater((state, newMedicalConditionProviders: any[]) => ({...state, medicalConditionProviders: state.medicalConditionProviders.concat(newMedicalConditionProviders) }))
  updateMedicalConditionProviders = this.updater((state, updatedMedicalConditionProviders: any[]) => {
    return {
      ...state,
      medicalConditionProviders: state.medicalConditionProviders.map((medicalConditionProvider) => {
        const updated = updatedMedicalConditionProviders.find((el) => el.id === medicalConditionProvider.id);
        return updated ? updated : medicalConditionProvider;
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
        return this.medicalConditionProviderService.validateMedicalConditionProviderExcelData(excelData, vm.clinicalProviders);
      })
    )
  }


  readonly loadMedicalConditionProviderEffect = this.effect<string>((medicalConditionProviderId$) =>
    medicalConditionProviderId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((medicalConditionProviderId) =>
        this.data.userMedicalConditionProvider({ medicalConditionProviderId }).pipe(
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



  readonly loadMedicalConditionProvidersEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userMedicalConditionProviders({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                medicalConditionProviders: res.data.items,
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

  readonly createMedicalConditionProviderEffect = this.effect<UserCreateMedicalConditionProviderInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.medicalConditionProviderService.createMedicalConditionProvider({...input }).pipe(
          tapResponse(
            (medicalConditionProvider: MedicalConditionProvider) => {
              this.addNewMedicalConditionProvider(medicalConditionProvider)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: medicalConditionProvider, loading: false, done: true }), 300);
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

    readonly updateMedicalConditionProviderEffect = this.effect<UserUpdateMedicalConditionProviderInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.medicalConditionProviderService.updateMedicalConditionProvider(input, input.id).pipe(
              tapResponse(
                (medicalConditionProvider) => {
                  this.updateMedicalConditionProvider(medicalConditionProvider)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: medicalConditionProvider, loading: false, done: true }), 300);
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
  
    readonly deleteMedicalConditionProviderEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, medicalConditionProvider]) => {
          return this.data.userDeleteMedicalConditionProvider({medicalConditionProviderId: medicalConditionProvider.id})
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

  readonly importExcelEffect = this.effect<UserUpdateMedicalConditionProviderInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.medicalConditionProviderService.importMedicalConditionProviders(data).pipe(
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

            this.addMedicalConditionProviders(created);
            this.updateMedicalConditionProviders(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
