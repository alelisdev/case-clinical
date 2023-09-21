import { Component, EventEmitter, Output } from "@angular/core";
import { TableViewConfigStore } from "../table-view-config.store";

export enum ColumnOption {
    VISIBLE,
    NAME,
    ALL
}

export enum FileFormat {
    CSV,
    EXCEL
}

export enum DateFormat {
    NORMAL,
    ISO,
    POSIX
}

export enum TimeFormat {
    DATE_ONLY,
    HH_MM,
    HH_MM_SS,
    HH_MM_SS_SSSXXX
}

export interface ExportConfig {
    columnOption: ColumnOption,
    fileFormat: FileFormat,
    dateFormat: DateFormat,
    timeFormat: TimeFormat,
    fileName: string,
}

@Component({
    selector: 'table-export',
    templateUrl: './table-export.html'
})
export class TableExportComponent {
    @Output() exportBtnDidClick: EventEmitter<ExportConfig> = new EventEmitter<ExportConfig>()

    selectedColOptionId = 0
    columnOptions = [
        'Visible Columns',
        'Name Only',
        'All Columns'
    ]

    selectedFormatId = 0
    fileFormats = [
        'CSV',
        'Excel'
    ]

    selectedDateFormatId = 0
    dateFormats = [
        'Normal',
        'ISO',
        'POSIX'
    ]

    selectedTimeFormatId = 0
    timeFormats = [
        'DateOnly',
        'hh:mm',
        'hh:mm:ss',
        'hh:mm:ss.ssssxxx'
    ]

    constructor(private configStore?: TableViewConfigStore) {

    }

    onExportButtonClicked() {
        let columnOption = ColumnOption.ALL;
        let fileFormat = FileFormat.EXCEL;
        let dateFormat = DateFormat.NORMAL;
        let timeFormat = TimeFormat.DATE_ONLY;

        switch(this.selectedColOptionId) {
            case 0:
                columnOption = ColumnOption.VISIBLE;
                break;
            case 1:
                columnOption = ColumnOption.NAME;
                break;
            default:
                break;
        }
        if(this.selectedFormatId == 0) {
            fileFormat = FileFormat.CSV;
        }
        switch(this.selectedDateFormatId) {
            case 1:
                dateFormat = DateFormat.ISO;
                break;
            case 2:
                dateFormat = DateFormat.POSIX;
                break;
            default:
                break;
        }
        if(this.selectedTimeFormatId == 1) {
            timeFormat = TimeFormat.HH_MM;
        }
        switch(this.selectedTimeFormatId) {
            case 1:
                timeFormat = TimeFormat.HH_MM;
                break;
            case 2:
                timeFormat = TimeFormat.HH_MM_SS;
                break;
            case 3:
                timeFormat = TimeFormat.HH_MM_SS_SSSXXX;
                break;
            default:
                timeFormat = TimeFormat.DATE_ONLY;
                break;
        }
        this.configStore.exportName$.subscribe((fileName) => {
          const _fileName = (fileFormat===FileFormat.EXCEL) ? `${fileName}.xlsx` : `${fileName}.csv`;
          console.log({ fileName: _fileName })
          this.exportBtnDidClick.emit({
              columnOption: columnOption,
              fileFormat,
              dateFormat,
              timeFormat,
              fileName: _fileName
          })
        }).unsubscribe();
    }
}
