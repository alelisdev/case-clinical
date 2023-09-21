import { FormService } from './../../../form/src/lib/form.service';
import { Component, NgZone, ChangeDetectorRef, TemplateRef, OnInit, ViewChild, Input, Output, EventEmitter, Injector } from '@angular/core'
import { DialogService } from '@ngneat/dialog'
import { FormControl } from '@angular/forms'
import { NgSelectComponent } from '@ng-select/ng-select'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { orderBy } from 'lodash'
import { FormRouterKeyService } from '@case-clinical/web/ui/formly-designer'

@Component({
  styleUrls: ['./style.css'],
  selector: 'ui-select-form',
  templateUrl: `./web-ui-select-form.component.html`,
})
export class WebUiSelectFormComponent implements OnInit {
  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent
  @Input() to!: any
  @Input() key!: string
  @Input() upModel: any
  @Input() routerKeys: any[] = []
  @Input() control!: FormControl
  @Input() listTemplate?: TemplateRef<any>
  @Input() editTemplate?: TemplateRef<any>
  @Input() createTemplate?: TemplateRef<any>
  @Output() selectionChanged = new EventEmitter();
  @Output() formRouterKeyDidChange = new EventEmitter();

  routerValues: any[] = [];

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>()
  private allItemsSubscribe: any
  public items: any[] = []
  public allItems: any[] = []
  public value: any = null
  private lastInput: string | null = null
  private timeout: any
  loading = false
  initialValue: any
  formStateKey: string|undefined = undefined;
  private formRouterKeyService: FormRouterKeyService|undefined = undefined;

  constructor(private ngZone: NgZone, private ref: ChangeDetectorRef, private readonly dialog: DialogService, private injector: Injector) {}

