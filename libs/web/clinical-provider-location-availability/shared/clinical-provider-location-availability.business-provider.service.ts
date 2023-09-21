
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClinicalProviderLocationAvailability, UserCreateClinicalProviderLocationAvailabilityInput, UserUpdateClinicalProviderLocationAvailabilityInput, UpdateResult, ClinicalProviderLocation } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClinicalProviderLocationAvailabilityExcelDataAction } from './actions/validate-clinical-provider-location-availability-excel-data.action'
import { CreateClinicalProviderLocationAvailabilityAction } from './actions/create-clinical-provider-location-availability.action'
import { UpdateClinicalProviderLocationAvailabilitiesAction, UpdateClinicalProviderLocationAvailabilityAction } from './actions/update-clinical-provider-location-availabilities.action'


@Injectable({providedIn: 'root'})
export class ClinicalProviderLocationAvailabilityBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClinicalProviderLocationAvailabilityBusinessProviderService', logger, serviceContext)
  }

  createClinicalProviderLocationAvailability(input: UserCreateClinicalProviderLocationAvailabilityInput): Observable<ClinicalProviderLocationAvailability> {
    const action = new CreateClinicalProviderLocationAvailabilityAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClinicalProviderLocationAvailability(input: UserUpdateClinicalProviderLocationAvailabilityInput, clinicalProviderLocationAvailabilityId: string): Observable<ClinicalProviderLocationAvailability> {
    const action = new UpdateClinicalProviderLocationAvailabilityAction(input, clinicalProviderLocationAvailabilityId); 
    action.Do(this);
    return action.response;   
  }
  
  importClinicalProviderLocationAvailabilities(clinicalProviderLocationAvailabilities: UserUpdateClinicalProviderLocationAvailabilityInput[]): Observable<UpdateResult> {
    const updateClinicalProviderLocationAvailabilitiesAction = new UpdateClinicalProviderLocationAvailabilitiesAction(clinicalProviderLocationAvailabilities);
    updateClinicalProviderLocationAvailabilitiesAction.Do(this)
    return updateClinicalProviderLocationAvailabilitiesAction.response;
  }

  validateClinicalProviderLocationAvailabilityExcelData(excelData: any[], clinicalProviderLocations: ClinicalProviderLocation[]) {
    const validateClinicalProviderLocationAvailabilityExcelDataAction = new ValidateClinicalProviderLocationAvailabilityExcelDataAction(excelData, clinicalProviderLocations);
    validateClinicalProviderLocationAvailabilityExcelDataAction.Do(this)
    return validateClinicalProviderLocationAvailabilityExcelDataAction.response;
  }
}

