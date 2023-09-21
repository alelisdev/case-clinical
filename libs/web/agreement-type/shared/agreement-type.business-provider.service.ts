
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AgreementType, UserCreateAgreementTypeInput, UserUpdateAgreementTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAgreementTypeExcelDataAction } from './actions/validate-agreement-type-excel-data.action'
import { CreateAgreementTypeAction } from './actions/create-agreement-type.action'
import { UpdateAgreementTypesAction, UpdateAgreementTypeAction } from './actions/update-agreement-types.action'


@Injectable({providedIn: 'root'})
export class AgreementTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AgreementTypeBusinessProviderService', logger, serviceContext)
  }

  createAgreementType(input: UserCreateAgreementTypeInput): Observable<AgreementType> {
    const action = new CreateAgreementTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAgreementType(input: UserUpdateAgreementTypeInput, agreementTypeId: string): Observable<AgreementType> {
    const action = new UpdateAgreementTypeAction(input, agreementTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAgreementTypes(agreementTypes: UserUpdateAgreementTypeInput[]): Observable<UpdateResult> {
    const updateAgreementTypesAction = new UpdateAgreementTypesAction(agreementTypes);
    updateAgreementTypesAction.Do(this)
    return updateAgreementTypesAction.response;
  }

  validateAgreementTypeExcelData(excelData: any[] ) {
    const validateAgreementTypeExcelDataAction = new ValidateAgreementTypeExcelDataAction(excelData );
    validateAgreementTypeExcelDataAction.Do(this)
    return validateAgreementTypeExcelDataAction.response;
  }
}

