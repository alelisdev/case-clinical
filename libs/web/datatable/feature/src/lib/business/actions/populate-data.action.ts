import { isString } from '@ngneat/transloco';
import { IsNotNullOrUndefined, StringIsNotNullEmptyRange, IsNumber, StringIsValidDateString } from '@schema-driven/rules-engine'
import { of, switchMap } from 'rxjs'
import { BusinessActionBase } from './business-action-base'
import { WorksheetIsValidRule } from '../rules/worksheet-is-valid.rule';
import { strict } from 'assert';
import { WorksheetDataIsValidRule } from '../rules/worksheet-data-is-valid.rule';
import { WorksheetIsNotEmptyRule } from '../rules/worksheet-is-not-empty.rule';

export class PopulateDataAction extends BusinessActionBase<boolean> {

  data: unknown[]
    // realColumns represents real format of imported file
    // The real excel file might not have the same format as the above one
    // The real file may be like the following format
    //   A: {
    //     field: 'name',
    //     headerName: "Name",  // This has been changed
    //     type: 'string'
    //   },
    //   B: {
    //     field: 'firstName',
    //     headerName: "First Name",  // This has been changed
    //     type: 'string'
    //   }
    // So we have to match with the real excel file to do import operation
    realColumns = {

    }

  constructor(private type:string, private worksheet: any, private columns: Record<string, any>, private tableName: string=null) {
    super('PopulateDataAction')
  }

  capitalize(str): string {
    let firstCharacter = str.substring(0, 1)
    str = str.substring(1, str.length)
    firstCharacter = firstCharacter.toUpperCase();
    str = firstCharacter + str
    return str;
  }

  toCamelCase(str): string {
    let camelCaseStr = String(str).trim();
    // Remove . and replace the first character just after . to uppercase
    camelCaseStr = camelCaseStr.split('.').map((el) => this.capitalize(el)).join("");
    camelCaseStr = camelCaseStr.replace(/([A-Z]+)*(([A-Z][a-z])|([0-9]+))/g, "$1 $2")
    return this.capitalize(camelCaseStr)?.trim() ?? "";
  }

