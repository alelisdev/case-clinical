import { DataContextService } from './../../context-provider/data-context.service';
import { OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core'
import { FilterDataContext } from './filter-data-context';
import { FormService } from '../../form.service';
import { FilterExpression, FilterOperator } from './query';
import { WebUiFormField } from '../../web-ui-form.field';

@Component({
  template: `
    <ui-context-provider [data]="data" class="mb-3">
      <div>
        <div class="relative z-40 sm:hidden" role="dialog" aria-modal="true">
          <!--
            Off-canvas menu backdrop, show/hide based on off-canvas menu state.

            Entering: "transition-opacity ease-linear duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity ease-linear duration-300 opacity-0" (click)="closeMobileFilter()" [ngClass]="MobileFilterBarBackdropClassName"></div>

          <div class="fixed inset-0 left-15 z-40 flex">
            <!--
              Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "translate-x-full"
            -->
            <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition ease-in-out duration-300 transform" [ngClass]="MobileFilterBarClassName">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500" (click)="mobileFilterOpen=false">
                  <span class="sr-only">Close menu</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4">
                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse question button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-0" aria-expanded="false">
                      <span class="font-medium text-gray-900">Category</span>
                      <span class="ml-6 flex items-center">
                        <!--
                          Expand/collapse icon, toggle classes based on question open state.

                          Open: "-rotate-180", Closed: "rotate-0"
                        -->
                        <svg class="rotate-0 h-5 w-5 transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div class="pt-6" id="filter-section-0">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input id="filter-mobile-category-0" name="category[]" value="tees" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-category-0" class="ml-3 text-sm text-gray-500">Tees</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-category-1" name="category[]" value="crewnecks" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-category-1" class="ml-3 text-sm text-gray-500">Crewnecks</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-category-2" name="category[]" value="hats" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-category-2" class="ml-3 text-sm text-gray-500">Hats</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse question button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-1" aria-expanded="false">
                      <span class="font-medium text-gray-900">Brand</span>
                      <span class="ml-6 flex items-center">
                        <!--
                          Expand/collapse icon, toggle classes based on question open state.

                          Open: "-rotate-180", Closed: "rotate-0"
                        -->
                        <svg class="rotate-0 h-5 w-5 transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div class="pt-6" id="filter-section-1">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input id="filter-mobile-brand-0" name="brand[]" value="clothing-company" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-brand-0" class="ml-3 text-sm text-gray-500">Clothing Company</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-brand-1" name="brand[]" value="fashion-inc" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-brand-1" class="ml-3 text-sm text-gray-500">Fashion Inc.</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-brand-2" name="brand[]" value="shoes-n-more" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-brand-2" class="ml-3 text-sm text-gray-500">Shoes &#039;n More</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse question button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-2" aria-expanded="false">
                      <span class="font-medium text-gray-900">Color</span>
                      <span class="ml-6 flex items-center">
                        <!--
                          Expand/collapse icon, toggle classes based on question open state.

                          Open: "-rotate-180", Closed: "rotate-0"
                        -->
                        <svg class="rotate-0 h-5 w-5 transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div class="pt-6" id="filter-section-2">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-color-0" class="ml-3 text-sm text-gray-500">White</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-color-1" name="color[]" value="black" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-color-1" class="ml-3 text-sm text-gray-500">Black</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-color-2" name="color[]" value="grey" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-color-2" class="ml-3 text-sm text-gray-500">Grey</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse question button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400" aria-controls="filter-section-3" aria-expanded="false">
                      <span class="font-medium text-gray-900">Sizes</span>
                      <span class="ml-6 flex items-center">
                        <!--
                          Expand/collapse icon, toggle classes based on question open state.

                          Open: "-rotate-180", Closed: "rotate-0"
                        -->
                        <svg class="rotate-0 h-5 w-5 transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div class="pt-6" id="filter-section-3">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input id="filter-mobile-sizes-0" name="sizes[]" value="s" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-sizes-0" class="ml-3 text-sm text-gray-500">S</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-sizes-1" name="sizes[]" value="m" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-sizes-1" class="ml-3 text-sm text-gray-500">M</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-sizes-2" name="sizes[]" value="l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <label for="filter-mobile-sizes-2" class="ml-3 text-sm text-gray-500">L</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 py-4 shadow-md">
            <section aria-labelledby="filter-heading" class="container">
              <h2 id="filter-heading" class="sr-only">Product filters</h2>

              <div class="flex items-center justify-between">
                <ui-sort-group (sortDidChange)="onSortChanged($event)" [options]="to.sortOptions ?? []"></ui-sort-group>

                <!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. -->
                <button type="button" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden">Filters</button>

                <div class="hidden sm:flex sm:items-baseline sm:space-x-8">
                  <ui-filter-group
                    *ngFor="let filterOption of to.filters"
                    [filterOption]="getFilterOption(filterOption)"
                    (filterDidChange)="filterDidChange($event)"
                  ></ui-filter-group>
                  <!-- <ui-filter-group [options]="filterList2" title="Brand"></ui-filter-group>
                  <ui-filter-group [options]="filterList3" title="Color"></ui-filter-group>
                  <ui-filter-group [options]="filterList4" title="Size"></ui-filter-group> -->
                </div>
              </div>
            </section>
          </div>
          <div class="w-full">
            <div class="container">
              <h2 *ngIf="filterSourceNotExists" class='text-red-800 text-lg bg-white rounded-md p-3 shadow-md mb-3 mt-3'>Filter Source Does not Exist in FormData</h2>
              <div class="rounded-lg lg:h-full dark:bg-opacity-5 py-5">
              <ng-container #fieldComponent></ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ui-context-provider>
  `,
})
export class UiFormFilterContainerComponent extends FieldWrapper implements OnInit, OnDestroy {
  @ViewChild('sortMenu') menu: ElementRef;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  sortField: FormlyFieldConfig
  private _unsubscribeAll: Subject<any> = new Subject();

  data = {}
  filters = {}
  filterDataContext: FilterDataContext

  formControl!: FormControl

  mobileFilterOpen = true;

  filterSourceNotExists = false;

  public get MobileFilterBarClassName(): string {
    return this.mobileFilterOpen ? 'translate-x-0' : 'translate-x-full';
  }

  public get MobileFilterBarBackdropClassName(): string {
    return this.mobileFilterOpen ? 'opacity-100' : 'opaity-0';
  }

  constructor(private renderer: Renderer2, private contextService: DataContextService, private formService: FormService) {
    super()
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   /**
    //    * Only run when toggleButton is not clicked
    //    * If we don't check this, all clicks (even on the toggle button) gets into this
    //    * section which in the result we might never see the menu open!
    //    * And the menu itself is checked here, and it's where we check just outside of
    //    * the menu and button the condition abbove must close the menu
    //    */
    //   if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
    //     this.sortExpanded = false;
    //   }
    // });
  }

  getFilterOption(filterOption) {
    return {
      ...filterOption,
      source: this.contextService.getValue(filterOption.dataKey)
    }
  }

  ngOnInit(): void {
    this.filterDataContext = new FilterDataContext();
    console.log(this.to.filters, this.contextService.getData())
    this.fetchData()
  }

  filterDidChange({ key, value }) {
    console.log('filterDidChanged, ', key, value);
    let shouldAddFilter = true;
    if (value === undefined || value === null) shouldAddFilter = false;
    else if (value instanceof Array && value.length === 0) shouldAddFilter = false;
    if (shouldAddFilter) {
      // if (field.key === 'limit') {
      //   this.filterDataContext.query = this.filterDataContext.query.limit(value);
      // }
      this.filters[key] = value;
      const filterExpression: FilterExpression = new FilterExpression();
      filterExpression.key = key;
      filterExpression.value = value;
      filterExpression.operator = FilterOperator.In;
      // switch (field.type) {
      //   case 'range':
      //     filterExpression.operator = FilterOperator.Between;
      //     break;
      //   case 'multi-select':
      //     filterExpression.operator = FilterOperator.In;
      //     break;
      //   default:
      //     filterExpression.operator = FilterOperator.Equal;
      //     break;
      // }
      this.filterDataContext.query = this.filterDataContext.query.unfilter([key]).filter(filterExpression)
    }
    else {
      delete this.filters[key]
      this.filterDataContext.query = this.filterDataContext.query.unfilter([key])
    }

    console.log(this.filterDataContext.query)
    this.fetchData();
  }

  closeMobileFilter() {
    this.mobileFilterOpen = !this.mobileFilterOpen;
  }

  onSortChanged(expression) {
    console.log({ expression })
    this.filterDataContext.query.state.orderExpressions = [expression];
    console.log(this.filterDataContext.query.state.orderExpressions)
    this.fetchData()
  }

  fetchData() {
    const filterSourceKey = this.to.filterSource;
    if (filterSourceKey) {
      const source = this.formService.getValueForKey(filterSourceKey, this.formState);
      if (!source) {
        this.filterSourceNotExists = true;
        return;
      }
      source(this.filterDataContext.query).pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
        console.log(data)
        this.data = data;
      })
    }
  }

  applyFilter() {
    console.log(this.filterDataContext.query.serialize().filterExpressions);
    this.fetchData()
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
