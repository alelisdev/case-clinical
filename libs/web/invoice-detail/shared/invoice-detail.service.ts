
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { InvoiceDetail, UserCreateInvoiceDetailInput, UserUpdateInvoiceDetailInput, UpdateResult, Invoice } from "@case-clinical/shared/util/sdk";
import { InvoiceDetailBusinessProviderService } from "./invoice-detail.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class InvoiceDetailService extends ServiceBase {
 constructor(
  @Inject(InvoiceDetailBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: InvoiceDetailBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("InvoiceDetailService", loggingService, serviceContext);
 }

    createInvoiceDetail(input: UserCreateInvoiceDetailInput): Observable<InvoiceDetail> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createInvoiceDetail(filteredObj);
    }

    updateInvoiceDetail(input: UserUpdateInvoiceDetailInput, invoiceDetailId: string): Observable<InvoiceDetail> {
        return this.businessProvider.updateInvoiceDetail(input, invoiceDetailId);
    }

    importInvoiceDetails(invoiceDetails: UserUpdateInvoiceDetailInput[]): Observable<UpdateResult> {
        return this.businessProvider.importInvoiceDetails(invoiceDetails);
    }

    validateInvoiceDetailExcelData(excelData: any[], invoices: Invoice[]) {
      return this.businessProvider.validateInvoiceDetailExcelData(excelData, invoices);
    }
}

