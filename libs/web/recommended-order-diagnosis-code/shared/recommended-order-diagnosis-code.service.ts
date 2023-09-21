
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { RecommendedOrderDiagnosisCode, UserCreateRecommendedOrderDiagnosisCodeInput, UserUpdateRecommendedOrderDiagnosisCodeInput, UpdateResult, DiagnosisCode, RecommendedOrder } from "@case-clinical/shared/util/sdk";
import { RecommendedOrderDiagnosisCodeBusinessProviderService } from "./recommended-order-diagnosis-code.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class RecommendedOrderDiagnosisCodeService extends ServiceBase {
 constructor(
  @Inject(RecommendedOrderDiagnosisCodeBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: RecommendedOrderDiagnosisCodeBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("RecommendedOrderDiagnosisCodeService", loggingService, serviceContext);
 }

    createRecommendedOrderDiagnosisCode(input: UserCreateRecommendedOrderDiagnosisCodeInput): Observable<RecommendedOrderDiagnosisCode> {
        return this.businessProvider.createRecommendedOrderDiagnosisCode(input);
    }

    updateRecommendedOrderDiagnosisCode(input: UserUpdateRecommendedOrderDiagnosisCodeInput, recommendedOrderDiagnosisCodeId: string): Observable<RecommendedOrderDiagnosisCode> {
        return this.businessProvider.updateRecommendedOrderDiagnosisCode(input, recommendedOrderDiagnosisCodeId);
    }

    importRecommendedOrderDiagnosisCodes(recommendedOrderDiagnosisCodes: UserUpdateRecommendedOrderDiagnosisCodeInput[]): Observable<UpdateResult> {
        return this.businessProvider.importRecommendedOrderDiagnosisCodes(recommendedOrderDiagnosisCodes);
    }

    validateRecommendedOrderDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], recommendedOrders: RecommendedOrder[]) {
      return this.businessProvider.validateRecommendedOrderDiagnosisCodeExcelData(excelData, diagnoses, recommendedOrders);
    }
}

