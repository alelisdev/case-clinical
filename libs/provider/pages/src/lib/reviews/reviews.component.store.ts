import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { getDurationInDaysFromDate } from '@case-clinical/shared/util/helpers';
import { Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { WebReviewFeatureStore } from '@case-clinical/web/review/shared';


export interface ReviewsState extends ProviderBaseState {
  loading: boolean,
  query: string,
}

@Injectable()
export class ReviewsStore extends ProviderBaseStore<ReviewsState> {
  constructor(
    private data: WebCoreDataAccessService,
    private reviewStore:WebReviewFeatureStore,
    injector: Injector,
  ) {
    super(injector);
    this.reviewStore.loadReviewsEffect();
  }

  reviewsAll$ = this.reviewStore.reviews$;

  loading$ = this.select(s => s.loading)

  reviews$ = this.reviewsAll$.pipe(switchMap(reviewsAll => {
    return of(reviewsAll.map((reviewItem)=>{
      const passedDays = getDurationInDaysFromDate(reviewItem.reivewDateAndTime);
      const formattedChildrenReviews = reviewItem.childrenReviews?.map((childReview)=>{
        const passedDays = getDurationInDaysFromDate(childReview.reivewDateAndTime);
        return {
          ...childReview,
          passedDays:passedDays
        }
      })
      return {
        ...reviewItem,
        passedDays:passedDays,
        childrenReviews:formattedChildrenReviews
      }
    }))
    
  }))

  loadReviewsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedProviderId$),
    switchMap(([, selectedProviderId]) => {
      if (selectedProviderId === 'all') return of(false);
      this.reviewStore.setClinicalProviderId(selectedProviderId as string);
      this.reviewStore.loadReviewsEffect()
      return of(true);
    }
    )
  ))

  vm$ = this.select(
    this.loading$,
    this.user$,
    this.vendor$,
    this.reviews$,
    (
      loading,
      user,
      vendor,
      reviews
    ) => ({
        loading,
        user,
        vendor,
        reviews
    })
  )


  override getInitialState(): ReviewsState {
    return {
      query: "",
      loading: false,
    }
  }

  override providerIdDidChange(providerId: string) {
    this.loadReviewsEffect();
  }

}
