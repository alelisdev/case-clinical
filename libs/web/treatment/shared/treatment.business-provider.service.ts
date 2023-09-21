
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Treatment, UserCreateTreatmentInput, UserUpdateTreatmentInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateTreatmentExcelDataAction } from './actions/validate-treatment-excel-data.action'
import { CreateTreatmentAction } from './actions/create-treatment.action'
import { UpdateTreatmentsAction, UpdateTreatmentAction } from './actions/update-treatments.action'


@Injectable({providedIn: 'root'})
export class TreatmentBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TreatmentBusinessProviderService', logger, serviceContext)
  }

  createTreatment(input: UserCreateTreatmentInput): Observable<Treatment> {
    const action = new CreateTreatmentAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTreatment(input: UserUpdateTreatmentInput, treatmentId: string): Observable<Treatment> {
    const action = new UpdateTreatmentAction(input, treatmentId); 
    action.Do(this);
    return action.response;   
  }
  
  importTreatments(treatments: UserUpdateTreatmentInput[]): Observable<UpdateResult> {
    const updateTreatmentsAction = new UpdateTreatmentsAction(treatments);
    updateTreatmentsAction.Do(this)
    return updateTreatmentsAction.response;
  }

  validateTreatmentExcelData(excelData: any[] ) {
    const validateTreatmentExcelDataAction = new ValidateTreatmentExcelDataAction(excelData );
    validateTreatmentExcelDataAction.Do(this)
    return validateTreatmentExcelDataAction.response;
  }
}