  preValidateAction() {
    this.validationContext.addRule(
      new IsNotNullOrUndefined(
        'Worksheet',
        'Worksheet should not be null',
        this.worksheet,
        true
      )
    )

    let camelCaseColumns: Record<string, string> = {}
    camelCaseColumns = Object.keys(this.columns).reduce((accumulator, currentKey) => {
      accumulator[currentKey] = this.columns[currentKey].headerName || this.toCamelCase(this.columns[currentKey].field);
      return accumulator;
    }, camelCaseColumns);
    console.log({camelCaseColumns, columns: this.columns});



    // this.columns has the following shape, it is from grid of <ui-data-list></ui-data-list>
    // this.columns = {
    //   A: {
    //     field: 'id',
    //     headerName: null,
    //     type: 'string'
    //   },
    //   B: {
    //     field: 'name',
    //     headerName: null,
    //     type: 'string'
    //   },
    //   C: {
    //     field: 'firstName',
    //     headerName: null,
    //     type: 'string'
    //   }
    // }

    /** Set the headerName into above columns information, headerName can be either pre-defined string or null
     * If headerName is set, skip, else set that
    */
    this.columns = Object.keys(this.columns).reduce((accumulator, currentKey) => {
      const value = this.columns[currentKey];
      accumulator.push({ ...value, headerName: (value.headerName ?? this.toCamelCase(value.field)) })
      return accumulator;
    }, []);
    console.log(this.columns)
    this.data = []



    // From above action this.columns changed into the following shape
    // this.columns = [
    //   {
    //     field: 'id',
    //     headerName: Id,  // This has been changed
    //     type: 'string'
    //   },
    //   {
    //     field: 'name',
    //     headerName: "Name",  // This has been changed
    //     type: 'string'
    //   },
    //   {
    //     field: 'firstName',
    //     headerName: "First Name",  // This has been changed
    //     type: 'string'
    //   }
    // ]



    // console.log(this.columns)

    // Loop through the worksheet and populate data while adding rules
    if(this.type == 'xlsx'){
      Object.keys(this.worksheet).map((key: string) => {
        const cell = this.worksheet[key]
        const regExpStr = /^([A-Z]+)(\d+)$/g
        const regExp = new RegExp(regExpStr)
        const matches = regExp.exec(key)
        if (matches === null) {
          return;
        }
        // Cell = A-2 A-3 B-12 ...
        // column = A, A, B,   Column Name
        // Row = 2, 3, 12      Row Number
        const cellValue = (cell.v === false || cell.v === 0 || cell.v)  ? cell.w : "";
        const column = matches[1]
        const row = Number(matches[2])

        if(cellValue === null || cellValue === undefined) return;
        if(isString(cellValue) && cellValue.trim().length === 0) return;

        // This means this cell is the header of column
        // console.log(this.columns)
        if(row === 1) {
          const index = this.columns.findIndex((el) => {
            return (el.field.toLowerCase() === cellValue.toLowerCase()) || (el.headerName.toLowerCase() === cellValue.toLowerCase());
          });
          console.log({ index, cellValue});
          if(index !== -1) {
            this.realColumns[column] = this.columns[index];
          } else {
            this.realColumns[column] = {
              field: cellValue,
              headerName: cellValue,
              type: 'string'
            };
          }
          return;
        }
        // Represents one row of excel file
        let excelRow;
        if (this.data.length > row - 2)
          excelRow = this.data[row-2]
        else {
          excelRow = {}
          this.data.push(excelRow)
        }

        if(!this.realColumns[column]) return;

        const indexKey = this.realColumns[column].field;
        const type = this.realColumns[column].type;

        if(['createdAt', 'updatedAt'].includes(indexKey)) {
          return;
        }

        if(indexKey.includes('.')) {
          const keys = indexKey.split('.');
          // console.log({ keys })
          let parent = excelRow;
          for(let i = 0; i < keys.length-1; i++) {
            const key = keys[i];
            if(parent[key]) {
              parent = parent[key];
            } else {
              parent[key] = {};
              parent = parent[key];
            }
          }
          parent[keys[keys.length-1]] = cellValue;
        } else {
          if (indexKey === 'id') {
            excelRow[indexKey] = cellValue;
          } else {
            switch (type) {
              case 'string':
                excelRow[indexKey] = cellValue;
                break;
              case 'number':
                excelRow[indexKey] = Number(cellValue);
                break;
              case 'date':
                if(!isNaN(new Date(cellValue).getDate())) {
                  excelRow[indexKey] = cellValue;
                }
                break;
              case 'set':
                {
                  console.log("set", cellValue)
                  const value = `${cellValue}`;
                  const trueBooleanStrings = [ 'true', 'yes', '1' ];
                  const falseBooleanStrings = [ 'false', 'no', '0' ];
                  console.log(value.toLowerCase(), 'indexKey=', indexKey)

                  if(trueBooleanStrings.includes(value.toLowerCase())) {
                    excelRow[indexKey] = true;
                  } else if(falseBooleanStrings.includes(value.toLowerCase())) {
                    console.log("asdfasdfasfd")
                    excelRow[indexKey] = false;
                  }
                  break;
                }
              default:
                break;
            }
          }
        }

      })
    }
    if(this.type == 'csv'){
      let headersRow = this.getHeaderArray(this.worksheet,this.columns);
      this.data= this.getDataRecordsArrayFromCSVFile(this.worksheet, headersRow);
      this.realColumns = headersRow;
    }

    this.validationContext.addRule(
      new WorksheetIsNotEmptyRule(
        'WorksheetIsNotEmpty',
        'Worksheet should contain at least one record',
        this.data,
        true
      )
    )

    this.validationContext.addRule(
      new WorksheetIsValidRule(
        'WorksheetFormatIsNotValid',
        'Worksheet should contain at least a name column',
        this.worksheet,
        this.realColumns,
        true
      )
    )

    this.validationContext.addRule(
      new WorksheetDataIsValidRule(
        'WorksheetDataIsNotValid',
        'Some records of worksheet do not have name value',
        this.data,
        true
      )
    )
  }