  public ngOnInit() {
    try {
      this.formRouterKeyService = this.injector.get(FormRouterKeyService);
    } catch (e) {

    }

    if(this.key) {
      if(this.key.length > 2 && (this.key.endsWith('Id') || this.key.endsWith('id'))) {
        this.formStateKey = this.key.substring(0, this.key.length-2);
      } else {
        this.formStateKey = `selected${this.key}`;
      }
    }

    this.to.disabled && this.control?.disable()
    if (this.control?.value) {
      this.initialValue = this.control?.value;
    }

    if((this.routerKeys && this.routerKeys.length || 0) > 0) {
      for(let i = 0; i < this.routerKeys.length; i++) {
        this.routerValues.push(undefined);
      }
      this.formRouterKeyService?.routerKeys$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((routerKeys: any) => {
        let shouldEmitEvent = false;
        const newRouterValues: any = {};
        for(let i = 0; i < this.routerKeys.length; i++) {
          const key = this.routerKeys[i];
          const newValue = routerKeys[key];
          const prevValue = this.routerValues[i];
          if(newValue !== prevValue) {
            shouldEmitEvent = true;
            this.routerValues[i] = newValue;
          }
          newRouterValues[key] = this.routerValues[i];
        }
        if(shouldEmitEvent) {
          console.log('Should reload selectForm')
          this.formRouterKeyDidChange.emit(newRouterValues);
        }
      });
    }

    this.control?.valueChanges?.pipe(takeUntil(this.ngUnsubscribe)).subscribe((x) => {
      this.formRouterKeyService?.setRouterKey(this.key, x);
      if(this.to.valueChanged && this.to.valueChanged instanceof Function) this.to.valueChanged(x, this.value);

      this.to.changed && this.to.changed(x)
      if (x) {
        if(x !== this.value?.id) {
          this.initialValue = x;
          const item = this.allItems.find((el) => el.id === x)
          if(item) {
            this.itemDidSelect(item)
          }
          this.ref.markForCheck()
          this.ref.detectChanges()
        }
      }
    })
   this.changed(null)

    this.allItemsSubscribe = this.to.source('').subscribe((data: any) => {
      this.allItems = data;

      if(this.upModel && this.formStateKey){
        const value = this.upModel[this.formStateKey];
        this.setValue(value);
        this.changed(value);
      }
      if(this.value) {
        setTimeout(() => {
          if(this.upModel && this.formStateKey){
            const value = this.upModel[this.formStateKey];
            this.setValue(value);
            this.changed(value);
          }
          const selectedItem = this.allItems.find((item) => item[this.to.valueProp] === this.value.id);
          if(selectedItem) {
            const ngOption = this.ngSelect.itemsList.findItem(selectedItem)
            ngOption && this.ngSelect.select(ngOption)
          } else {
            this.ngSelect.clearModel();
          }
        }, 100)
      } else if(this.initialValue) {
        setTimeout(() => {
          const initialItem = this.allItems.find((item) => item[this.to.valueProp] === this.initialValue);
          this.initialValue = null;
          if(initialItem) {
            const ngOption = this.ngSelect.itemsList.findItem(initialItem)
            ngOption && this.ngSelect.select(ngOption)
          }
        }, 100)
      }
    })



    this.itemDidSelect = this.itemDidSelect.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  ngOnDestroy() {
    this.ngUnsubscribe?.next(true)
    this.ngUnsubscribe?.unsubscribe()
    this.allItemsSubscribe?.unsubscribe()
  }

  compareWith(item: any, selected: any) {
    return item.id === selected.id
  }

  refreshItems() {
    // this.to.source('').subscribe(console.log)
  }

  setValue($event: any) {
    if(!$event) {
      this.value = null;
      this.control?.setValue(null)
      if(this.formStateKey) this.selectionChanged.emit({ key: this.formStateKey, value: undefined })
    } else {
      this.value = $event;
      this.control?.setValue($event.id, { emitEvent: true })
      if(this.formStateKey) this.selectionChanged.emit({ key: this.formStateKey, value: $event })
    }
  }

  onSave($event: any) {
    if($event) {
      setTimeout(() => {
        console.log('onSave: ', $event)
        // If user edit view or add new view, then update items list, and selected item
        const updatedItem = this.items.find(item => item.id === $event.id);
        if(updatedItem) this.itemDidSelect(updatedItem)
      }, 200)
    }
  }

  itemDidSelect(selected: any) {
    let ngOption = this.ngSelect.itemsList.findItem(selected)
    if (ngOption) this.ngSelect.select(ngOption)
    else {
      this.ngSelect.itemsList.addItem(selected)
      setTimeout(() => {
        ngOption = this.ngSelect.itemsList.findItem(selected)
        this.ngSelect.select(ngOption)
      }, 200)
    }
  }

  onChange($event: any) {
    this.setValue($event)
    this.to.onChange && this.to.onChange($event)
  }

  changed(e: any) {

    // this.setValue(null)
    if (e && !e.name) {
      // this.setValue(null)
      if (this.to.source) {
        this.timeout && clearTimeout(this.timeout)
        if (e.term != this.lastInput) {
          this.timeout = setTimeout(() => {
            this.loading = true
            this.to.source(e.term).subscribe((result: any) => {
              this.items = result
              this.loading = false
              this.lastInput = e.term
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
            this.control?.markAsDirty()
          }, 300)
        }
      }
    } else if (e && e.name) {
      this.setValue(e)
    } else if (!e) {
      this.timeout && clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setValue(null)
        this.loading = true
        this.to.source('').subscribe((result: any) => {
          this.items = result
          this.loading = false
          this.ref.markForCheck()
          this.ref.detectChanges()
        })
      }, this.to.debounceTime || 0)
    }
  }

  displayFn(e: any): string {
    return e ? e.name : null
  }

  openDialog(tpl: TemplateRef<any>, { value, height, width }: { value?: any; height: number; width: number }) {
    this.ngSelect.close();
    this.dialog.open(tpl, {
      data: {
        value,
      },
      height: height || 'auto',
      width: width || 'auto',
    })
  }

  openListDialog(tpl: TemplateRef<any>, { value, height, width }: { value?: any; height: number; width: number }) {
    if(!value && this.ngSelect.searchTerm != "") value = { 'name' : this.ngSelect.searchTerm}
    this.ngSelect.close();
    this.dialog.open(tpl, {
      data: {
        value
      },
      height: height || 'auto',
      width: width || 'auto',
    })
  }

  get sortedItems() {
    if(this.items?.length > 1) {
      this.items.sort(function (a, b) {
        const nameA: string = a.name ?? '';
        const nameB: string = b.name ?? '';
        return nameA.localeCompare(nameB);
      });
    }
    return this.items;
  }

  // public checkObject(data:any):boolean{
  //   let checkRes : boolean = true
  //   if(data == null) return false
  //   Object.keys(data).forEach((value)=>{
  //     if(!data['value'] || data['value'] == "" )
  //       checkRes = false;
  //   });
  //   return checkRes;
  // }
}
