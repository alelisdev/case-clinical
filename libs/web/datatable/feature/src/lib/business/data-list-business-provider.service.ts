import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs'
import { Injectable } from '@angular/core'
import { LoggingService } from '@schema-driven/logging'
import { ReadExcelAction } from './actions/read-excel.action'
import { ServiceBase, ServiceContext } from '@schema-driven/foundation'
import { PopulateDataAction } from './actions/populate-data.action'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { of } from 'zen-observable'

@Injectable({
  providedIn: 'root',
})
export class DataListBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.DataListBusinessProviderService', logger, serviceContext)
  }

  importRecords(file: File, columns: Record<string, any>, tableName: string=null): Observable<boolean> {
    // First, Read Excel File
    const readExcelAction = new ReadExcelAction(file);
    readExcelAction.Do(this);

    return readExcelAction.response.pipe(
      switchMap(worksheet => {
        const updateRatesAction = new PopulateDataAction(file.name.split('.').slice(-1)[0],worksheet, columns, tableName);
        updateRatesAction.Do(this)
        return updateRatesAction.response;
      })
    )
  }

  fetchReplaceRules(tableName: string) {
    return this.data.userSettings({ input: { name: `${tableName}_replace_rull` } }).pipe(
      switchMap((response) => of(response.data.items.map((el) => JSON.parse(el.value))))
    )
  }

  saveReplaceRule(tableName: string, field: string, from: string, to: string) {
    const settingName = `${tableName}_replace_rull_${field}_${from}_${to}`
    console.log({ settingName })
    return this.data.userUpdateSetting({
      settingId: "",
      input: { name: settingName, value: JSON.stringify({ field, from, to }) },
     }).pipe(
      catchError((err) => {
        console.log(err);
        return EMPTY;
      }),
      switchMap((response) => {
        return of(true)
      })
     )
  }
}
