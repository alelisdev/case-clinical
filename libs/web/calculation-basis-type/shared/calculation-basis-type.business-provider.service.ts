
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CalculationBasisType, UserCreateCalculationBasisTypeInput, UserUpdateCalculationBasisTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCalculationBasisTypeExcelDataAction } from './actions/validate-calculation-basis-type-excel-data.action'
import { CreateCalculationBasisTypeAction } from './actions/create-calculation-basis-type.action'
import { UpdateCalculationBasisTypesAction, UpdateCalculationBasisTypeAction } from './actions/update-calculation-basis-types.action'


@Injectable({providedIn: 'root'})
export class CalculationBasisTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CalculationBasisTypeBusinessProviderService', logger, serviceContext)
  }

  createCalculationBasisType(input: UserCreateCalculationBasisTypeInput): Observable<CalculationBasisType> {
    const action = new CreateCalculationBasisTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCalculationBasisType(input: UserUpdateCalculationBasisTypeInput, calculationBasisTypeId: string): Observable<CalculationBasisType> {
    const action = new UpdateCalculationBasisTypeAction(input, calculationBasisTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importCalculationBasisTypes(calculationBasisTypes: UserUpdateCalculationBasisTypeInput[]): Observable<UpdateResult> {
    const updateCalculationBasisTypesAction = new UpdateCalculationBasisTypesAction(calculationBasisTypes);
    updateCalculationBasisTypesAction.Do(this)
    return updateCalculationBasisTypesAction.response;
  }

  validateCalculationBasisTypeExcelData(excelData: any[] ) {
    const validateCalculationBasisTypeExcelDataAction = new ValidateCalculationBasisTypeExcelDataAction(excelData );
    validateCalculationBasisTypeExcelDataAction.Do(this)
    return validateCalculationBasisTypeExcelDataAction.response;
  }
}

