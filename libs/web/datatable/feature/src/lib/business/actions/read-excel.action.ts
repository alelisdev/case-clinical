import { BusinessActionBase } from './business-action-base'
import { catchError, EMPTY, Observer, Observable, of, switchMap } from 'rxjs'
import { IsExcelFile, IsNotNullOrUndefined } from '@schema-driven/rules-engine'
import * as XLSX from 'xlsx'
export class ReadExcelAction extends BusinessActionBase<any> {
    constructor(private file: File) {
        super('ReadExcelAction')
    }

    preValidateAction() {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'FileIsNotValid',
                'Import file should not be null',
                this.file,
                true
            )
        ).addRule(
            new IsExcelFile(
                'FileIsNotValid',
                'Import file should be in xlxs format',
                this.file.name,
                true
            )
        )
    }

    performAction() {

        this.response = new Observable((observer: Observer<any>) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                const arrayBuffer = fileReader.result;
                const data = new Uint8Array(arrayBuffer as ArrayBuffer);
                const arr = [];
                for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                const byteStr = arr.join("");
                let worksheet;
                if(this.file.name.split('.').slice(-1)[0] == 'xlsx'){
                    const workbook = XLSX.read(byteStr, { type: "binary" });
                    const first_sheet_name = workbook.SheetNames[0];
                    worksheet = workbook.Sheets[first_sheet_name];
                }
                if(this.file.name.split('.').slice(-1)[0] == 'csv'){
                    worksheet = byteStr.split(/\r?\n/);
                }
                observer.next(worksheet)
                observer.complete()
            }
            fileReader.readAsArrayBuffer(this.file);
        })
    }
}
