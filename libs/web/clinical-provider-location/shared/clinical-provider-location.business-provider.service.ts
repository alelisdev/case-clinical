
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClinicalProviderLocation, UserCreateClinicalProviderLocationInput, UserUpdateClinicalProviderLocationInput, UpdateResult, ClinicalProvider, Location } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClinicalProviderLocationExcelDataAction } from './actions/validate-clinical-provider-location-excel-data.action'
import { CreateClinicalProviderLocationAction } from './actions/create-clinical-provider-location.action'
import { UpdateClinicalProviderLocationsAction, UpdateClinicalProviderLocationAction } from './actions/update-clinical-provider-locations.action'


@Injectable({providedIn: 'root'})
export class ClinicalProviderLocationBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClinicalProviderLocationBusinessProviderService', logger, serviceContext)
  }

  createClinicalProviderLocation(input: UserCreateClinicalProviderLocationInput): Observable<ClinicalProviderLocation> {
    const action = new CreateClinicalProviderLocationAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClinicalProviderLocation(input: UserUpdateClinicalProviderLocationInput, clinicalProviderLocationId: string): Observable<ClinicalProviderLocation> {
    const action = new UpdateClinicalProviderLocationAction(input, clinicalProviderLocationId); 
    action.Do(this);
    return action.response;   
  }
  
  importClinicalProviderLocations(clinicalProviderLocations: UserUpdateClinicalProviderLocationInput[]): Observable<UpdateResult> {
    const updateClinicalProviderLocationsAction = new UpdateClinicalProviderLocationsAction(clinicalProviderLocations);
    updateClinicalProviderLocationsAction.Do(this)
    return updateClinicalProviderLocationsAction.response;
  }

  validateClinicalProviderLocationExcelData(excelData: any[], clinicalProviders: ClinicalProvider[], locations: Location[]) {
    const validateClinicalProviderLocationExcelDataAction = new ValidateClinicalProviderLocationExcelDataAction(excelData, clinicalProviders, locations);
    validateClinicalProviderLocationExcelDataAction.Do(this)
    return validateClinicalProviderLocationExcelDataAction.response;
  }
}

