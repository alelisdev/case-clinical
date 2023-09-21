
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { FirmStatus, UserCreateFirmStatusInput, UserUpdateFirmStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateFirmStatusExcelDataAction } from './actions/validate-firm-status-excel-data.action'
import { CreateFirmStatusAction } from './actions/create-firm-status.action'
import { UpdateFirmStatusesAction, UpdateFirmStatusAction } from './actions/update-firm-statuses.action'


@Injectable({providedIn: 'root'})
export class FirmStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.FirmStatusBusinessProviderService', logger, serviceContext)
  }

  createFirmStatus(input: UserCreateFirmStatusInput): Observable<FirmStatus> {
    const action = new CreateFirmStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateFirmStatus(input: UserUpdateFirmStatusInput, firmStatusId: string): Observable<FirmStatus> {
    const action = new UpdateFirmStatusAction(input, firmStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importFirmStatuses(firmStatuses: UserUpdateFirmStatusInput[]): Observable<UpdateResult> {
    const updateFirmStatusesAction = new UpdateFirmStatusesAction(firmStatuses);
    updateFirmStatusesAction.Do(this)
    return updateFirmStatusesAction.response;
  }

  validateFirmStatusExcelData(excelData: any[] ) {
    const validateFirmStatusExcelDataAction = new ValidateFirmStatusExcelDataAction(excelData );
    validateFirmStatusExcelDataAction.Do(this)
    return validateFirmStatusExcelDataAction.response;
  }
}

