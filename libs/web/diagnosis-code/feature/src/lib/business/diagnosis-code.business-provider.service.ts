
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateDiagnosisCodeAction} from './actions/create-diagnosis-code.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {DiagnosisCode, UserCreateDiagnosisCodeInput, UserUpdateDiagnosisCodeInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateDiagnosisCodesAction, UpdateDiagnosisCodeAction } from './actions/update-diagnosis-codes.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class DiagnosisCodeBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.DiagnosisCodeBusinessProviderService', logger, serviceContext)
  }

  createDiagnosisCode(input: UserCreateDiagnosisCodeInput): Observable<DiagnosisCode> {
    const action = new CreateDiagnosisCodeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateDiagnosisCode(input: UserUpdateDiagnosisCodeInput, diagnosisCodeId: string): Observable<DiagnosisCode> {
    const action = new UpdateDiagnosisCodeAction(input, diagnosisCodeId); 
    action.Do(this);
    return action.response;   
  }
  
  importDiagnosisCodes(diagnosisCodes: UserUpdateDiagnosisCodeInput[]): Observable<boolean> {
    const updateDiagnosisCodesAction = new UpdateDiagnosisCodesAction(diagnosisCodes);
    updateDiagnosisCodesAction.Do(this)
    return updateDiagnosisCodesAction.response;
  }
}

