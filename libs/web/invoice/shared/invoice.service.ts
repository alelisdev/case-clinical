
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Invoice, UserCreateInvoiceInput, UserUpdateInvoiceInput, UpdateResult, Organization, LegalCase, Document } from "@case-clinical/shared/util/sdk";
import { InvoiceBusinessProviderService } from "./invoice.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class InvoiceService extends ServiceBase {
 constructor(
  @Inject(InvoiceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: InvoiceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("InvoiceService", loggingService, serviceContext);
 }

    createInvoice(input: UserCreateInvoiceInput): Observable<Invoice> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createInvoice(filteredObj);
    }

    updateInvoice(input: UserUpdateInvoiceInput, invoiceId: string): Observable<Invoice> {
        return this.businessProvider.updateInvoice(input, invoiceId);
    }

    importInvoices(invoices: UserUpdateInvoiceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importInvoices(invoices);
    }

    validateInvoiceExcelData(excelData: any[], billingOrganizations: Organization[], legalCases: LegalCase[], invoices: Document[]) {
      return this.businessProvider.validateInvoiceExcelData(excelData, billingOrganizations, legalCases, invoices);
    }
}

