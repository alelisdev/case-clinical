
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureSite, UserCreateProcedureSiteInput, UserUpdateProcedureSiteInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureSiteExcelDataAction } from './actions/validate-procedure-site-excel-data.action'
import { CreateProcedureSiteAction } from './actions/create-procedure-site.action'
import { UpdateProcedureSitesAction, UpdateProcedureSiteAction } from './actions/update-procedure-sites.action'


@Injectable({providedIn: 'root'})
export class ProcedureSiteBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureSiteBusinessProviderService', logger, serviceContext)
  }

  createProcedureSite(input: UserCreateProcedureSiteInput): Observable<ProcedureSite> {
    const action = new CreateProcedureSiteAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureSite(input: UserUpdateProcedureSiteInput, procedureSiteId: string): Observable<ProcedureSite> {
    const action = new UpdateProcedureSiteAction(input, procedureSiteId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureSites(procedureSites: UserUpdateProcedureSiteInput[]): Observable<UpdateResult> {
    const updateProcedureSitesAction = new UpdateProcedureSitesAction(procedureSites);
    updateProcedureSitesAction.Do(this)
    return updateProcedureSitesAction.response;
  }

  validateProcedureSiteExcelData(excelData: any[] ) {
    const validateProcedureSiteExcelDataAction = new ValidateProcedureSiteExcelDataAction(excelData );
    validateProcedureSiteExcelDataAction.Do(this)
    return validateProcedureSiteExcelDataAction.response;
  }
}

