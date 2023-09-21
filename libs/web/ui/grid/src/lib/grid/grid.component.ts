import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core'
import { DialogService } from '@ngneat/dialog';
import { FuseConfigService } from '@fuse/services/config/config.service'
import { cloneDeep } from 'lodash';
@Component({
  selector: 'web-ui-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent  {
  @ViewChild('editTpl') editTpl!: TemplateRef<any>;
  @ViewChild('createTpl') createTpl!: TemplateRef<any>;
  @Input() data = [];
  @Input() title = 'Title';
  @Input() onSave: ((data: any) => void) | undefined
  @Input() listTemplate?: TemplateRef<any>
  @Input() editTemplate?: TemplateRef<any>
  @Input() createTemplate?: TemplateRef<any>
  @Input() readOnly = false;
  @Output() saveButtonDidClick = new EventEmitter();

  constructor(
    private configService: FuseConfigService,
    private dialogService: DialogService,
  ) {
    // super();
    this.itemDidSelect = this.itemDidSelect.bind(this);
  }

  itemDidSelect(selected: any) {
    if(this.readOnly) return;
    this.dialogService.open(this.editTpl, {
      data:{...selected},
      width: 'auto',
      minHeight: '200px',
    })
  }

  onCreate() {
    console.log('onCreate')
    this.dialogService.open(this.createTpl, {
      data: null,
      width: 'auto',
      minHeight: '200px'
    })
  }
  getCloneValue(item:any){
    return cloneDeep(item);
  }
}
