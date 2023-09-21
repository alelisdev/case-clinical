import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTotal'
})
export class GetTotalPipe implements PipeTransform {

  transform(dataSource: any[], colName: string): any {
    if(colName === undefined || colName === null){
        return dataSource.length - 1;
    } else {
        return this.getTotal(colName, dataSource) || '';
    }
  }

  /**
   * Calculate and return the total (sum) of all the column --> the column must be number
   */
  getTotal(colName: string, dataSource: any[]): number {
    const total = dataSource.map(row => row[colName]).reduce((acc, value) => value ? acc + Number(value) : acc, 0);
    return total?.toFixed(2);
  }
}