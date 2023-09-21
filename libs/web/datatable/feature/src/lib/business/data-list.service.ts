import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { DataListBusinessProviderService } from "./data-list-business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class DataListService extends ServiceBase {
 constructor(
  @Inject(DataListBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: DataListBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("DataListService", loggingService, serviceContext);
 }

 importRecords(file: File, columns: Record<string, any>, tableName=null): Observable<any> {
   return this.businessProvider.importRecords(file, columns, tableName);
 }

 saveReplaceRule(tableName: string, field: string, from: string, to: string): Observable<any> {
  return this.businessProvider.saveReplaceRule(tableName, field, from, to);
 }

 fetchReplaceRules(tableName: string) {
  return this.businessProvider.fetchReplaceRules(tableName)
 }
}
