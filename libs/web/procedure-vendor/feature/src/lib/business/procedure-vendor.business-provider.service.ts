
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateProcedureVendorAction} from './actions/create-procedure-vendor.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {ProcedureVendor, UserCreateProcedureVendorInput, UserUpdateProcedureVendorInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateProcedureVendorsAction, UpdateProcedureVendorAction } from './actions/update-procedure-vendors.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class ProcedureVendorBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureVendorBusinessProviderService', logger, serviceContext)
  }

  createProcedureVendor(input: UserCreateProcedureVendorInput): Observable<ProcedureVendor> {
    const action = new CreateProcedureVendorAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureVendor(input: UserUpdateProcedureVendorInput, procedureVendorId: string): Observable<ProcedureVendor> {
    const action = new UpdateProcedureVendorAction(input, procedureVendorId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureVendors(procedureVendors: UserUpdateProcedureVendorInput[]): Observable<boolean> {
    const updateProcedureVendorsAction = new UpdateProcedureVendorsAction(procedureVendors);
    updateProcedureVendorsAction.Do(this)
    return updateProcedureVendorsAction.response;
  }
}

