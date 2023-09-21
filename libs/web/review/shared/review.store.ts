
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ReviewService } from './review.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateReviewInput, UserUpdateReviewInput, WebCoreDataAccessService, CorePaging, Review, ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ReviewFeatureState {
  errors?: any
  loading?: boolean
  item?: Review
  done: boolean,
  formName?: string
clinicalProviderId?: string,
  reviews: Review[]
 clinicalProviders?: ClinicalProvider[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebReviewFeatureStore extends ComponentStore<ReviewFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly reviewService: ReviewService
) {
    super({ 
      loading: false,
      reviews: [],
      done: false,
      searchQuery: '',
      formName: undefined,
clinicalProviderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('reviewId')) {
      var reviewId = this.route.snapshot.paramMap.get('reviewId')
      this.setFormName('review_edit')
    } else {
      this.setFormName('review_create')
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
  readonly reviews$ = this.select((s) => s.reviews)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.reviews$,
this.clinicalProviders$,
    (errors, loading, item, formName, reviews, clinicalProviders ) => ({
    errors,
    loading,
    item,
    formName,
    reviews,

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

    

  readonly setItem = this.updater((state, item: Review) => ({...state, item}))

  addNewReview = this.updater((state, chreview: Review) =>{
    if(chreview.parentId){
      let newReviews = {}; 
      state.reviews.forEach((review) => {
        if(review.id == chreview.parentId){
          review.childrenReviews.push(review);
          newReviews = review;
        }
      });

      return { ...state, reviews: [...state.reviews, newReviews] };
    }
    else return { ...state, reviews: [...state.reviews, chreview] };
  });

  updateReview = this.updater((state, review: Review) => {
    return {
      ...state,
      reviews: state.reviews.map((el) => {
        if (el.id === review.id) {
          return review
        } else {
          return el
        }
      }),
    }
  })

  addReviews = this.updater((state, newReviews: any[]) => ({...state, reviews: state.reviews.concat(newReviews) }))
  updateReviews = this.updater((state, updatedReviews: any[]) => {
    return {
      ...state,
      reviews: state.reviews.map((review) => {
        const updated = updatedReviews.find((el) => el.id === review.id);
        return updated ? updated : review;
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
        return this.reviewService.validateReviewExcelData(excelData, vm.clinicalProviders);
      })
    )
  }


  readonly loadReviewEffect = this.effect<string>((reviewId$) =>
    reviewId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((reviewId) =>
        this.data.userReview({ reviewId }).pipe(
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



  readonly loadReviewsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userReviews({input}).pipe(
          tapResponse(
            (res) =>
              {
                console.log('userReviews', res.data.items)
                return this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                reviews: res.data.items,
                errors: res.errors,
                loading: false,
              })},
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

  readonly createReviewEffect = this.effect<UserCreateReviewInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.reviewService.createReview({...input }).pipe(
          tapResponse(
            (review: Review) => {
              this.addNewReview(review)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: review, loading: false, done: true }), 300);
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

    readonly updateReviewEffect = this.effect<UserUpdateReviewInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.reviewService.updateReview(input, input.id).pipe(
              tapResponse(
                (review) => {
                  this.updateReview(review)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: review, loading: false, done: true }), 300);
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
  
    readonly deleteReviewEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, review]) => {
          return this.data.userDeleteReview({reviewId: review.id})
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

  readonly importExcelEffect = this.effect<UserUpdateReviewInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.reviewService.importReviews(data).pipe(
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

            this.addReviews(created);
            this.updateReviews(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
