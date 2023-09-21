
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { JournalEntryTemplate, UserCreateJournalEntryTemplateInput, UserUpdateJournalEntryTemplateInput, UpdateResult, CaseAccount } from "@case-clinical/shared/util/sdk";
import { JournalEntryTemplateBusinessProviderService } from "./journal-entry-template.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class JournalEntryTemplateService extends ServiceBase {
 constructor(
  @Inject(JournalEntryTemplateBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: JournalEntryTemplateBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("JournalEntryTemplateService", loggingService, serviceContext);
 }

    createJournalEntryTemplate(input: UserCreateJournalEntryTemplateInput): Observable<JournalEntryTemplate> {
        return this.businessProvider.createJournalEntryTemplate(input);
    }

    updateJournalEntryTemplate(input: UserUpdateJournalEntryTemplateInput, journalEntryTemplateId: string): Observable<JournalEntryTemplate> {
        return this.businessProvider.updateJournalEntryTemplate(input, journalEntryTemplateId);
    }

    importJournalEntryTemplates(journalEntryTemplates: UserUpdateJournalEntryTemplateInput[]): Observable<UpdateResult> {
        return this.businessProvider.importJournalEntryTemplates(journalEntryTemplates);
    }

    validateJournalEntryTemplateExcelData(excelData: any[], caseAccounts: CaseAccount[]) {
      return this.businessProvider.validateJournalEntryTemplateExcelData(excelData, caseAccounts);
    }
}

