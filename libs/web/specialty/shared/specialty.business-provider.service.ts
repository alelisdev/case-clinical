
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Specialty, UserCreateSpecialtyInput, UserUpdateSpecialtyInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateSpecialtyExcelDataAction } from './actions/validate-specialty-excel-data.action'
import { CreateSpecialtyAction } from './actions/create-specialty.action'
import { UpdateSpecialtiesAction, UpdateSpecialtyAction } from './actions/update-specialties.action'


@Injectable({providedIn: 'root'})
export class SpecialtyBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.SpecialtyBusinessProviderService', logger, serviceContext)
  }

  createSpecialty(input: UserCreateSpecialtyInput): Observable<Specialty> {
    const action = new CreateSpecialtyAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateSpecialty(input: UserUpdateSpecialtyInput, specialtyId: string): Observable<Specialty> {
    const action = new UpdateSpecialtyAction(input, specialtyId); 
    action.Do(this);
    return action.response;   
  }
  
  importSpecialties(specialties: UserUpdateSpecialtyInput[]): Observable<UpdateResult> {
    const updateSpecialtiesAction = new UpdateSpecialtiesAction(specialties);
    updateSpecialtiesAction.Do(this)
    return updateSpecialtiesAction.response;
  }

  validateSpecialtyExcelData(excelData: any[] ) {
    const validateSpecialtyExcelDataAction = new ValidateSpecialtyExcelDataAction(excelData );
    validateSpecialtyExcelDataAction.Do(this)
    return validateSpecialtyExcelDataAction.response;
  }
}

