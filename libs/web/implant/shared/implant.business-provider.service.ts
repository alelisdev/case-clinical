
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Implant, UserCreateImplantInput, UserUpdateImplantInput, UpdateResult, ImplantCategory, Contact, Manufacturer } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateImplantExcelDataAction } from './actions/validate-implant-excel-data.action'
import { CreateImplantAction } from './actions/create-implant.action'
import { UpdateImplantsAction, UpdateImplantAction } from './actions/update-implants.action'


@Injectable({providedIn: 'root'})
export class ImplantBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ImplantBusinessProviderService', logger, serviceContext)
  }

  createImplant(input: UserCreateImplantInput): Observable<Implant> {
    const action = new CreateImplantAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateImplant(input: UserUpdateImplantInput, implantId: string): Observable<Implant> {
    const action = new UpdateImplantAction(input, implantId); 
    action.Do(this);
    return action.response;   
  }
  
  importImplants(implants: UserUpdateImplantInput[]): Observable<UpdateResult> {
    const updateImplantsAction = new UpdateImplantsAction(implants);
    updateImplantsAction.Do(this)
    return updateImplantsAction.response;
  }

  validateImplantExcelData(excelData: any[], implantCategories: ImplantCategory[], salesRepresentatives: Contact[], manufacturers: Manufacturer[]) {
    const validateImplantExcelDataAction = new ValidateImplantExcelDataAction(excelData, implantCategories, salesRepresentatives, manufacturers);
    validateImplantExcelDataAction.Do(this)
    return validateImplantExcelDataAction.response;
  }
}

