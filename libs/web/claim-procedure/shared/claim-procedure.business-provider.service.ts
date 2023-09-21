
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ClaimProcedure, UserCreateClaimProcedureInput, UserUpdateClaimProcedureInput, UpdateResult, PlaceOfService, ClaimStatus, Claim, Appointment, Procedure } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateClaimProcedureExcelDataAction } from './actions/validate-claim-procedure-excel-data.action'
import { CreateClaimProcedureAction } from './actions/create-claim-procedure.action'
import { UpdateClaimProceduresAction, UpdateClaimProcedureAction } from './actions/update-claim-procedures.action'


@Injectable({providedIn: 'root'})
export class ClaimProcedureBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ClaimProcedureBusinessProviderService', logger, serviceContext)
  }

  createClaimProcedure(input: UserCreateClaimProcedureInput): Observable<ClaimProcedure> {
    const action = new CreateClaimProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateClaimProcedure(input: UserUpdateClaimProcedureInput, claimProcedureId: string): Observable<ClaimProcedure> {
    const action = new UpdateClaimProcedureAction(input, claimProcedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importClaimProcedures(claimProcedures: UserUpdateClaimProcedureInput[]): Observable<UpdateResult> {
    const updateClaimProceduresAction = new UpdateClaimProceduresAction(claimProcedures);
    updateClaimProceduresAction.Do(this)
    return updateClaimProceduresAction.response;
  }

  validateClaimProcedureExcelData(excelData: any[], placeOfServices: PlaceOfService[], claimStatuses: ClaimStatus[], claims: Claim[], appointments: Appointment[], procedures: Procedure[]) {
    const validateClaimProcedureExcelDataAction = new ValidateClaimProcedureExcelDataAction(excelData, placeOfServices, claimStatuses, claims, appointments, procedures);
    validateClaimProcedureExcelDataAction.Do(this)
    return validateClaimProcedureExcelDataAction.response;
  }
}

