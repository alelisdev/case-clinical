
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureVendor, UserCreateProcedureVendorInput, UserUpdateProcedureVendorInput, UpdateResult, CaseProcedure, Contract, Vendor, ProcedureVendorStatus } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureVendorExcelDataAction } from './actions/validate-procedure-vendor-excel-data.action'
import { CreateProcedureVendorAction } from './actions/create-procedure-vendor.action'
import { UpdateProcedureVendorsAction, UpdateProcedureVendorAction } from './actions/update-procedure-vendors.action'


@Injectable({providedIn: 'root'})
export class ProcedureVendorBusinessProviderService extends ServiceBase {
  constructor(
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
  
  importProcedureVendors(procedureVendors: UserUpdateProcedureVendorInput[]): Observable<UpdateResult> {
    const updateProcedureVendorsAction = new UpdateProcedureVendorsAction(procedureVendors);
    updateProcedureVendorsAction.Do(this)
    return updateProcedureVendorsAction.response;
  }

  validateProcedureVendorExcelData(excelData: any[], procedures: CaseProcedure[], contracts: Contract[], vendors: Vendor[], statuses: ProcedureVendorStatus[]) {
    const validateProcedureVendorExcelDataAction = new ValidateProcedureVendorExcelDataAction(excelData, procedures, contracts, vendors, statuses);
    validateProcedureVendorExcelDataAction.Do(this)
    return validateProcedureVendorExcelDataAction.response;
  }
}

