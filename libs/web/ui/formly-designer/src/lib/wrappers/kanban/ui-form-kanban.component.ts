import { Component, OnDestroy, OnInit, Output, EventEmitter, ElementRef, HostListener, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable, Subject, takeUntil } from 'rxjs';
import { UiFormBaseField } from '../../../../../form/src/lib/types/base-field-type';
import { getValueForKey, groupBy } from '@case-clinical/shared/util/helpers';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DialogService } from '@ngneat/dialog';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { DataContextService } from 'libs/web/ui/form/src/lib/context-provider/data-context.service';
import { FormService } from '@case-clinical/web/ui/form';
import { TailwindService } from '../../services/tailwind.service';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { cloneDeep } from 'lodash';

@Component({
  template: `
  <div class="w-full h-full flex items-start gap-2 overflow-auto kanban-wrapper" #dragScroll cdkDropListGroup>
    <ng-container *ngFor="let datum of kanbanData; let i = index">
        <div
            cdkDropList
            [id]="datum['id']"
            [cdkDropListData]="datum['data']"
            (cdkDropListDropped)="cardDropped($event)"
            class="flex-0 w-96">
            <div
                class="flex items-center justify-between pt-2 pr-2">
                <div class="flex items-center w-full py-2 px-3 rounded-md cursor-text border border-transparent text-xl font-bold focus-within:bg-white focus-within:shadow-sm focus-within:border-primary dark:focus-within:bg-gray-900">
                  {{ datum['key'] }}
                </div>
                <div class="flex items-center justify-center min-w-6 ml-4 text-sm font-semibold leading-6 rounded-full bg-gray-200 text-secondary dark:bg-gray-700">
                    {{datum['data']?.length ?? 0}}
                </div>
            </div>

            <!-- Cards -->
            <div class="dark:border">
                <div class="p-2 pb-0 cursor-pointer">
                    <!-- Card -->
                    <ng-container *ngFor="let card of datum['data'];">
                        <div (click)="open(card, datum['key'])" cdkDrag class="flex flex-col items-start mb-4 p-0 space-y-3 shadow rounded-lg overflow-hidden bg-card">
                          <ui-context-provider class="flex w-full" [data]="card">
                            <formly-field [field]="verticalItemField">
                            </formly-field>
                          </ui-context-provider>
                        </div>
                    </ng-container>
                </div>
            </div>
        </div>
    </ng-container>
  </div>

  <ng-template #dlg let-ref>
    <ui-form-kanban-modal
      class="overflow-auto"
      [model]="ref.data.cardData"
      [formName]="ref.data.formName"
      [store]="ref.data.store"
      [showSubmitButton]="ref.data.showSubmitButton"
    ></ui-form-kanban-modal>
  </ng-template>
  `,
  styleUrls: ['./ui-form-kanban.component.scss']
})
export class UiFormKanbanComponent extends UiFormBaseField implements OnInit, OnDestroy {
  @Output() cardGroupChanged: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild('dlg') dlgTpl!: TemplateRef<any>;
  @ViewChild('dragScroll') dragScroll: ElementRef;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  groupIdProp
  ref;
  verticalItemField: FormlyFieldConfig;
  cardModalFormNames: Record<string, string> = {};

  kanbanData = []
  groupOrders = {}

  allGroups: string[] = [];

  dataKey;
  dragging = false;

  scrollLeft = 0;

  pos = { x: 0, left: 0 };

