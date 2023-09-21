
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { MedicalConditionProvider, UserCreateMedicalConditionProviderInput, UserUpdateMedicalConditionProviderInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateMedicalConditionProviderExcelDataAction } from './actions/validate-medical-condition-provider-excel-data.action'
import { CreateMedicalConditionProviderAction } from './actions/create-medical-condition-provider.action'
import { UpdateMedicalConditionProvidersAction, UpdateMedicalConditionProviderAction } from './actions/update-medical-condition-providers.action'


@Injectable({providedIn: 'root'})
export class MedicalConditionProviderBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.MedicalConditionProviderBusinessProviderService', logger, serviceContext)
  }

  createMedicalConditionProvider(input: UserCreateMedicalConditionProviderInput): Observable<MedicalConditionProvider> {
    const action = new CreateMedicalConditionProviderAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateMedicalConditionProvider(input: UserUpdateMedicalConditionProviderInput, medicalConditionProviderId: string): Observable<MedicalConditionProvider> {
    const action = new UpdateMedicalConditionProviderAction(input, medicalConditionProviderId); 
    action.Do(this);
    return action.response;   
  }
  
  importMedicalConditionProviders(medicalConditionProviders: UserUpdateMedicalConditionProviderInput[]): Observable<UpdateResult> {
    const updateMedicalConditionProvidersAction = new UpdateMedicalConditionProvidersAction(medicalConditionProviders);
    updateMedicalConditionProvidersAction.Do(this)
    return updateMedicalConditionProvidersAction.response;
  }

  validateMedicalConditionProviderExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validateMedicalConditionProviderExcelDataAction = new ValidateMedicalConditionProviderExcelDataAction(excelData, clinicalProviders);
    validateMedicalConditionProviderExcelDataAction.Do(this)
    return validateMedicalConditionProviderExcelDataAction.response;
  }
}

