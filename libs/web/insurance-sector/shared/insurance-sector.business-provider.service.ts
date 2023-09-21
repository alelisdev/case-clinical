
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { InsuranceSector, UserCreateInsuranceSectorInput, UserUpdateInsuranceSectorInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateInsuranceSectorExcelDataAction } from './actions/validate-insurance-sector-excel-data.action'
import { CreateInsuranceSectorAction } from './actions/create-insurance-sector.action'
import { UpdateInsuranceSectorsAction, UpdateInsuranceSectorAction } from './actions/update-insurance-sectors.action'


@Injectable({providedIn: 'root'})
export class InsuranceSectorBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InsuranceSectorBusinessProviderService', logger, serviceContext)
  }

  createInsuranceSector(input: UserCreateInsuranceSectorInput): Observable<InsuranceSector> {
    const action = new CreateInsuranceSectorAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInsuranceSector(input: UserUpdateInsuranceSectorInput, insuranceSectorId: string): Observable<InsuranceSector> {
    const action = new UpdateInsuranceSectorAction(input, insuranceSectorId); 
    action.Do(this);
    return action.response;   
  }
  
  importInsuranceSectors(insuranceSectors: UserUpdateInsuranceSectorInput[]): Observable<UpdateResult> {
    const updateInsuranceSectorsAction = new UpdateInsuranceSectorsAction(insuranceSectors);
    updateInsuranceSectorsAction.Do(this)
    return updateInsuranceSectorsAction.response;
  }

  validateInsuranceSectorExcelData(excelData: any[] ) {
    const validateInsuranceSectorExcelDataAction = new ValidateInsuranceSectorExcelDataAction(excelData );
    validateInsuranceSectorExcelDataAction.Do(this)
    return validateInsuranceSectorExcelDataAction.response;
  }
}

