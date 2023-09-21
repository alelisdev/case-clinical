
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { JournalEntry, UserCreateJournalEntryInput, UserUpdateJournalEntryInput } from "@case-clinical/shared/util/sdk";
import { JournalEntryBusinessProviderService } from "./business/journal-entry.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class JournalEntryService extends ServiceBase {
 constructor(
  @Inject(JournalEntryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: JournalEntryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("JournalEntryService", loggingService, serviceContext);
 }

    createJournalEntry(input: UserCreateJournalEntryInput): Observable<JournalEntry> {
        return this.businessProvider.createJournalEntry(input);
    }

    updateJournalEntry(input: UserUpdateJournalEntryInput, journalEntryId: string): Observable<JournalEntry> {
        return this.businessProvider.updateJournalEntry(input, journalEntryId);
    }

    importJournalEntries(journalEntries: UserUpdateJournalEntryInput[]): Observable<boolean> {
        return this.businessProvider.importJournalEntries(journalEntries);
    }
}

