import { OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldWrapper } from '@ngx-formly/core'
import { FilterDataContext } from './filter-data-context';
import { FormService } from '../../form.service';
import { FilterExpression, FilterOperator } from './query';

@Component({
  template: `
    <div class="bg-card mb-3">
      <div>
        <!--
          Mobile filter dialog

          Off-canvas filters for mobile, show/hide based on off-canvas filters state.
        -->
        <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
          <!--
            Off-canvas menu backdrop, show/hide based on off-canvas menu state.

            Entering: "transition-opacity ease-linear duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>

          <div class="fixed inset-0 z-40 flex">
            <!--
              Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "translate-x-full"
            -->
            <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                  <span class="sr-only">Close menu</span>
                  <!-- Heroicon name: outline/x-mark -->
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-primary/50">
                <h3 class="sr-only">Categories</h3>
                <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                  <li>
                    <a href="#" class="block px-2 py-3">Totes</a>
                  </li>

                  <li>
                    <a href="#" class="block px-2 py-3">Backpacks</a>
                  </li>

                  <li>
                    <a href="#" class="block px-2 py-3">Travel Bags</a>
                  </li>

                  <li>
                    <a href="#" class="block px-2 py-3">Hip Bags</a>
                  </li>

                  <li>
                    <a href="#" class="block px-2 py-3">Laptop Sleeves</a>
                  </li>
                </ul>

                <div class="border-t border-gray-20reueruyery0 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse section button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                      <span class="font-medium text-gray-900">Color</span>
                      <span class="ml-6 flex items-center">
                        <!--
                          Expand icon, show/hide based on section open state.

                          Heroicon name: mini/plus
                        -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        <!--
                          Collapse icon, show/hide based on section open state.

                          Heroicon name: mini/minus
                        -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <!-- Filter section, show/hide based on section state. -->
                  <div class="pt-6" id="filter-section-mobile-0">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-color-0" class="ml-3 min-w-0 flex-1 text-gray-500">White</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-color-1" class="ml-3 min-w-0 flex-1 text-gray-500">Beige</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-color-2" class="ml-3 min-w-0 flex-1 text-gray-500">Blue</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-color-3" class="ml-3 min-w-0 flex-1 text-gray-500">Brown</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-color-4" class="ml-3 min-w-0 flex-1 text-gray-500">Green</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-color-5" class="ml-3 min-w-0 flex-1 text-gray-500">Purple</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-primary/50 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse section button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                      <span class="font-medium text-gray-900">Category</span>
                      <span class="ml-6 flex items-center">
                        <!--
                          Expand icon, show/hide based on section open state.

                          Heroicon name: mini/plus
                        -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        <!--
                          Collapse icon, show/hide based on section open state.

                          Heroicon name: mini/minus
                        -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <!-- Filter section, show/hide based on section state. -->
                  <div class="pt-6" id="filter-section-mobile-1">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input id="filter-mobile-category-0" name="category[]" value="new-arrivals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-category-0" class="ml-3 min-w-0 flex-1 text-gray-500">{{ to.title }}</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-category-1" name="category[]" value="sale" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-category-1" class="ml-3 min-w-0 flex-1 text-gray-500">Sale</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-category-2" name="category[]" value="travel" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-category-2" class="ml-3 min-w-0 flex-1 text-gray-500">Travel</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-category-3" name="category[]" value="organization" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-category-3" class="ml-3 min-w-0 flex-1 text-gray-500">Organization</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-category-4" name="category[]" value="accessories" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-category-4" class="ml-3 min-w-0 flex-1 text-gray-500">Accessories</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border-t border-primary/50 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <!-- Expand/collapse section button -->
                    <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-2" aria-expanded="false">
                      <span class="font-medium text-gray-900">Size</span>
                      <span class="ml-6 flex items-center">
                        <!--
                          Expand icon, show/hide based on section open state.

                          Heroicon name: mini/plus
                        -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        <!--
                          Collapse icon, show/hide based on section open state.

                          Heroicon name: mini/minus
                        -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <!-- Filter section, show/hide based on section state. -->
                  <div class="pt-6" id="filter-section-mobile-2">
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input id="filter-mobile-size-0" name="size[]" value="2l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-size-0" class="ml-3 min-w-0 flex-1 text-gray-500">2L</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-size-1" name="size[]" value="6l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-size-1" class="ml-3 min-w-0 flex-1 text-gray-500">6L</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-size-2" name="size[]" value="12l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-size-2" class="ml-3 min-w-0 flex-1 text-gray-500">12L</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-size-3" name="size[]" value="18l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-size-3" class="ml-3 min-w-0 flex-1 text-gray-500">18L</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-size-4" name="size[]" value="20l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-size-4" class="ml-3 min-w-0 flex-1 text-gray-500">20L</label>
                      </div>

                      <div class="flex items-center">
                        <input id="filter-mobile-size-5" name="size[]" value="40l" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-indigo-500">
                        <label for="filter-mobile-size-5" class="ml-3 min-w-0 flex-1 text-gray-500">40L</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <main class="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div class="flex items-baseline justify-between border-b border-primary/50 pt-6 pb-6">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{{ to.title }}</h1>

            <div class="flex items-center">
              <!-- <div class="relative inline-block text-left">
                <div>
                  <button #toggleButton (click)="sortExpanded=!sortExpanded" type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                    Sort
                    <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div #sortMenu *ngIf="sortExpanded" class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-card shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                  <div class="py-1" role="none">

                    <a href="#" class="font-medium text-gray-900 dark:text-gray-50 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Most Popular</a>

                    <a href="#" class="text-secondary block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Best Rating</a>

                    <a href="#" class="text-secondary block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Newest</a>

                    <a href="#" class="text-secondary block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Price: Low to High</a>

                    <a href="#" class="text-secondary block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Price: High to Low</a>
                  </div>
                </div>
              </div> -->

              <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span class="sr-only">View grid</span>
                <!-- Heroicon name: mini/squares-2x2 -->
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
                </svg>
              </button>
              <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                <span class="sr-only">Filters</span>
                <!-- Heroicon name: mini/funnel -->
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" class="pt-6 pb-6">
            <h2 id="products-heading" class="sr-only">Products</h2>
            <h2 *ngIf="filterSourceNotExists" class='text-red-800 text-lg bg-white rounded-md p-3 shadow-md mb-3'>Filter Source Does not Exist in FormData</h2>

            <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

              <div class="lg:col-span-1">
                <formly-field [field]="filterBarField">
                </formly-field>
                <button
                  class="relative inline-flex text-center justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-primary text-sm font-medium text-white rounded focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  (click)="applyFilter()"
                >Apply Filters</button>

              </div>

              <!-- Product grid -->
              <div class="lg:col-span-3">
                <!-- Replace with your content -->
                <div class="h-96 rounded-lg border-4 border-dashed border-primary/50 lg:h-full bg-gray-200 dark:bg-white dark:bg-opacity-5">
                  <!-- <ng-container #fieldComponent></ng-container> -->
                  <formly-field class="mt-0" [field]="filterContentField"></formly-field>
                </div>
                <!-- /End replace -->
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

  `,
})
export class UiFormFilterContainerComponent extends FieldWrapper implements OnInit, OnDestroy {
  @ViewChild('sortMenu') menu: ElementRef;
  @ViewChild('toggleButton') toggleButton: ElementRef;

