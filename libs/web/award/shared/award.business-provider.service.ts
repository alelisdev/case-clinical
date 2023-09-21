
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Award, UserCreateAwardInput, UserUpdateAwardInput, UpdateResult, ClinicalProvider } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAwardExcelDataAction } from './actions/validate-award-excel-data.action'
import { CreateAwardAction } from './actions/create-award.action'
import { UpdateAwardsAction, UpdateAwardAction } from './actions/update-awards.action'


@Injectable({providedIn: 'root'})
export class AwardBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AwardBusinessProviderService', logger, serviceContext)
  }

  createAward(input: UserCreateAwardInput): Observable<Award> {
    const action = new CreateAwardAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAward(input: UserUpdateAwardInput, awardId: string): Observable<Award> {
    const action = new UpdateAwardAction(input, awardId); 
    action.Do(this);
    return action.response;   
  }
  
  importAwards(awards: UserUpdateAwardInput[]): Observable<UpdateResult> {
    const updateAwardsAction = new UpdateAwardsAction(awards);
    updateAwardsAction.Do(this)
    return updateAwardsAction.response;
  }

  validateAwardExcelData(excelData: any[], clinicalProviders: ClinicalProvider[]) {
    const validateAwardExcelDataAction = new ValidateAwardExcelDataAction(excelData, clinicalProviders);
    validateAwardExcelDataAction.Do(this)
    return validateAwardExcelDataAction.response;
  }
}

