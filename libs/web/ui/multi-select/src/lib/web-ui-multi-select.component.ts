import { FormControl } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core'

@Component({
  selector: 'ui-multi-select',
  styles: [
    `
      [x-cloak] {
        display: none;
      }
      .svg-icon {
        width: 1em;
        height: 1em;
      }
      .svg-icon path,
      .svg-icon polygon,
      .svg-icon rect {
        fill: #333;
      }
      .svg-icon circle {
        stroke: #4691f6;
        stroke-width: 1;
      }
    `,
  ],
  template: `
    <div class="w-full flex flex-col h-auto">
      <div class="inline-block relative w-full">
        <div class="flex flex-col relative">
          <div (click)="(open)" class="w-full">
            <div class="my-2 p-1 flex border border-gray-200 bg-gray-50 rounded">
              <div class="flex flex-auto flex-wrap">
                <ng-container *ngFor="let option of selected; let i = index">
                  <div class="flex justify-center m-1 font-medium text-white py-1 px-1 rounded bg-primary border">
                    <span class="text-xs font-normal max-w-full flex-initial hidde">
                      {{ data[option][labelProp] }}
                    </span>
                    <div class="flex flex-auto flex-row-reverse">
                      <div (click)="remove(i, option)">
                        <svg class="fill-current h-4 w-4 " role="button" viewBox="0 0 20 20">
                          <path
                            d="M14.348,14.849c-0.469,0.469-1.229,0.469-1.697,0L10,11.819l-2.651,3.029c-0.469,0.469-1.229,0.469-1.697,0
                                         c-0.469-0.469-0.469-1.229,0-1.697l2.758-3.15L5.651,6.849c-0.469-0.469-0.469-1.228,0-1.697s1.228-0.469,1.697,0L10,8.183
                                         l2.651-3.031c0.469-0.469,1.228-0.469,1.697,0s0.469,1.229,0,1.697l-2.758,3.152l2.758,3.15
                                         C14.817,13.62,14.817,14.38,14.348,14.849z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </ng-container>
                <div *ngIf="selected.length === 0" class="flex-1" (click)="show = !show">
                  <input
                    placeholder="Select a option"
                    class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                    [value]="selectedValues()"
                  />
                </div>
              </div>
              <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                <button
                  type="button"
                  *ngIf="!show"
                  (click)="open()"
                  class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                >
                  <ui-icon size="lg" class="h-6 w-6" icon="chevronDown"></ui-icon>
                </button>
                <button
                  type="button"
                  *ngIf="show"
                  (click)="close()"
                  class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none transform rotate-180"
                >
                  <ui-icon size="lg" class="h-6 w-6 " icon="chevronDown"></ui-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div *ngIf="show" class="shadow-md  top-10 mb-3 bg-gray-50 z-40 w-full left-0 rounded max-h-select">
              <div class="flex flex-col w-full overflow-y-auto h-64">
                <ng-container *ngFor="let option of data; let i = index" class="overflow-auto">
                  <div
                    class="cursor-pointer w-full border-gray-100 rounded-t border-b  hover:bg-gray-100"
                    (click)="select(i, $event)"
                  >
                    <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                      <div class="w-full items-center flex justify-between">
                        <div class="mx-2 leading-6 text-black">{{ option[labelProp] }}</div>
                        <ui-icon *ngIf="selected.includes(i)" size="sm" class="h-4 w-4 text-gray-500" icon="check"></ui-icon>
                      </div>
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class WebUiMultiSelectComponent implements OnChanges {
  @Input() data: Array<any>
  @Input() values: Array<string>
  @Input() labelProp = 'value'
  @Input() valueProp = 'id'
  @Output() selectionDidChange = new EventEmitter();

  selected = []
  show = false

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data)
      this.data = changes.data.currentValue

    if(changes.values) {
      if(changes.values.currentValue) {
        const _selectedValues = changes.values.currentValue;
        const _selected = [];
        this.data.map((el, index) => {
          if(_selectedValues.includes(el[this.valueProp]))
            _selected.push(index);
        });
        this.selected = _selected;
      }
    }
  }

  open() {
    this.show = true
  }

  close() {
    this.show = false
  }

  isOpen() {
    return this.show === true
  }

  select(index, event) {
    if(this.selected.includes(index)) {
      this.selected = this.selected.filter(el => el !== index);
    } else {
      this.selected.push(index)
    }
    this.selectionDidChange.emit(this.selectedValues())
  }

  remove(index, option) {
    this.selected.splice(index, 1)
    this.selectionDidChange.emit(this.selectedValues())
  }

  selectedValues() {
    return this.selected.map((option) => {
      return this.data[option][this.valueProp]
    })
  }
}
