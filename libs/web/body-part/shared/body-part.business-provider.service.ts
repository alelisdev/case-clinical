
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { BodyPart, UserCreateBodyPartInput, UserUpdateBodyPartInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateBodyPartExcelDataAction } from './actions/validate-body-part-excel-data.action'
import { CreateBodyPartAction } from './actions/create-body-part.action'
import { UpdateBodyPartsAction, UpdateBodyPartAction } from './actions/update-body-parts.action'


@Injectable({providedIn: 'root'})
export class BodyPartBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.BodyPartBusinessProviderService', logger, serviceContext)
  }

  createBodyPart(input: UserCreateBodyPartInput): Observable<BodyPart> {
    const action = new CreateBodyPartAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateBodyPart(input: UserUpdateBodyPartInput, bodyPartId: string): Observable<BodyPart> {
    const action = new UpdateBodyPartAction(input, bodyPartId); 
    action.Do(this);
    return action.response;   
  }
  
  importBodyParts(bodyParts: UserUpdateBodyPartInput[]): Observable<UpdateResult> {
    const updateBodyPartsAction = new UpdateBodyPartsAction(bodyParts);
    updateBodyPartsAction.Do(this)
    return updateBodyPartsAction.response;
  }

  validateBodyPartExcelData(excelData: any[] ) {
    const validateBodyPartExcelDataAction = new ValidateBodyPartExcelDataAction(excelData );
    validateBodyPartExcelDataAction.Do(this)
    return validateBodyPartExcelDataAction.response;
  }
}

