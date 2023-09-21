
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateJournalEntryAction} from './actions/create-journal-entry.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {JournalEntry, UserCreateJournalEntryInput, UserUpdateJournalEntryInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateJournalEntriesAction, UpdateJournalEntryAction } from './actions/update-journal-entries.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class JournalEntryBusinessProviderService extends ServiceBase {constructor(
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
  
  importJournalEntries(journalEntries: UserUpdateJournalEntryInput[]): Observable<boolean> {
    const updateJournalEntriesAction = new UpdateJournalEntriesAction(journalEntries);
    updateJournalEntriesAction.Do(this)
    return updateJournalEntriesAction.response;
  }
}