  private _unsubscribeAll: Subject<any> = new Subject();

  filters = {}
  filterDataContext: FilterDataContext
  filterBarField: any;
  filterContentField: any;

  formControl!: FormControl
  sortExpanded = false;

  filterSourceNotExists = false;

  constructor(private renderer: Renderer2, private formService: FormService) {
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

  ngOnInit(): void {
    this.filterDataContext = new FilterDataContext();
    this.fetchData()
    // Filter Bar
    const filterBar = this.field.fieldGroup.find(el => {
      return el.wrappers.includes('filter-bar');
    });
    if (filterBar.fieldGroup) {
      filterBar.fieldGroup.map(field => {
        field.formControl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
          let shouldAddFilter = true;
          if(value === undefined || value === null) shouldAddFilter = false;
          else if(value instanceof Array && value.length === 0) shouldAddFilter = false;
          if (shouldAddFilter) {
            if (field.key === 'limit') {
              this.filterDataContext.query = this.filterDataContext.query.limit(value);
            } else {
              this.filters[String(field.key)] = value;
              const filterExpression: FilterExpression = new FilterExpression();
              filterExpression.key = String(field.key);
              filterExpression.value = value;
              switch (field.type) {
                case 'range':
                  filterExpression.operator = FilterOperator.Between;
                  break;
                case 'multi-select':
                  filterExpression.operator = FilterOperator.In;
                  break;
                default:
                  filterExpression.operator = FilterOperator.Equal;
                  break;
              }
              this.filterDataContext.query = this.filterDataContext.query.unfilter([String(field.key)]).filter(filterExpression)
            }
          }
          else {
            delete this.filters[String(field.key)]
            this.filterDataContext.query = this.filterDataContext.query.unfilter([String(field.key)])
          }
        })
      })
    }
    this.filterBarField = filterBar;

    // Fiter Content
    const _filterContentField = this.field.fieldGroup.find(el => {
      return el.wrappers.includes('filter-content');
    });
    if (_filterContentField.fieldGroup) {
      _filterContentField.fieldGroup.map(field => {
        field.templateOptions['context'] = this.filterDataContext;
      })
    }
    this.filterContentField = _filterContentField;
  }

  fetchData() {
    const filterSourceKey = this.to.filterSource;
    if (filterSourceKey) {
      const source = this.formService.getValueForKey(filterSourceKey, this.formState);
      if(!source) {
        this.filterSourceNotExists = true;
        return;
      }
      source(this.filterDataContext.query).pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
        this.filterDataContext.next(data);
        this.filterDataContext.data = data;
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
