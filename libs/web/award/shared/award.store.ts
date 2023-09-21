
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AwardService } from './award.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAwardInput, UserUpdateAwardInput, WebCoreDataAccessService, CorePaging, Award, ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AwardFeatureState {
  errors?: any
  loading?: boolean
  item?: Award
  done: boolean,
  formName?: string
clinicalProviderId?: string,
  awards: Award[]
 clinicalProviders?: ClinicalProvider[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAwardFeatureStore extends ComponentStore<AwardFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly awardService: AwardService
) {
    super({ 
      loading: false,
      awards: [],
      done: false,
      searchQuery: '',
      formName: undefined,
clinicalProviderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('awardId')) {
      var awardId = this.route.snapshot.paramMap.get('awardId')
      this.setFormName('award_edit')
    } else {
      this.setFormName('award_create')
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
  readonly awards$ = this.select((s) => s.awards)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.awards$,
this.clinicalProviders$,
    (errors, loading, item, formName, awards, clinicalProviders ) => ({
    errors,
    loading,
    item,
    formName,
    awards,

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

    

  readonly setItem = this.updater((state, item: Award) => ({...state, item}))

  addNewAward = this.updater((state, award: Award) => ({ ...state, awards: [...state.awards, award] }))

  updateAward = this.updater((state, award: Award) => {
    return {
      ...state,
      awards: state.awards.map((el) => {
        if (el.id === award.id) {
          return award
        } else {
          return el
        }
      }),
    }
  })

  addAwards = this.updater((state, newAwards: any[]) => ({...state, awards: state.awards.concat(newAwards) }))
  updateAwards = this.updater((state, updatedAwards: any[]) => {
    return {
      ...state,
      awards: state.awards.map((award) => {
        const updated = updatedAwards.find((el) => el.id === award.id);
        return updated ? updated : award;
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
        return this.awardService.validateAwardExcelData(excelData, vm.clinicalProviders);
      })
    )
  }


  readonly loadAwardEffect = this.effect<string>((awardId$) =>
    awardId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((awardId) =>
        this.data.userAward({ awardId }).pipe(
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



  readonly loadAwardsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAwards({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                awards: res.data.items,
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

  readonly createAwardEffect = this.effect<UserCreateAwardInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.awardService.createAward({...input }).pipe(
          tapResponse(
            (award: Award) => {
              this.addNewAward(award)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: award, loading: false, done: true }), 300);
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

    readonly updateAwardEffect = this.effect<UserUpdateAwardInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.awardService.updateAward(input, input.id).pipe(
              tapResponse(
                (award) => {
                  this.updateAward(award)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: award, loading: false, done: true }), 300);
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
  
    readonly deleteAwardEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, award]) => {
          return this.data.userDeleteAward({awardId: award.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAwardInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.awardService.importAwards(data).pipe(
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

            this.addAwards(created);
            this.updateAwards(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
