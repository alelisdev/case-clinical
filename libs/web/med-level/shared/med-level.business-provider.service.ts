
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { MedLevel, UserCreateMedLevelInput, UserUpdateMedLevelInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateMedLevelExcelDataAction } from './actions/validate-med-level-excel-data.action'
import { CreateMedLevelAction } from './actions/create-med-level.action'
import { UpdateMedLevelsAction, UpdateMedLevelAction } from './actions/update-med-levels.action'


@Injectable({providedIn: 'root'})
export class MedLevelBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.MedLevelBusinessProviderService', logger, serviceContext)
  }

  createMedLevel(input: UserCreateMedLevelInput): Observable<MedLevel> {
    const action = new CreateMedLevelAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateMedLevel(input: UserUpdateMedLevelInput, medLevelId: string): Observable<MedLevel> {
    const action = new UpdateMedLevelAction(input, medLevelId); 
    action.Do(this);
    return action.response;   
  }
  
  importMedLevels(medLevels: UserUpdateMedLevelInput[]): Observable<UpdateResult> {
    const updateMedLevelsAction = new UpdateMedLevelsAction(medLevels);
    updateMedLevelsAction.Do(this)
    return updateMedLevelsAction.response;
  }

  validateMedLevelExcelData(excelData: any[] ) {
    const validateMedLevelExcelDataAction = new ValidateMedLevelExcelDataAction(excelData );
    validateMedLevelExcelDataAction.Do(this)
    return validateMedLevelExcelDataAction.response;
  }
}

