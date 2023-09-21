
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RecommendedOrderAuthorization, UserCreateRecommendedOrderAuthorizationInput, UserUpdateRecommendedOrderAuthorizationInput, UpdateResult, Authorization, RecommendedOrder } from "@case-clinical/shared/util/sdk";
import { RecommendedOrderAuthorizationBusinessProviderService } from "./recommended-order-authorization.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class RecommendedOrderAuthorizationService extends ServiceBase {
 constructor(
  @Inject(RecommendedOrderAuthorizationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RecommendedOrderAuthorizationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RecommendedOrderAuthorizationService", loggingService, serviceContext);
 }

    createRecommendedOrderAuthorization(input: UserCreateRecommendedOrderAuthorizationInput): Observable<RecommendedOrderAuthorization> {
        return this.businessProvider.createRecommendedOrderAuthorization(input);
    }

    updateRecommendedOrderAuthorization(input: UserUpdateRecommendedOrderAuthorizationInput, recommendedOrderAuthorizationId: string): Observable<RecommendedOrderAuthorization> {
        return this.businessProvider.updateRecommendedOrderAuthorization(input, recommendedOrderAuthorizationId);
    }

    importRecommendedOrderAuthorizations(recommendedOrderAuthorizations: UserUpdateRecommendedOrderAuthorizationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importRecommendedOrderAuthorizations(recommendedOrderAuthorizations);
    }

    validateRecommendedOrderAuthorizationExcelData(excelData: any[], authorizations: Authorization[], recommendedOrders: RecommendedOrder[]) {
      return this.businessProvider.validateRecommendedOrderAuthorizationExcelData(excelData, authorizations, recommendedOrders);
    }
}

