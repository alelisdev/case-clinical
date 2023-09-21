
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Review, UserCreateReviewInput, UserUpdateReviewInput, UpdateResult, ClinicalProvider } from "@case-clinical/shared/util/sdk";
import { ReviewBusinessProviderService } from "./review.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ReviewService extends ServiceBase {
 constructor(
  @Inject(ReviewBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ReviewBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ReviewService", loggingService, serviceContext);
 }

    createReview(input: UserCreateReviewInput): Observable<Review> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createReview(filteredObj);
    }

    updateReview(input: UserUpdateReviewInput, reviewId: string): Observable<Review> {
        return this.businessProvider.updateReview(input, reviewId);
    }

    importReviews(reviews: UserUpdateReviewInput[]): Observable<UpdateResult> {
        return this.businessProvider.importReviews(reviews);
    }

    validateReviewExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
      return this.businessProvider.validateReviewExcelData(excelData, clinicalProviders);
    }
}

