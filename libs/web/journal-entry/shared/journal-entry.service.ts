
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { JournalEntry, UserCreateJournalEntryInput, UserUpdateJournalEntryInput, UpdateResult, CaseAccount } from "@case-clinical/shared/util/sdk";
import { JournalEntryBusinessProviderService } from "./journal-entry.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createJournalEntry(filteredObj);
    }

    updateJournalEntry(input: UserUpdateJournalEntryInput, journalEntryId: string): Observable<JournalEntry> {
        return this.businessProvider.updateJournalEntry(input, journalEntryId);
    }

    importJournalEntries(journalEntries: UserUpdateJournalEntryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importJournalEntries(journalEntries);
    }

    validateJournalEntryExcelData(excelData: any[], caseAccounts: CaseAccount[]) {
      return this.businessProvider.validateJournalEntryExcelData(excelData, caseAccounts);
    }
}

