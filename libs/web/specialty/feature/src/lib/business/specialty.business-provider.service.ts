
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateSpecialtyAction} from './actions/create-specialty.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Specialty, UserCreateSpecialtyInput, UserUpdateSpecialtyInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateSpecialtiesAction, UpdateSpecialtyAction } from './actions/update-specialties.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class SpecialtyBusinessProviderService extends ServiceBase {constructor(
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
  
  importSpecialties(specialties: UserUpdateSpecialtyInput[]): Observable<boolean> {
    const updateSpecialtiesAction = new UpdateSpecialtiesAction(specialties);
    updateSpecialtiesAction.Do(this)
    return updateSpecialtiesAction.response;
  }
}

