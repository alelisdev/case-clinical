
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClinicalProviderSpecialtyService } from './clinical-provider-specialty.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClinicalProviderSpecialtyInput, UserUpdateClinicalProviderSpecialtyInput, WebCoreDataAccessService, CorePaging, ClinicalProviderSpecialty, ClinicalProvider,Specialty } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ClinicalProviderSpecialtyFeatureState {
  errors?: any
  loading?: boolean
  item?: ClinicalProviderSpecialty
  done: boolean,
  formName?: string
clinicalProviderId?: string,specialtyId?: string,
  clinicalProviderSpecialties: ClinicalProviderSpecialty[]
 clinicalProviders?: ClinicalProvider[],
 specialties?: Specialty[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebClinicalProviderSpecialtyFeatureStore extends ComponentStore<ClinicalProviderSpecialtyFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly clinicalProviderSpecialtyService: ClinicalProviderSpecialtyService
) {
    super({ 
      loading: false,
      clinicalProviderSpecialties: [],
      done: false,
      searchQuery: '',
      formName: undefined,
clinicalProviderId: undefined,
specialtyId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('clinicalProviderSpecialtyId')) {
      var clinicalProviderSpecialtyId = this.route.snapshot.paramMap.get('clinicalProviderSpecialtyId')
      this.setFormName('clinicalProviderSpecialty_edit')
    } else {
      this.setFormName('clinicalProviderSpecialty_create')
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId")
      this.setClinicalProviderId(clinicalProviderId)
    }


    if(this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId")
      this.setSpecialtyId(specialtyId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly clinicalProviderSpecialties$ = this.select((s) => s.clinicalProviderSpecialties)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly specialties$ = this.select((s) => s.specialties || [])

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

readonly specialtyId$ = this.select((s) => s.specialtyId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderSpecialties$,
this.clinicalProviders$,this.specialties$,
    (errors, loading, item, formName, clinicalProviderSpecialties, clinicalProviders,specialties ) => ({
    errors,
    loading,
    item,
    formName,
    clinicalProviderSpecialties,

            clinicalProviders,specialties
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.clinicalProviderId$,
this.specialtyId$, this.searchQuery$, (paging, clinicalProviderId,
specialtyId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    clinicalProviderId: clinicalProviderId,specialtyId: specialtyId,
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


            readonly setSpecialtyId = this.updater((state, specialtyId: string) => ({
                ...state,
    specialtyId,
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


  readonly filterSpecialties = (term) => 
        this.data.userSelectSpecialties({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let specialties = res.data.items;
              this.patchState({specialties})
              return specialties
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


  readonly addSpecialty = this.updater((state, specialty: Specialty) => ({
    ...state, specialties: state.specialties.concat(specialty)
  }))

    

  readonly setItem = this.updater((state, item: ClinicalProviderSpecialty) => ({...state, item}))

  addNewClinicalProviderSpecialty = this.updater((state, clinicalProviderSpecialty: ClinicalProviderSpecialty) => ({ ...state, clinicalProviderSpecialties: [...state.clinicalProviderSpecialties, clinicalProviderSpecialty] }))

  updateClinicalProviderSpecialty = this.updater((state, clinicalProviderSpecialty: ClinicalProviderSpecialty) => {
    return {
      ...state,
      clinicalProviderSpecialties: state.clinicalProviderSpecialties.map((el) => {
        if (el.id === clinicalProviderSpecialty.id) {
          return clinicalProviderSpecialty
        } else {
          return el
        }
      }),
    }
  })

  addClinicalProviderSpecialties = this.updater((state, newClinicalProviderSpecialties: any[]) => ({...state, clinicalProviderSpecialties: state.clinicalProviderSpecialties.concat(newClinicalProviderSpecialties) }))
  updateClinicalProviderSpecialties = this.updater((state, updatedClinicalProviderSpecialties: any[]) => {
    return {
      ...state,
      clinicalProviderSpecialties: state.clinicalProviderSpecialties.map((clinicalProviderSpecialty) => {
        const updated = updatedClinicalProviderSpecialties.find((el) => el.id === clinicalProviderSpecialty.id);
        return updated ? updated : clinicalProviderSpecialty;
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
        return this.clinicalProviderSpecialtyService.validateClinicalProviderSpecialtyExcelData(excelData, vm.clinicalProviders,vm.specialties);
      })
    )
  }


  readonly loadClinicalProviderSpecialtyEffect = this.effect<string>((clinicalProviderSpecialtyId$) =>
    clinicalProviderSpecialtyId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((clinicalProviderSpecialtyId) =>
        this.data.userClinicalProviderSpecialty({ clinicalProviderSpecialtyId }).pipe(
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



  readonly loadClinicalProviderSpecialtiesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userClinicalProviderSpecialties({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                clinicalProviderSpecialties: res.data.items,
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

  readonly createClinicalProviderSpecialtyEffect = this.effect<UserCreateClinicalProviderSpecialtyInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.clinicalProviderSpecialtyService.createClinicalProviderSpecialty({...input }).pipe(
          tapResponse(
            (clinicalProviderSpecialty: ClinicalProviderSpecialty) => {
              this.addNewClinicalProviderSpecialty(clinicalProviderSpecialty)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: clinicalProviderSpecialty, loading: false, done: true }), 300);
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

    readonly updateClinicalProviderSpecialtyEffect = this.effect<UserUpdateClinicalProviderSpecialtyInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.clinicalProviderSpecialtyService.updateClinicalProviderSpecialty(input, input.id).pipe(
              tapResponse(
                (clinicalProviderSpecialty) => {
                  this.updateClinicalProviderSpecialty(clinicalProviderSpecialty)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: clinicalProviderSpecialty, loading: false, done: true }), 300);
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
  
    readonly deleteClinicalProviderSpecialtyEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, clinicalProviderSpecialty]) => {
          return this.data.userDeleteClinicalProviderSpecialty({clinicalProviderSpecialtyId: clinicalProviderSpecialty.id})
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

  readonly importExcelEffect = this.effect<UserUpdateClinicalProviderSpecialtyInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.clinicalProviderSpecialtyService.importClinicalProviderSpecialties(data).pipe(
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

            this.addClinicalProviderSpecialties(created);
            this.updateClinicalProviderSpecialties(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
