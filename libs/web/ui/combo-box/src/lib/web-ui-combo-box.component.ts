import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit,ViewChild, ElementRef } from '@angular/core'

export interface Option {
  index?: number
  __original?: any
  __mapper?: (args: any) => any
  name: string
  value: string
  selected?: boolean
  mouseenter?: boolean
  mouseleave?: boolean
}

@Component({
  selector: 'ui-combo-box',
  template: `
    <div #combobox>
      <label *ngIf="name" class="block text-sm font-medium text-gray-700">{{ name }}</label>
      <div class="relative mt-1">
        <input
          (keyup)="state.toggle(['search', 'drop'], true)"
          type="text"
          (click)="state.toggle('drop')"
          [(ngModel)]="state.model"
          class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          aria-controls="options"
          aria-expanded="false"
        />
        <button type="button" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <!-- Heroicon name: solid/selector -->
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            (click)="state.toggle('drop')"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <ul
          *ngIf="(filtered() || []).length > 0 && state.drop"
          [style]="'display: ' + (state.drop ? 'block' : 'none')"
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ng-container *ngFor="let option of filtered() || []">
            <li
              class="relative cursor-default select-none py-2 pl-3 pr-9"
              [ngClass]="option.mouseenter ? 'text-white bg-blue-600' : 'text-gray-900'"
              (mouseenter)="state.defaults.events.onmouseenter(option)"
              (mouseleave)="state.defaults.events.onmouseleave(option)"
              id="option-0"
              tabindex="-1"
              (click)="select(option)"
            >
              <span class="block truncate" [ngClass]="option.selected ? 'font-semibold' : ''">{{ option?.name }}</span>
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-4"
                [ngClass]="option.selected && option.mouseenter ? 'text-white' : (option.selected ? 'text-blue-600' : 'text-white')"
              >
                <!-- Heroicon name: solid/check -->
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ng-container>
        </ul>
      </div>
    </div>
  `,
})
export class WebUiComboBoxComponent implements OnInit,AfterViewInit {
  @ViewChild ('combobox') combobox: ElementRef<HTMLDivElement>

  @Input() name?: string

  //if set then pre-selected option has been set matched by provided Option||Data value
  @Input() value?: string
  /*
  // If the data-properties are not of type Option => {name,value,selected?}
  // then we need to map them to Option =>{name,value,selected?} by mapper functions:
  // using default[mapper] => (o) => {o} || @Input() mapper(o)=>{?}
  */
  @Input() data?: any[]
  @Input() mapper?: (args: any) => any

  /*
  // If the data-properties are already mapped or exist as Option => {name,value,selected?}
  // then there will be no need of any mapper functions & @Input() data:
  */
  @Input() options?: Option[]

  /*
  // event => onselect -> cast(input) emit<SELECTED_OPTION>
  */
  @Output() onselect = new EventEmitter<any>()

  //main-object => state of the component
  public identifier = Math.random();
  public state = {
    model: '',
    search: false,
    drop: false,
    /*
    //toggle any property of the state if it is of boolean type, or change by passing value as 2nd argument:(?,forced)
    */
    toggle: (prop, forced = null) => {
      if (typeof prop === 'string') {
        if (typeof this.state[prop] === 'boolean') {
          this.state[prop] = forced !== null ? forced : !this.state[prop]
        }
      } else {
        if (typeof prop === 'object' && prop.length > 0) {
          prop.forEach((p) => {
            this.state.toggle(p, forced)
          })
        }
      }
    },
    /*
    //all provided data-properties are mapped to Option => {name,value,selected?}
    */
    options: [],
    //defaults => option-constructor,events
    defaults: {
      option: {
        index: 0,
        __original: null,
        __mapper: (o) => {
          o
        }, //default mapper fn that replicate with the same object
        name: '',
        value: '',
        selected: false,
        mouseenter: false,
        mouseleave: true,
      },
      //events related to the options
      events: {
        onmouseenter: (option) => {
          this.state.options.find((o) => o.value === option.value).mouseenter = true
          this.state.options.find((o) => o.value === option.value).mouseleave = false
        },
        onmouseleave: (option) => {
          this.state.options.find((o) => o.value === option.value).mouseleave = true
          this.state.options.find((o) => o.value === option.value).mouseenter = false
        },
      },
    },
  }

  ngOnInit() {
    this.populate()
  }

  ngAfterViewInit(){
    this.identity()
  }

  identity() {
    this.identifier = Math.random();
    this.combobox.nativeElement.setAttribute('identity', `combobox-${this.identifier}`);
    window.addEventListener('click',(event)=>{
      try {
        if(this.outsider(event)){
          this.combobox.nativeElement.querySelector('ul').style.display = "none";
          this.state.drop = false;
        }else{
          this.combobox.nativeElement.querySelector('ul').style.display = "block";
        }
      } catch (error) {
        //nothing to catch
      }
    })
  }

  outsider(event){
    try{
      let currentElement = event.target;
      while(currentElement.tagName.toLowerCase() !== 'body'){
        if(currentElement.getAttribute('identity') === `combobox-${this.identifier}`){
          return false;
        }
        currentElement = currentElement.parentElement;
      }
      return true;
    }catch(e){
      return false;
    }
  }

  //parser of incoming data=>mapper , options to state.options
  populate() {
    try {
      this.state.options = (this.options || this.data).map((od, index) => {
        let option: Option = {
          ...this.state.defaults.option,
          index: index,
          name: od.name || '',
          value: od.value || '',
          selected: od.selected || (this.value ? od.value === this.value : false),
          __mapper: this.mapper || this.state.defaults.option.__mapper,
          __original: od,
        }
        option = {
          ...option,
          ...option.__mapper(od),
        }
        if(this.value){
          if(option.value === this.value){
            this.state.model = option.name;
          }
        }
        return option
      })
      if(this.value){
        this.current(this.state.options.find((o) => o.value === this.value));
      }
    } catch (e) {
      console.error(e)
      this.state.options = []
    }
  }

  //reset the component-behaviour
  reset() {
    this.state.model = ''
    this.state.search = false
    this.state.drop = false
    this.state.options = this.state.options.map((o) => {
      o.mouseenter = false
      o.mouseleave = true
      return o
    })
  }

  //trigger on option-click
  select(option: Option) {
    this.state.search = false
    this.current(option)
    this.state.toggle('drop', false)
    this.emit('onselect', option.__original)
  }

  //emit events dynamically
  emit(event, payload) {
    try {
      if (this[event] instanceof EventEmitter) this[event].emit(payload)
      else console.warn(`Event ${event} not found`)
    } catch (e) {
      console.error(e)
    }
  }

  //set,get current selected-option
  current(option = null) {
    if (option === null) {
      option = this.state.options.find((o) => o.selected)
      this.state.model = option?.name
    } else {
      this.state.options.map((o) => {
        o.selected = o.index === option.index ? true : false
        o.mouseenter = false
        o.mouseleave = true
        return o
      })
      option = this.state.options.find((o) => o.selected)
      this.state.model = option?.name
    }
    return option || null
  }

  //filter the options by the state.model
  filtered() {
    if (this.state.search) {
      return this.state.options.filter((o) => o.name.toLowerCase().includes(this.state.model.toLowerCase()))
    }
    return this.state.options
  }

}
