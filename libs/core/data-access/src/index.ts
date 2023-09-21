import { isString } from '@ngneat/transloco';
import * as moment from 'moment';
export {
  InitialDataResolver,
  PatientInitialDataResolver,
  ProviderInitialDataResolver,
  AttorneyInitialDataResolver,
  BreadCrumbResolver,
  LegalCaseResolver,
  UserRoleResolver,
} from './lib/web-core-data-access.resolver'
export {WebCoreDataAccessService} from './lib/web-core-data-access.service'
export * from '@case-clinical/shared/util/sdk'


export function currencyFormatter(currency, sign, round = 0) {
  const numberValue = Number.parseFloat(currency)
  const sansDec = numberValue.toFixed(round);
  if (isNaN(numberValue)) return "";
  const formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + `${formatted}`;
}

export function dateFormatter(value) {
  console.log({ dateFormatter: value })
  if (!value) return "";
  if (isString(value) && value.trim().length === 0) return;
  const date = new Date(value);
  console.log({ date })
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString();
  // return year + '-' + month + '-' + day;
  return `${month}/${day}/${year}`
  // return year + '-' + month + '-' + day;
}

export function dateComparator(filterValue, cellValue){
  console.log(filterValue);
  console.log(cellValue);

  const filterDateValue= moment(filterValue);
  const cellDate= moment(cellValue);

  if(!filterDateValue.isValid())
    return 0;

  if(filterDateValue.year() == cellDate.year() && filterDateValue.month() == cellDate.month() && filterDateValue.dates() == cellDate.dates())
    return 0;


  if(filterDateValue.isAfter(cellDate))
    return -1;
  else if(filterDateValue.isBefore(cellDate)){
    return 1;
  }
  return 0;
}
