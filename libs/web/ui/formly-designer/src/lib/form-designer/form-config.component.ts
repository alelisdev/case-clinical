import { AllModules, RowDragEndEvent, RowNode } from '@ag-grid-enterprise/all-modules';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { BtnDeleteCellRenderer } from '../cell-renderers/delete-cell-renderer';
import { BtnEditCellRenderer } from '../cell-renderers/edit-cell-renderer';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entity } from './../Entity';
import { GridApi } from '@ag-grid-community/core';
import { BtnCopyCellRenderer } from '../cell-renderers/copy-cell-renderer';

@Component({
  selector: 'ui-formly-config',
  template: `
    <ag-grid-angular
      class="w-full h-full"
      [ngClass]="gridClassName"
      [defaultColDef]="defaultColDef"
      [rowDragManaged]="false"
      [animateRows]="true"
      [getDataPath]="getDataPath"
      [treeData]="true"
      [getRowNodeId]="getRightGridRowNodeId"
      [rowData]="[]"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [frameworkComponents]="frameworkComponents"
      [columnDefs]="columns"
      (rowDragEnd)="onRowDragEnd($event)"
      (gridReady)="gridReady($event)"
      [modules]="modules"
    >
    </ag-grid-angular>
    `
})
export class WebUiFormlyConfigComponent implements OnInit {
  @Input() formFieldEditCallback: (any) => void
  @Input() formFieldCopyCallback: (any) => void
  @Input() gridClassName = 'dark'
  @Input() canMove: (srcEntity, parentEntity) => boolean
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onGridReady = new EventEmitter<any>

