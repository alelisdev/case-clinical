import { WebUiToastService } from './../../../../toast/src/lib/web-ui-toast.service';
import { AllModules, RowDragEndEvent, RowNode } from '@ag-grid-enterprise/all-modules';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { BtnDeleteCellRenderer } from '../cell-renderers/delete-cell-renderer';
import { BtnEditCellRenderer } from '../cell-renderers/edit-cell-renderer';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entity } from '../Entity';
import { GridApi } from '@ag-grid-community/core';
import { BtnCopyCellRenderer } from '../cell-renderers/copy-cell-renderer';

@Component({
  selector: 'ui-fields-tree',
  template: `
    <ag-grid-angular
      class="w-full h-full"
      [ngClass]="gridClassName"
      [defaultColDef]="defaultColDef"
      [rowDragManaged]="false"
      [animateRows]="true"
      [rowSelection]="'single'"
      [getDataPath]="getDataPath"
      (selectionChanged)="selectionChanged()"
      [treeData]="true"
      [getRowNodeId]="getRightGridRowNodeId"
      [rowData]="[]"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [frameworkComponents]="frameworkComponents"
      [columnDefs]="columns"
      (gridReady)="gridReady($event)"
      (rowDragEnd)="onRowDragEnd($event)"
      [modules]="modules"
    >
    </ag-grid-angular>
    `
})
export class WebUiFieldsTreeComponent implements OnInit {
  @Input() formFieldDeleteCallback: (any) => void
  @Input() formFieldCopyCallback: (any) => void
  @Input() gridClassName = 'dark'
  @Input() canMove: (srcEntity, parentEntity) => boolean

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onGridReady = new EventEmitter<any>
  @Output() fieldSelected = new EventEmitter()
  @Output() orderChanged = new EventEmitter();

  gridApi: GridApi;
  modules = AllModules;
  columns = [

  ]

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

  constructor(
    private confirmDialog: FuseConfirmationService,
    private toast: WebUiToastService,
  ) {

  }

  ngOnInit(): void {
    this.columns = [
      { field: 'Label', headerName: 'Label' }
    ]
  }

  selectionChanged() {
    const selected = this.gridApi.getSelectedRows()[0];
    const selectedNode = this.gridApi.getSelectedNodes()[0];

    this.fieldSelected.emit(selectedNode)
  }

  gridReady($event) {
    this.gridApi = $event.api;
    this.onGridReady.emit($event)
  }

  getRightGridRowNodeId = data => {
    return data.uniqueId;
  };


  getDataPath(data) {
    return data.id.split('/'); // path: "Erica/Malcolm"
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

  onRowDragEnd(event: RowDragEndEvent) {
    // this is the row the mouse is hovering over
    if(event.node.data.fromToolbox) {
      return;
    }
    const overNode = event.overNode;

    if (!overNode) {
      return;
    }

    // wrapper to drop into is where we are going to move the field/wrapper to
    const wrapperToDropInto =
      overNode.data.IsWrapper
        ? // if over a wrapper, we take the immediate row
        overNode
        : // if over a field, we take the parent row (which will be a wrapper)
        overNode.parent;
    // the data we want to move
    const movingData = event.node.data;

    // Check whether we can move current node to the target
    if(!this.canMove(movingData, wrapperToDropInto?.data)) return;

    // take new parent path from parent, if data is missing, means it's the root node,
    // which has no data.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newParentId = wrapperToDropInto!.data
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? wrapperToDropInto!.data.id.split('/')
      : [];
    const needToChangeParent = !this.areParentsEqual(newParentId, movingData.id.split('/'));
    // check we are not moving a wrapper into a child wrapper
    const invalidMode = this.isSelectionParentOfTarget(event.node, wrapperToDropInto);
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

      this.orderChanged.emit();
    }

    if(!needToChangeParent) {
      const srcNode = event.node;
      const targetNode = overNode;
      this.swapOrder(srcNode, targetNode)
    }
  }

  // Move Row Node under the same parent
  moveDown(srcNode: RowNode) {
    console.log('move down')
    if(!srcNode) return;

    const parentNode = srcNode.parent;
    const siblings = parentNode.childrenAfterGroup;
    const siblingsCount = siblings?.length;
    if(siblingsCount > 1) {
      const currentNodeIndex = siblings.findIndex((node) => node.id === srcNode.id)
      let targetNode = null;
      switch(currentNodeIndex) {
        case siblingsCount-1:
          this.toast.error('Current node is already at the bottom of the parent');
          return;
        default:
          targetNode = siblings[currentNodeIndex+1];
          this.swapOrder(srcNode, targetNode)
          break;
      }
    } else {
      this.toast.error('You cannot move down the current node because only one node exists')
    }
  }

  // Move Row Node under the same parent
  moveUp(srcNode: RowNode) {
    console.log('move up')
    if(!srcNode) return;

    const parentNode = srcNode.parent;
    const siblings = parentNode.childrenAfterGroup;
    const siblingsCount = siblings?.length;
    if(siblingsCount > 1) {
      const currentNodeIndex = siblings.findIndex((node) => node.id === srcNode.id)
      let targetNode = null;
      switch(currentNodeIndex) {
        case 0:
          this.toast.error('Current node is already at the top of the parent');
          return;
        default:
          targetNode = siblings[currentNodeIndex-1];
          this.swapOrder(srcNode, targetNode)
          break;
      }
    } else {
      this.toast.error('You cannot move down because only one node exists')
    }
  }

  private swapOrder(srcNode: RowNode, targetNode: RowNode) {
    // the list of rows we have is data, not row nodes, so extract the data
    const movingData = srcNode.data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const overData = targetNode!.data;
    if(movingData !== overData) {
      const immutableStore = []
      this.gridApi.forEachNode((node) => {
        immutableStore.push(node.data)
      })
      const fromIndex = immutableStore.indexOf(movingData);
      const toIndex = immutableStore.indexOf(overData);
      const newStore = immutableStore.slice();
      moveInArray(newStore, fromIndex, toIndex);
      // this.gridApi.setRowData(newStore);
      this.gridApi.setRowData(newStore)
      this.gridApi.clearFocusedCell();

      this.orderChanged.emit(true);
    }

    function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
      const element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  }
}
