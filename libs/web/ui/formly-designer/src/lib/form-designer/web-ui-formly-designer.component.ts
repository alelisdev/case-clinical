import { WebUiToastService } from './../../../../toast/src/lib/web-ui-toast.service';
import { Component, TemplateRef, Output, EventEmitter, Input, ViewChild, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { GridApi } from '@ag-grid-community/core';
import { Entity } from '../Entity';
import { FuseConfigService } from '@fuse/services/config/config.service';
import { RowNode } from '@ag-grid-enterprise/all-modules';

export interface ITypeaheadContext<T> {
  type: T
  dataSource: Observable<T>
  add<T>(item: T): Observable<T>
  filter<T>(subject: string): Observable<T>
}

@Component({
  selector: 'ui-formly-designer',
  templateUrl: "./web-ui-formly-designer.component.html"
})
export class WebUiFormlyDesignerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() type: 'Template'|'Component'|'Wrapper' = 'Template';
  @ViewChild('editTpl') editTpl!: TemplateRef<any>;
  @ViewChild('submitEditTpl') submitEditTpl!: TemplateRef<any>;
  @ViewChild('routerKeysEditTpl') routerKeysEditTpl!: TemplateRef<any>;
  @Input() schema: string;
  @Input() customLayouts: any = {};
  @Input() submitAction: string;
  @Input() testData: string;
  @Input() modelData: string;
  @Input() routerKeys: string[] = [];
  @Output() schemaDidChange = new EventEmitter<any>()

  currentIndex = 0;
  isNew = false
  node = null;

  editMode = 1;

  leftApi: GridApi;
  rightApi: GridApi;
  previewGridApi: GridApi;

  gridClassName$ = this.configService.agGridClassName$;

  constructor(public readonly dialog: DialogService, private toast: WebUiToastService, private configService: FuseConfigService) {
  }

  ngOnInit(): void {
    console.log({ editMode: this.editMode })
    console.log('formly designer ngOnInit: modelData = ', this.modelData);
  }

  ngAfterViewInit(): void {
    console.log('EditTpl = ', this.editTpl);
  }

  ngOnDestroy(): void {
    this.leftApi = null;
    this.rightApi = null;
    this.editMode = 0;
  }

  formFieldEditCallback(params) {
    this.node = params.node;
    this.openFieldEditDlg();
  }

  formFieldCopyCallback(params) {
    const nodesToDuplicate = []
    this.duplicate(params.node, params.node.parent?.data?.id ?? null, nodesToDuplicate);
    this.rightApi.applyTransaction({
      add: nodesToDuplicate
    });
  }

  duplicate(node, parentId: string, nodesToDuplicate: Entity[]) {
    const nodeToCopy = node;
    const cloned = nodeToCopy.data.clone(String(this.currentIndex), parentId);

    nodesToDuplicate.push(cloned);
    this.currentIndex += 1;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const me = this;
    if (node.childrenAfterGroup) {
      node.childrenAfterGroup.forEach(function (childNode) {
        me.duplicate(childNode, cloned.id, nodesToDuplicate)
      });
    }
  }

  onGridReady(params, side) {
    if (side === 0) {
      this.leftApi = params.api
      this.leftApi.setSuppressRowClickSelection(false);
    }

    if (side === 1) {
      this.currentIndex = 0;
      this.rightApi = params.api;
      this.addGridDropZone();
      const schemaData = this.schema ? JSON.parse(this.schema) : []
      const tableData = this.analyzeSchema(schemaData)
      this.rightApi.applyTransaction({ add: tableData })
    }

    if(side === 2) {
      this.previewGridApi = params.api;
      this.currentIndex = 0;
      const schemaData = this.schema ? JSON.parse(this.schema) : []
      const tableData = this.analyzeSchema(schemaData)
      params.api.applyTransaction({ add: tableData })
    }
  }

  analyzeSchema(schema: any[]) {
    return this.analyzeChildSchema(schema, null)
  }

  analyzeChildSchema(schema, parent) {
    let data = []
    schema.map((template, index) => {
      const entity = Entity.fromTemplate(template, String(this.currentIndex++), parent ? parent.id : null)
      data.push(entity)
      if(entity.IsWrapper) {
        const fields = entity.pushFieldGroup();
        if(fields) {
          const childs = this.analyzeChildSchema(fields, entity);
          data = data.concat(childs)
        }
      }
    })
    return data;
  }

  warn(message: string) {
    this.toast.error(message, { duration: 3000 })
  }

  // Check whether new form field element can be placed under the parent element
  canPlaceFormField(newElement: Entity, parentElement: Entity, parentNode: RowNode): boolean {
    const parentType = parentElement?.type;
    const childType = newElement.type;
    console.log('parent type = ', parentType, ', child type = ', childType)

    if(!parentElement) {   // This means that newElment will be placed under the root element
      if(childType === 'tab' || childType == 'step') {
        this.warn('Tab or Step wrapper are only allowed under the Tabs or Stepper wrapper');
        return false;
      } else if(childType === 'filter-bar' || childType === 'filter-content') {
        this.warn('Filter-bar and Filter-content are only allowed under the Filter-container wrapper');
        return false;
      }
      else {
        return true;
      }
    }

    // In order to avoid complicated things, allow stepper and tabs only under the root element
    // if(childType === 'stepper' || childType === 'tabs' || childType === 'filter-container') {
    //   console.log({ parentType, dd: parentType === 'overview-header' })
    //   if(parentType === 'overview-header') return true;

    //   this.warn('Stepper, Tabs and FilterContainer wrappers are allowed only under the root elements');
    //   return false;
    // }

    // If parent element is not wrapper but leaf element like input, number etc, then prevent placement
    if(!parentElement.IsWrapper) {
      this.warn('Cannot place under the basic field');
      return false;
    }

    // Only allow tab wrapper under the tabs wrapper
    if(parentType === 'tabs' && childType !== 'tab') {
      this.warn('Only tab wrapper is allowed under the tabs wrapper');
       return false;
    } else if(childType === 'tab' && parentType !== 'tabs') {
      this.warn('Tab wrapper is only allowed under the tabs wrapper');
      return false;
    }

    // Only allow step wrapper under the stepper wrapper
    if(parentType === 'stepper' && childType !== 'step') {
      this.warn('Only step wrapper is allowed under the stepper wrapper');
        return false;
     } else if(childType === 'step' && parentType !== 'stepper') {
      this.warn('Step wrapper is only allowed under the stepper wrapper');
       return false;
     }

   //Only allow table-column wrapper under the table wrapper
    if (parentType === 'table' && childType !== 'table-column' && childType !== 'table-row') {
      this.warn('Only table-column, tabl-row wrapper is allowed under the table wrapper');
      return false;
    }
    else if (childType === 'table-column' && parentType !== 'table' && parentType !== 'table-row') {
      this.warn('Table-column wrapper is only allowed under the table wrapper, table-row wrapper');
      return false;
    }else if(childType === 'table-row' && parentType !== 'table'){
      this.warn('Talbe-row wrapper is only allowed under the table wrapper');
      return false;
    }else if(parentType === 'table-row' && childType !== 'table-column'){
      this.warn('Only table-column wrapper is only allowed under the tabel-row wrapper');
      return false;
    }


    // Only allow filter-bar and filter-content wrapper under the filter-container wrapper
    if(parentType === 'filter-container' && !['filter-bar', 'filter-content'].includes(childType)) {
      this.warn('Only filter-bar and filter-content wrappers are allowed under the filter-container wrapper');
        return false;
     } else if(['filter-bar', 'filter-content'].includes(childType) && parentType !== 'filter-container') {
      this.warn(childType + ' wrappers are only allowed under the filter-container wrapper');
       return false;
     }

    // Allow only one filter-bar and filter-content under the filter-container wrapper
    if(['filter-bar', 'filter-content'].includes(childType) && parentType === 'filter-container') {
      if(parentNode.childrenAfterGroup) {
        const childNodes = parentNode.childrenAfterGroup;
        const node = childNodes.find(el => el.data.type === childType);
        if(node) {
          this.warn(`${childType} has been already added to filter-container wrapper`);
          return false;
        } else
          return true;
      } else {
        return true;
      }
    }
    // Check whether the target wrapper is moving element itself or its child element
    if(newElement.IsWrapper) {
      if(newElement.uniqueId === parentElement.uniqueId) {
        this.warn('Moving into itself is not allowed');
        return false;

      } else if(parentElement.ID.startsWith(newElement.ID)) {
        this.warn('Moving into children is not allowed');
        return false;
      }
    }
    return true;
  }

  addGridDropZone() {
    const dropZoneParams = this.rightApi.getRowDropZoneParams({

      onDragStop: params => {
        const nodes = params.nodes;
        nodes?.forEach(function (node) {
          node.setSelected(false);
        });
        const overNode = params.overNode;
        let wrapperToDropInto = null;
        if(overNode) {
          wrapperToDropInto =
            overNode.data.IsWrapper
              ? // if over a wrapper, we take the immediate row
              overNode
              : // if over a field, we take the parent row (which will be a wrapper)
              (
                overNode.level === 0 ? null : overNode.parent
              );
        }
        const parentId = wrapperToDropInto ? wrapperToDropInto.data.id : null;
        const newEntity = Entity.fromTemplate(JSON.parse(params.node.data.template), String(this.currentIndex), parentId)

        if(this.canPlaceFormField(newEntity, wrapperToDropInto?.data, wrapperToDropInto)) {
          this.currentIndex += 1
          params.api.applyTransaction({
            add: [ newEntity ]
          })
        }
      }
    });

    this.leftApi.addRowDropZone(dropZoneParams);
  }

  close() {
    if(this.isNew) {
      this.isNew = false;
      this.rightApi.applyTransaction({ remove : [this.node] })
    }
    this.node = false;
  }

  testDataDidChange(data) {
    this.testData = data;
  }

  modelDataDidChange(data) {
    console.log('formly designer: modelData = ', data);
    this.modelData = data;
  }

  toggleEditMode() {
    this.saveFormConfig();
    if(this.editMode === 0) {
      this.leftApi = null;
      this.rightApi = null;
    }
    this.editMode= this.editMode === 1 ? 0 : 1
  }

  saveFormField(data) {
    this.rightApi.applyTransaction({ update : [data] })
    this.node = false;
    this.isNew = false;
  }

  saveFormConfig() {
    const topLevelFields = []
    const gridApi = this.editMode === 0 ? this.rightApi : this.previewGridApi;

    gridApi.forEachNode(node =>  {
      if(node.level === 0) {
        if(node.data.IsWrapper) {
          node.data.clearChildren();
        }
        topLevelFields.push(node.data.Template)
      } else {
        if(node.data.IsWrapper) {
          node.data.clearChildren();
        }
        node.parent.data.addChildren(node.data.Template)
      }
    })
    this.schemaDidChange.emit({ schema: topLevelFields, submitAction: this.submitAction, testData: this.testData, modelData: this.modelData, routerKeys: this.routerKeys})
  }

  openSubmitActionEditDlg() {
    this.dialog.open(this.submitEditTpl, {
      width: '70%', height: '100%', closeButton: false, data: this.submitAction
    })
  }

  openRouterKeysEditDlg() {
    this.dialog.open(this.routerKeysEditTpl, {
      width: '70%', height: '100%', closeButton: false, data: this.routerKeys
    })
  }

  openFieldEditDlg() {
    this.dialog.open(this.editTpl, {
      width: '100%', height: '100%', closeButton: false
    })
  }
}
