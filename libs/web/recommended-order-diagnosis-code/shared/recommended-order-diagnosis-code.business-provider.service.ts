
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { RecommendedOrderDiagnosisCode, UserCreateRecommendedOrderDiagnosisCodeInput, UserUpdateRecommendedOrderDiagnosisCodeInput, UpdateResult, DiagnosisCode, RecommendedOrder } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateRecommendedOrderDiagnosisCodeExcelDataAction } from './actions/validate-recommended-order-diagnosis-code-excel-data.action'
import { CreateRecommendedOrderDiagnosisCodeAction } from './actions/create-recommended-order-diagnosis-code.action'
import { UpdateRecommendedOrderDiagnosisCodesAction, UpdateRecommendedOrderDiagnosisCodeAction } from './actions/update-recommended-order-diagnosis-codes.action'


@Injectable({providedIn: 'root'})
export class RecommendedOrderDiagnosisCodeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.RecommendedOrderDiagnosisCodeBusinessProviderService', logger, serviceContext)
  }

  createRecommendedOrderDiagnosisCode(input: UserCreateRecommendedOrderDiagnosisCodeInput): Observable<RecommendedOrderDiagnosisCode> {
    const action = new CreateRecommendedOrderDiagnosisCodeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateRecommendedOrderDiagnosisCode(input: UserUpdateRecommendedOrderDiagnosisCodeInput, recommendedOrderDiagnosisCodeId: string): Observable<RecommendedOrderDiagnosisCode> {
    const action = new UpdateRecommendedOrderDiagnosisCodeAction(input, recommendedOrderDiagnosisCodeId); 
    action.Do(this);
    return action.response;   
  }
  
  importRecommendedOrderDiagnosisCodes(recommendedOrderDiagnosisCodes: UserUpdateRecommendedOrderDiagnosisCodeInput[]): Observable<UpdateResult> {
    const updateRecommendedOrderDiagnosisCodesAction = new UpdateRecommendedOrderDiagnosisCodesAction(recommendedOrderDiagnosisCodes);
    updateRecommendedOrderDiagnosisCodesAction.Do(this)
    return updateRecommendedOrderDiagnosisCodesAction.response;
  }

  validateRecommendedOrderDiagnosisCodeExcelData(excelData: any[], diagnoses: DiagnosisCode[], recommendedOrders: RecommendedOrder[]) {
    const validateRecommendedOrderDiagnosisCodeExcelDataAction = new ValidateRecommendedOrderDiagnosisCodeExcelDataAction(excelData, diagnoses, recommendedOrders);
    validateRecommendedOrderDiagnosisCodeExcelDataAction.Do(this)
    return validateRecommendedOrderDiagnosisCodeExcelDataAction.response;
  }
}

