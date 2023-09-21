
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Review, UserCreateReviewInput, UserUpdateReviewInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateReviewExcelDataAction } from './actions/validate-review-excel-data.action'
import { CreateReviewAction } from './actions/create-review.action'
import { UpdateReviewsAction, UpdateReviewAction } from './actions/update-reviews.action'


@Injectable({providedIn: 'root'})
export class ReviewBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ReviewBusinessProviderService', logger, serviceContext)
  }

  createReview(input: UserCreateReviewInput): Observable<Review> {
    const action = new CreateReviewAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateReview(input: UserUpdateReviewInput, reviewId: string): Observable<Review> {
    const action = new UpdateReviewAction(input, reviewId); 
    action.Do(this);
    return action.response;   
  }
  
  importReviews(reviews: UserUpdateReviewInput[]): Observable<UpdateResult> {
    const updateReviewsAction = new UpdateReviewsAction(reviews);
    updateReviewsAction.Do(this)
    return updateReviewsAction.response;
  }

  validateReviewExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validateReviewExcelDataAction = new ValidateReviewExcelDataAction(excelData, clinicalProviders);
    validateReviewExcelDataAction.Do(this)
    return validateReviewExcelDataAction.response;
  }
}

