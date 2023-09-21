
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Invoice, UserCreateInvoiceInput, UserUpdateInvoiceInput, UpdateResult, Organization, LegalCase, Document } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateInvoiceExcelDataAction } from './actions/validate-invoice-excel-data.action'
import { CreateInvoiceAction } from './actions/create-invoice.action'
import { UpdateInvoicesAction, UpdateInvoiceAction } from './actions/update-invoices.action'


@Injectable({providedIn: 'root'})
export class InvoiceBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InvoiceBusinessProviderService', logger, serviceContext)
  }

  createInvoice(input: UserCreateInvoiceInput): Observable<Invoice> {
    const action = new CreateInvoiceAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInvoice(input: UserUpdateInvoiceInput, invoiceId: string): Observable<Invoice> {
    const action = new UpdateInvoiceAction(input, invoiceId); 
    action.Do(this);
    return action.response;   
  }
  
  importInvoices(invoices: UserUpdateInvoiceInput[]): Observable<UpdateResult> {
    const updateInvoicesAction = new UpdateInvoicesAction(invoices);
    updateInvoicesAction.Do(this)
    return updateInvoicesAction.response;
  }

  validateInvoiceExcelData(excelData: any[], billingOrganizations: Organization[], legalCases: LegalCase[], invoices: Document[]) {
    const validateInvoiceExcelDataAction = new ValidateInvoiceExcelDataAction(excelData, billingOrganizations, legalCases, invoices);
    validateInvoiceExcelDataAction.Do(this)
    return validateInvoiceExcelDataAction.response;
  }
}

