
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { JournalEntryTemplate, UserCreateJournalEntryTemplateInput, UserUpdateJournalEntryTemplateInput, UpdateResult, CaseAccount } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateJournalEntryTemplateExcelDataAction } from './actions/validate-journal-entry-template-excel-data.action'
import { CreateJournalEntryTemplateAction } from './actions/create-journal-entry-template.action'
import { UpdateJournalEntryTemplatesAction, UpdateJournalEntryTemplateAction } from './actions/update-journal-entry-templates.action'


@Injectable({providedIn: 'root'})
export class JournalEntryTemplateBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.JournalEntryTemplateBusinessProviderService', logger, serviceContext)
  }

  createJournalEntryTemplate(input: UserCreateJournalEntryTemplateInput): Observable<JournalEntryTemplate> {
    const action = new CreateJournalEntryTemplateAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateJournalEntryTemplate(input: UserUpdateJournalEntryTemplateInput, journalEntryTemplateId: string): Observable<JournalEntryTemplate> {
    const action = new UpdateJournalEntryTemplateAction(input, journalEntryTemplateId); 
    action.Do(this);
    return action.response;   
  }
  
  importJournalEntryTemplates(journalEntryTemplates: UserUpdateJournalEntryTemplateInput[]): Observable<UpdateResult> {
    const updateJournalEntryTemplatesAction = new UpdateJournalEntryTemplatesAction(journalEntryTemplates);
    updateJournalEntryTemplatesAction.Do(this)
    return updateJournalEntryTemplatesAction.response;
  }

  validateJournalEntryTemplateExcelData(excelData: any[], caseAccounts: CaseAccount[]) {
    const validateJournalEntryTemplateExcelDataAction = new ValidateJournalEntryTemplateExcelDataAction(excelData, caseAccounts);
    validateJournalEntryTemplateExcelDataAction.Do(this)
    return validateJournalEntryTemplateExcelDataAction.response;
  }
}

