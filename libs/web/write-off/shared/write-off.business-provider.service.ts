
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { WriteOff, UserCreateWriteOffInput, UserUpdateWriteOffInput, UpdateResult, CaseAccount, WriteOffStatus } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateWriteOffExcelDataAction } from './actions/validate-write-off-excel-data.action'
import { CreateWriteOffAction } from './actions/create-write-off.action'
import { UpdateWriteOffsAction, UpdateWriteOffAction } from './actions/update-write-offs.action'


@Injectable({providedIn: 'root'})
export class WriteOffBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.WriteOffBusinessProviderService', logger, serviceContext)
  }

  createWriteOff(input: UserCreateWriteOffInput): Observable<WriteOff> {
    const action = new CreateWriteOffAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateWriteOff(input: UserUpdateWriteOffInput, writeOffId: string): Observable<WriteOff> {
    const action = new UpdateWriteOffAction(input, writeOffId); 
    action.Do(this);
    return action.response;   
  }
  
  importWriteOffs(writeOffs: UserUpdateWriteOffInput[]): Observable<UpdateResult> {
    const updateWriteOffsAction = new UpdateWriteOffsAction(writeOffs);
    updateWriteOffsAction.Do(this)
    return updateWriteOffsAction.response;
  }

  validateWriteOffExcelData(excelData: any[], accounts: CaseAccount[], writeOffStatuses: WriteOffStatus[]) {
    const validateWriteOffExcelDataAction = new ValidateWriteOffExcelDataAction(excelData, accounts, writeOffStatuses);
    validateWriteOffExcelDataAction.Do(this)
    return validateWriteOffExcelDataAction.response;
  }
}