  splitRowData(rowStr:string):string[]{
    let rstr=rowStr;
    let result = [];
    let sIndex=0;
    do{

      if(!rstr.includes(","))
      {
        if(rstr.length>0)
          result.push(rstr);
        break;
      }
      if(rstr[0] == '"'){
        let cellendindex = rstr.indexOf('",');
        result.push(rstr.substring(0,cellendindex+1));
        rstr= rstr.substring(cellendindex+2);
      }else{
        let cellendindex = rstr.indexOf(',');
        result.push(rstr.substring(0,cellendindex));
        rstr= rstr.substring(cellendindex+1);
      }
    }while(1);
    return result;
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headersRow:any) {
    let csvArr = [];
    console.log('-=============');
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = this.splitRowData(csvRecordsArray[i]);
      let excelRow= {};
      for(let j=0;j<headersRow.length;j++)
      {
        let celldata="";
        if(curruntRecord[j])
          celldata = curruntRecord[j].replace(/[^a-zA-Z0-9,;\-.!?' ]/g, '').trim();

        if(celldata.length != 0){
          let indexKey = headersRow[j].field;
          if(indexKey.includes('.')) {
            const keys = indexKey.split('.');
            // console.log({ keys })
            let parent = excelRow;
            for(let i = 0; i < keys.length-1; i++) {
              const key = keys[i];
              if(parent[key]) {
                parent = parent[key];
              } else {
                parent[key] = {};
                parent = parent[key];
              }
            }
            parent[keys[keys.length-1]] = celldata;
          }
          else{
            if (indexKey === 'id') {
              excelRow[headersRow[j].field] = celldata;
            }else{
              switch (headersRow[j].type) {
                case 'string':
                excelRow[indexKey] = celldata;
                break;
              case 'number':
                excelRow[indexKey] = Number(celldata);
                break;
              case 'date':
                if(!isNaN(new Date(celldata).getDate())) {
                  excelRow[indexKey] = celldata;
                }
                break;
              case 'set':
                {
                  console.log("set", celldata)
                  const value = `${celldata}`;
                  const trueBooleanStrings = [ 'true', 'yes', '1' ];
                  const falseBooleanStrings = [ 'false', 'no', '0' ];
                  console.log(value.toLowerCase(), 'indexKey=', indexKey)

                  if(trueBooleanStrings.includes(value.toLowerCase())) {
                    excelRow[indexKey] = true;
                  } else if(falseBooleanStrings.includes(value.toLowerCase())) {
                    excelRow[indexKey] = false;
                  }
                  break;
                }
              default:
                break;
              }
            }
          }
        }
      }
      if(Object.keys(excelRow).length>0)
        csvArr.push(excelRow);
    }
      return csvArr;
  }

  getHeaderArray(csvRecordsArr: any, realColumns:Record<string,any>) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      let cellValue = headers[j].replace(/[^a-zA-Z0-9,;\-.!?' ]/g, '');
      let field = cellValue;
      const index = realColumns.findIndex((el) => {
        return el.headerName === cellValue;
      });
      // console.log({ index, cellValue});
      if(index !== -1) {
        headerArray.push(realColumns[index]);
      } else {
        headerArray.push({
          field: cellValue,
          type: "string",
          headerName: cellValue,
        });
      }
    }
    return headerArray;
  }
  performAction() {
    if(this.tableName) {
      this.response = this.businessProvider.fetchReplaceRules(this.tableName).pipe(
        switchMap((replaceRules: any) => {
          console.log({ replaceRules, excelData: this.data })
          this.data.map((datum) => {
            replaceRules.map(({ field, from, to }) => {
              if(!field.includes('.')) {
                if(datum[field] === from) datum[field] = to;
              } else {
                const [ key1, key2 ] = field.split('.');
                if(datum[key1] && datum[key1][key2] === from) datum[key1][key2] = to;
              }
            })
          });
          return of({
            excelData: this.data,
            columns: this.realColumns
          })
        })
      )
    } else {
      this.response = of({
        excelData: this.data,
        columns: this.realColumns
      })
    }

    console.log('populated data = ', this.data, ', real columns = ', this.realColumns)
  }

}
