
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RecommendedOrder, UserCreateRecommendedOrderInput, UserUpdateRecommendedOrderInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { RecommendedOrderBusinessProviderService } from "./recommended-order.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class RecommendedOrderService extends ServiceBase {
 constructor(
  @Inject(RecommendedOrderBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RecommendedOrderBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RecommendedOrderService", loggingService, serviceContext);
 }

    createRecommendedOrder(input: UserCreateRecommendedOrderInput): Observable<RecommendedOrder> {
        return this.businessProvider.createRecommendedOrder(input);
    }

    updateRecommendedOrder(input: UserUpdateRecommendedOrderInput, recommendedOrderId: string): Observable<RecommendedOrder> {
        return this.businessProvider.updateRecommendedOrder(input, recommendedOrderId);
    }

    importRecommendedOrders(recommendedOrders: UserUpdateRecommendedOrderInput[]): Observable<UpdateResult> {
        return this.businessProvider.importRecommendedOrders(recommendedOrders);
    }

    validateRecommendedOrderExcelData(excelData: any[] ) {
      return this.businessProvider.validateRecommendedOrderExcelData(excelData );
    }
}

