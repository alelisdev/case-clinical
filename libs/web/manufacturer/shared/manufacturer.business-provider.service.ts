
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Manufacturer, UserCreateManufacturerInput, UserUpdateManufacturerInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateManufacturerExcelDataAction } from './actions/validate-manufacturer-excel-data.action'
import { CreateManufacturerAction } from './actions/create-manufacturer.action'
import { UpdateManufacturersAction, UpdateManufacturerAction } from './actions/update-manufacturers.action'


@Injectable({providedIn: 'root'})
export class ManufacturerBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ManufacturerBusinessProviderService', logger, serviceContext)
  }

  createManufacturer(input: UserCreateManufacturerInput): Observable<Manufacturer> {
    const action = new CreateManufacturerAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateManufacturer(input: UserUpdateManufacturerInput, manufacturerId: string): Observable<Manufacturer> {
    const action = new UpdateManufacturerAction(input, manufacturerId); 
    action.Do(this);
    return action.response;   
  }
  
  importManufacturers(manufacturers: UserUpdateManufacturerInput[]): Observable<UpdateResult> {
    const updateManufacturersAction = new UpdateManufacturersAction(manufacturers);
    updateManufacturersAction.Do(this)
    return updateManufacturersAction.response;
  }

  validateManufacturerExcelData(excelData: any[] ) {
    const validateManufacturerExcelDataAction = new ValidateManufacturerExcelDataAction(excelData );
    validateManufacturerExcelDataAction.Do(this)
    return validateManufacturerExcelDataAction.response;
  }
}