  gridApi: GridApi;
  modules = AllModules;
  columns = []
  rowClass = 'border-gray-500 border-1'

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  };

  autoGroupColumnDef = {
    rowDrag: true,
    rowDragText: function (params, dragItemCount) {
      return params.rowNode.data.Title;
    },
    headerName: "Form Entities",
    cellRendererParams: {
      suppressCount: true
    },
    valueFormatter: (params) => {
      return params?.data?.Title;
    },
  };

  currentIndex = 0;
  entities: Entity[] = []

  frameworkComponents = {
    btnDeleteCellRenderer: BtnDeleteCellRenderer,
    btnEditCellRenderer: BtnEditCellRenderer,
    btnCopyCellRenderer: BtnCopyCellRenderer,
  }

  constructor(private confirmDialog: FuseConfirmationService) {
    this.moveToPath = this.moveToPath.bind(this)
  }

  ngOnInit(): void {
    this.columns = [
      { headerName: 'Label', field: "Label" },
      { headerName: 'Key', field: "Key" },
      { headerName: 'DataKey', field: "DataKey" },
      {
        maxWidth: 50,
        minWidth: 50,
        cellClass: "p-0",
        cellRenderer: "btnCopyCellRenderer",
        cellRendererParams: {
          clicked: this.formFieldCopyCallback
        }
      },
      {
        maxWidth: 50,
        minWidth: 50,
        cellClass: "p-0",
        cellRenderer: "btnEditCellRenderer",
        cellRendererParams: {
          clicked: this.formFieldEditCallback
        }
      },
      {
        maxWidth: 50,
        minWidth: 50,
        cellClass: "p-0",
        cellRenderer: "btnDeleteCellRenderer",
        cellRendererParams: {
          clicked: this.removeRowNode.bind(this)
        }
      },
      { headerName: 'ClassName', field: "ClassName" },
    ]
  }

  gridReady($event) {
    this.gridApi = $event.api;
    this.onGridReady.emit($event)
  }

  onRowDragEnd(event: RowDragEndEvent) {
    // this is the row the mouse is hovering over
    if(event.node.data.fromToolbox) {
      return;
    }
    var overNode = event.overNode;

    if (!overNode) {
      return;
    }

    // wrapper to drop into is where we are going to move the field/wrapper to
    var wrapperToDropInto =
      overNode.data.IsWrapper
        ? // if over a wrapper, we take the immediate row
        overNode
        : // if over a field, we take the parent row (which will be a wrapper)
        overNode.parent;
    // the data we want to move
    var movingData = event.node.data;

    // Check whether we can move current node to the target
    if(!this.canMove(movingData, wrapperToDropInto?.data)) return;

    // take new parent path from parent, if data is missing, means it's the root node,
    // which has no data.
    const newParentId = wrapperToDropInto!.data
      ? wrapperToDropInto!.data.id.split('/')
      : [];
    var needToChangeParent = !this.areParentsEqual(newParentId, movingData.id.split('/'));
    // check we are not moving a wrapper into a child wrapper
    var invalidMode = this.isSelectionParentOfTarget(event.node, wrapperToDropInto);
    if (invalidMode) {
      console.log('invalid move');
    }
    if (needToChangeParent && !invalidMode) {
      const updatedRows: any[] = [];
      this.moveToPath(newParentId, event.node, updatedRows);
      this.gridApi.applyTransaction({
        update: updatedRows,
      });
      this.gridApi.clearFocusedCell();
    }
    
    if(!needToChangeParent) {
        // the list of rows we have is data, not row nodes, so extract the data
        const movingData = event.node.data;
        let overData = overNode!.data;

        if(movingData !== overData) {
          const immutableStore = []
          this.gridApi.forEachNode((node) => {
            immutableStore.push(node.data)
          })
          const fromIndex = immutableStore.indexOf(movingData);
          const toIndex = immutableStore.indexOf(overData);
          
          this.gridApi.applyTransaction({
            remove: [movingData],
            add:[movingData],
            addIndex:(fromIndex<toIndex)?toIndex-1:toIndex
          });
          
          this.gridApi.applyTransaction({
            remove: [overData],
            add:[overData],
            addIndex:fromIndex
          });
          this.gridApi.clearFocusedCell();
        }
    }
  }

  // this updates the filePath locations in our data, we update the data
  // before we send it to AG Grid
  moveToPath(
    newParentId: string[],
    node: RowNode,
    allUpdatedNodes: any[]
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const me = this;
    // last part of the file path is the file name
    const oldId = node.data.id.split('/');
    const fileName = oldId[oldId.length - 1];
    const newChildId = newParentId.slice();
    newChildId.push(fileName);
    node.data.id = newChildId.join('/');
    allUpdatedNodes.push(node.data);
    if (node.childrenAfterGroup) {
      node.childrenAfterGroup.forEach(function (childNode) {
        me.moveToPath(newChildId, childNode, allUpdatedNodes);
      });
    }
  }

  isSelectionParentOfTarget(
    selectedNode: RowNode,
    targetNode: RowNode | null
  ) {
    const children = [...(selectedNode.childrenAfterGroup || [])];
    if (!targetNode) {
      return false;
    }
    while (children.length) {
      const node = children.shift();
      if (!node) {
        continue;
      }
      if (node.key === targetNode.key) {
        return true;
      }
      if (node.childrenAfterGroup && node.childrenAfterGroup.length) {
        children.push(...node.childrenAfterGroup);
      }
    }
    return false;
  }

  areParentsEqual(parentId: string[], childId: string[]) {
    if ((parentId.length + 1) !== childId.length) {
      return false;
    }

    let equal = true;
    parentId.forEach(function (item, index) {
      if (childId[index] !== item) {
        equal = false;
      }
    });
    return equal;
  }

  getRightGridRowNodeId = data => {
    return data.uniqueId;
  };



  getRowClass(params) {
    const colors = [
      'bg-blue-200',
      'bg-green-200',
      'bg-red-200',
      'bg-amber-200',
      'bg-zinc-500',
    ];
    if(params.node.level < colors.length) {
      return colors[params.node.level];
    }
    return 'bg-white';
  }


  removeRowNode(params) {
    const allRemovedNodes = []
    this.removeFromPath(params.node, allRemovedNodes)
    params.api.applyTransaction({ remove: allRemovedNodes })
    return;

    this.confirmDialog.open({
      title: params.node.data.IsWrapper ? 'Remove Wrapper' : 'Remove Field',
      message: params.node.data.IsWrapper ? 'Are you sure want to delete this wrapper and subseqent children?' : 'Are you sure want to delete this field'
    }).afterClosed().subscribe(result => {
      if(result === 'confirmed') {
        const allRemovedNodes = []
        this.removeFromPath(params.node, allRemovedNodes)
        params.api.applyTransaction({ remove: allRemovedNodes })
      }
    })
  }

  removeFromPath(node: RowNode, allRemovedNodes: any[]) {
    allRemovedNodes.push(node.data);
    if(node.childrenAfterGroup) {
      node.childrenAfterGroup.forEach((childNode: RowNode) => {
        this.removeFromPath(childNode, allRemovedNodes)
      })
    }
  }

  getDataPath(data) {
    return data.id.split('/'); // path: "Erica/Malcolm"
  }
}
