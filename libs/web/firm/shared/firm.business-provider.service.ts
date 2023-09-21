
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Firm, UserCreateFirmInput, UserUpdateFirmInput, UpdateResult, FirmStatus, Document } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateFirmExcelDataAction } from './actions/validate-firm-excel-data.action'
import { CreateFirmAction } from './actions/create-firm.action'
import { UpdateFirmsAction, UpdateFirmAction } from './actions/update-firms.action'


@Injectable({providedIn: 'root'})
export class FirmBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.FirmBusinessProviderService', logger, serviceContext)
  }

  createFirm(input: UserCreateFirmInput): Observable<Firm> {
    const action = new CreateFirmAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateFirm(input: UserUpdateFirmInput, firmId: string): Observable<Firm> {
    const action = new UpdateFirmAction(input, firmId); 
    action.Do(this);
    return action.response;   
  }
  
  importFirms(firms: UserUpdateFirmInput[]): Observable<UpdateResult> {
    const updateFirmsAction = new UpdateFirmsAction(firms);
    updateFirmsAction.Do(this)
    return updateFirmsAction.response;
  }

  validateFirmExcelData(excelData: any[], firmStatuses: FirmStatus[], eulas: Document[]) {
    const validateFirmExcelDataAction = new ValidateFirmExcelDataAction(excelData, firmStatuses, eulas);
    validateFirmExcelDataAction.Do(this)
    return validateFirmExcelDataAction.response;
  }
}

