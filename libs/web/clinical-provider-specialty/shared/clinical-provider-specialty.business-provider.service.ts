
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClinicalProviderSpecialty, UserCreateClinicalProviderSpecialtyInput, UserUpdateClinicalProviderSpecialtyInput, UpdateResult, ClinicalProvider, Specialty } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClinicalProviderSpecialtyExcelDataAction } from './actions/validate-clinical-provider-specialty-excel-data.action'
import { CreateClinicalProviderSpecialtyAction } from './actions/create-clinical-provider-specialty.action'
import { UpdateClinicalProviderSpecialtiesAction, UpdateClinicalProviderSpecialtyAction } from './actions/update-clinical-provider-specialties.action'


@Injectable({providedIn: 'root'})
export class ClinicalProviderSpecialtyBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClinicalProviderSpecialtyBusinessProviderService', logger, serviceContext)
  }

  createClinicalProviderSpecialty(input: UserCreateClinicalProviderSpecialtyInput): Observable<ClinicalProviderSpecialty> {
    const action = new CreateClinicalProviderSpecialtyAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClinicalProviderSpecialty(input: UserUpdateClinicalProviderSpecialtyInput, clinicalProviderSpecialtyId: string): Observable<ClinicalProviderSpecialty> {
    const action = new UpdateClinicalProviderSpecialtyAction(input, clinicalProviderSpecialtyId); 
    action.Do(this);
    return action.response;   
  }
  
  importClinicalProviderSpecialties(clinicalProviderSpecialties: UserUpdateClinicalProviderSpecialtyInput[]): Observable<UpdateResult> {
    const updateClinicalProviderSpecialtiesAction = new UpdateClinicalProviderSpecialtiesAction(clinicalProviderSpecialties);
    updateClinicalProviderSpecialtiesAction.Do(this)
    return updateClinicalProviderSpecialtiesAction.response;
  }

  validateClinicalProviderSpecialtyExcelData(excelData: any[], clinicalProviders: ClinicalProvider[], specialties: Specialty[]) {
    const validateClinicalProviderSpecialtyExcelDataAction = new ValidateClinicalProviderSpecialtyExcelDataAction(excelData, clinicalProviders, specialties);
    validateClinicalProviderSpecialtyExcelDataAction.Do(this)
    return validateClinicalProviderSpecialtyExcelDataAction.response;
  }
}