  ele;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    event.preventDefault();
    if(this.dragging) {
      const dx = event.clientX - this.pos.x;
      this.ele['scrollLeft'] = this.pos.left - dx;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    if(event.srcElement.classList?.contains('kanban-wrapper')) {
      event.preventDefault();
      this.pos.x = event.clientX;
      this.pos.left = this.ele['scrollLeft'];
      this.dragging = true;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  mouseup(event) {
    this.dragging = false;
  }

  constructor(
    private readonly dialog: DialogService,
    private toast: WebUiToastService,
    apiService: WebCoreDataAccessService,
    cd: ChangeDetectorRef,
    service: DataContextService,
    formService: FormService,
    tailwindService: TailwindService,
    cdr: ChangeDetectorRef,
    elementRef: ElementRef
  ) {
    super(apiService, cd, service, formService, tailwindService, cdr, elementRef);
  }

  ngOnInit(): void {
    super.ngOnInit();

    const modalFormNames = this.to.modalFormNames ?? [];

    modalFormNames.map(({ groupKey, order, formName }) => {
      this.cardModalFormNames[groupKey] = formName;
      this.groupOrders[groupKey] = order ?? 9999;
      this.allGroups.push(groupKey);
    });

    this.groupIdProp = this.to.groupIdProp ?? 'id';
    this.dataKey = this.to.dataKey;
    if (this.dataKey && this.to.groupKey) {
      if(this.field.fieldGroup.length > 0) {
        this.verticalItemField = this.field.fieldGroup[0];
      }
      const source = this.service.getValue(this.dataKey);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          this.populateData(data);
          this.cd.detectChanges();
          console.log(data);
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) {
            const data = this.formService.getValueForKey(this.dataKey, _data);
            this.populateData(data);
            this.cd.detectChanges();
          }
        })
      }
    }
  }

  ngAfterViewInit():void {
    this.ele = this.dragScroll.nativeElement;
    this.ele.scrollTop = 500;
  }

  populateData(data: any) {
    this.ref?.close();
    console.log({ data })
    const groupedData = groupBy(data, (item) => getValueForKey(this.to.groupKey, item));
    console.log({ groupedData })
    if(groupedData) {
      const groupsInData = [];
      this.kanbanData = [];
      for(const key in groupedData) {
        const firstGroupData = groupedData[key].at(0);
        this.kanbanData.push({
          key: key !== 'null' ? key : 'UnAllocated',
          id: this.formService.getValueForKey(this.groupIdProp, firstGroupData),
          order: this.groupOrders[key] ?? 9999,
          data: groupedData[key],
        });
        if(key)
          groupsInData.push(key);
      }

      const remainedGroups = this.allGroups.filter((el) => !groupsInData.includes(el));
      console.log({ remainedGroups })
      if(remainedGroups.length > 0) {
        for(const index in remainedGroups) {
          this.kanbanData.push({
            key: remainedGroups[index],
            id: `undefined_${index}`,
            order: this.groupOrders[remainedGroups[index]] ?? 9999,
            data: [],
          });
        }
      }
      this.kanbanData = this.kanbanData.sort((a, b) => a.order - b.order);
      console.log(this.kanbanData);
    }
  }

  /**
   * Card dropped
   *
   * @param event
   */
  cardDropped(event: CdkDragDrop<any[]>): void {
    // Move or transfer the item
    if (event.previousContainer === event.container) {
      // Move the item
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      console.log(event.container.id)

      if(event.container.id) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        event.container.data[event.currentIndex].listId = event.container.id;
        const newGroupName = this.kanbanData.find((el) => el['id'] === event.container.id)['key'];
        let newGroupId = event.container.id;
        if(newGroupId.startsWith('undefined')) newGroupId = undefined;
        console.log({ newGroupName, newGroupId });
        if(this.to.cardGroupChanged) this.to.cardGroupChanged(event.container.data[event.currentIndex], newGroupId, newGroupName);
      }
    }
  }

  open(cardData: any, groupKey: string): void {
    if(!this.cardModalFormNames[groupKey]) {
      this.toast.warning(`Please provide formName for groupName ${groupKey}`);
      return;
    }

    let showSubmitButton = this.to.showSubmitButton;
    if(showSubmitButton === undefined) showSubmitButton = false;

    this.ref = this.dialog.open(this.dlgTpl, {
      data: {
        cardData: cloneDeep(cardData),
        formName: this.cardModalFormNames[groupKey],
        store: this.formState['store'],
        showSubmitButton
      },
      closeButton: false,
      height: 'auto',
      width: 'auto',
    })
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
