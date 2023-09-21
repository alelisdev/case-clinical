
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { InvoiceDetail, UserCreateInvoiceDetailInput, UserUpdateInvoiceDetailInput, UpdateResult, Invoice } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateInvoiceDetailExcelDataAction } from './actions/validate-invoice-detail-excel-data.action'
import { CreateInvoiceDetailAction } from './actions/create-invoice-detail.action'
import { UpdateInvoiceDetailsAction, UpdateInvoiceDetailAction } from './actions/update-invoice-details.action'


@Injectable({providedIn: 'root'})
export class InvoiceDetailBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.InvoiceDetailBusinessProviderService', logger, serviceContext)
  }

  createInvoiceDetail(input: UserCreateInvoiceDetailInput): Observable<InvoiceDetail> {
    const action = new CreateInvoiceDetailAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateInvoiceDetail(input: UserUpdateInvoiceDetailInput, invoiceDetailId: string): Observable<InvoiceDetail> {
    const action = new UpdateInvoiceDetailAction(input, invoiceDetailId); 
    action.Do(this);
    return action.response;   
  }
  
  importInvoiceDetails(invoiceDetails: UserUpdateInvoiceDetailInput[]): Observable<UpdateResult> {
    const updateInvoiceDetailsAction = new UpdateInvoiceDetailsAction(invoiceDetails);
    updateInvoiceDetailsAction.Do(this)
    return updateInvoiceDetailsAction.response;
  }

  validateInvoiceDetailExcelData(excelData: any[], invoices: Invoice[]) {
    const validateInvoiceDetailExcelDataAction = new ValidateInvoiceDetailExcelDataAction(excelData, invoices);
    validateInvoiceDetailExcelDataAction.Do(this)
    return validateInvoiceDetailExcelDataAction.response;
  }
}

