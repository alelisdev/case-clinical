
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { InsuranceType, UserCreateInsuranceTypeInput, UserUpdateInsuranceTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateInsuranceTypeExcelDataAction } from './actions/validate-insurance-type-excel-data.action'
import { CreateInsuranceTypeAction } from './actions/create-insurance-type.action'
import { UpdateInsuranceTypesAction, UpdateInsuranceTypeAction } from './actions/update-insurance-types.action'


@Injectable({providedIn: 'root'})
export class InsuranceTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InsuranceTypeBusinessProviderService', logger, serviceContext)
  }

  createInsuranceType(input: UserCreateInsuranceTypeInput): Observable<InsuranceType> {
    const action = new CreateInsuranceTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInsuranceType(input: UserUpdateInsuranceTypeInput, insuranceTypeId: string): Observable<InsuranceType> {
    const action = new UpdateInsuranceTypeAction(input, insuranceTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importInsuranceTypes(insuranceTypes: UserUpdateInsuranceTypeInput[]): Observable<UpdateResult> {
    const updateInsuranceTypesAction = new UpdateInsuranceTypesAction(insuranceTypes);
    updateInsuranceTypesAction.Do(this)
    return updateInsuranceTypesAction.response;
  }

  validateInsuranceTypeExcelData(excelData: any[] ) {
    const validateInsuranceTypeExcelDataAction = new ValidateInsuranceTypeExcelDataAction(excelData );
    validateInsuranceTypeExcelDataAction.Do(this)
    return validateInsuranceTypeExcelDataAction.response;
  }
}

