
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { JournalEntry, UserCreateJournalEntryInput, UserUpdateJournalEntryInput, UpdateResult, CaseAccount } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateJournalEntryExcelDataAction } from './actions/validate-journal-entry-excel-data.action'
import { CreateJournalEntryAction } from './actions/create-journal-entry.action'
import { UpdateJournalEntriesAction, UpdateJournalEntryAction } from './actions/update-journal-entries.action'


@Injectable({providedIn: 'root'})
export class JournalEntryBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.JournalEntryBusinessProviderService', logger, serviceContext)
  }

  createJournalEntry(input: UserCreateJournalEntryInput): Observable<JournalEntry> {
    const action = new CreateJournalEntryAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateJournalEntry(input: UserUpdateJournalEntryInput, journalEntryId: string): Observable<JournalEntry> {
    const action = new UpdateJournalEntryAction(input, journalEntryId); 
    action.Do(this);
    return action.response;   
  }
  
  importJournalEntries(journalEntries: UserUpdateJournalEntryInput[]): Observable<UpdateResult> {
    const updateJournalEntriesAction = new UpdateJournalEntriesAction(journalEntries);
    updateJournalEntriesAction.Do(this)
    return updateJournalEntriesAction.response;
  }

  validateJournalEntryExcelData(excelData: any[], caseAccounts: CaseAccount[]) {
    const validateJournalEntryExcelDataAction = new ValidateJournalEntryExcelDataAction(excelData, caseAccounts);
    validateJournalEntryExcelDataAction.Do(this)
    return validateJournalEntryExcelDataAction.response;
  }
}

