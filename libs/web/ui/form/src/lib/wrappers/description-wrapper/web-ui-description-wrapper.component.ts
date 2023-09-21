import { Component, OnInit  } from '@angular/core'
import { UiFormBaseField } from '../../types/base-field-type';
import * as moment from 'moment';

@Component({
  selector: 'ui-description-wrapper',
  template: `<div>
  <ng-container [ngSwitch]="to.varient">
      <ng-container *ngSwitchCase="'left-aligned'">
        <!-- <ui-form-varients-left-aligned /> -->
        <div [ngClass]="{'px-4 py-2': !to.condensed}">
          <div class="px-4 sm:px-0" *ngIf="!to.condensed">
            <h3 class="text-xl font-semibold leading-7 text-gray-900">
              {{ to.title }}
            </h3>
            <p class="mt-1 max-w-2xl text-lg leading-6 text-gray-500"> {{ to.subtitle }}</p>
          </div>
          <div class="border-t border-gray-300" [ngClass]="{'mt-6': !to.condensed}">
            <dl class="divide-y divide-gray-300">
              <ng-container *ngFor="let info of data; let i = index">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-md font-medium leading-6 text-gray-900">{{ info.title }}</dt>
                  <dd class="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ng-container [ngSwitch]="info.format">
                      <ng-container *ngSwitchCase="'currency'">
                        {{ getValue(info.dataKey) | currency }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'date'">
                        {{ getValue(info.dataKey) | date }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'percent'">
                        {{ getValue(info.dataKey) }}%
                      </ng-container>
                      <ng-container *ngSwitchCase="'dateTime'">
                        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
                      </ng-container>
                      <ng-container *ngSwitchDefault>
                        {{ getValue(info.dataKey)}}
                      </ng-container>
                    </ng-container>
                  </dd>
                </div>
              </ng-container>
            </dl>
          </div>
        </div>
      </ng-container>
      <ng-container *ngSwitchCase="'left-aligned-dark'">
        <!-- <ui-form-varients-left-aligned-dark /> -->
        <div *ngIf="!to.condensed" style="background-color: black;" class='p-2'>
          <div class="px-4 sm:px-0">
            <h3 class="text-xl font-semibold leading-7 text-white">{{ to.title }}</h3>
            <p class="mt-1 max-w-2xl text-lg leading-6 text-gray-400">{{ to.subtitle }}</p>
          </div>
          <div class="border-t border-white/20" [ngClass]="{'mt-6': !to.condensed}">
            <dl class="divide-y divide-white/20">
              <ng-container *ngFor="let info of data; let i = index">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-md font-medium leading-6 text-white">{{ info.title }}</dt>
                  <dd class="mt-1 text-md leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    <ng-container [ngSwitch]="info.format">
                      <ng-container *ngSwitchCase="'currency'">
                        {{ getValue(info.dataKey) | currency }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'dateTime'">
                        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
                      </ng-container>
                      <ng-container *ngSwitchCase="'percent'">
                        {{ getValue(info.dataKey) }}%
                      </ng-container>
                      <ng-container *ngSwitchCase="'date'">
                        {{ getValue(info.dataKey) | date }}
                      </ng-container>
                      <ng-container *ngSwitchDefault>
                        {{ getValue(info.dataKey)}}
                      </ng-container>
                    </ng-container>
                  </dd>
                </div>
              </ng-container>

            </dl>
          </div>
        </div>
      </ng-container>
      <ng-container *ngSwitchCase ="'left-aligned-stripped'">
        <!-- <ui-form-varients-left-aligned-stripped /> -->
        <div class='p-2' *ngIf="!to.condensed">
          <div class="px-4 sm:px-0">
            <h3 class="text-xl font-semibold leading-7 text-gray-900">{{ to.title }}</h3>
            <p class="mt-1 max-w-2xl text-lg leading-6 text-gray-500">{{ to.subtitle }}</p>
          </div>
          <div class="border-t border-gray-200" [ngClass]="{'mt-6': !to.condensed}">
            <dl class="divide-y divide-gray-200">
              <ng-container *ngFor="let info of data; let i = index">
                <div class="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3" [ngClass]="{'bg-gray-50': !(i%2), 'bg-white': (i%2)}">
                  <dt class="text-md font-medium leading-6 text-gray-900">{{ info.title }}</dt>
                  <dd class="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ng-container [ngSwitch]="info.format">
                      <ng-container *ngSwitchCase="'currency'">
                        {{ getValue(info.dataKey) | currency }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'dateTime'">
                        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
                      </ng-container>
                      <ng-container *ngSwitchCase="'percent'">
                        {{ getValue(info.dataKey) }}%
                      </ng-container>
                      <ng-container *ngSwitchCase="'date'">
                        {{ getValue(info.dataKey) | date }}
                      </ng-container>
                      <ng-container *ngSwitchDefault>
                        {{ getValue(info.dataKey)}}
                      </ng-container>
                    </ng-container></dd>
                </div>
              </ng-container>
            </dl>
          </div>
        </div>
      </ng-container>
      <ng-container *ngSwitchCase="'multi-column'">
        <div class='p-2' >
          <div class="px-4 sm:px-0" *ngIf="!to.condensed">
            <h3 class="text-xl font-semibold leading-7 text-gray-900">{{ to.title }}</h3>
            <p class="mt-1 max-w-2xl text-lg leading-6 text-gray-500">{{ to.subtitle }}</p>
          </div>
          <div class="border-b border-gray-200" [ngClass]="{'mt-6': !to.condensed}">
            <dl class="grid grid-cols-1" [ngClass]="gridColsClasses[gridCols-1]">
              <ng-container *ngFor="let info of data; let i = index">
                <div class="border-t border-gray-200 px-4 py-4 sm:col-span-1 sm:px-0">
                  <dt class="text-md font-medium leading-6 text-gray-900">{{ info.title }}  </dt>
                  <dd class="mt-1 text-md leading-6 text-gray-700 sm:mt-2">
                    <ng-container [ngSwitch]="info.format">
                      <ng-container *ngSwitchCase="'currency'">
                        {{ getValue(info.dataKey) | currency }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'percent'">
                        {{ getValue(info.dataKey) }}%
                      </ng-container>
                      <ng-container *ngSwitchCase="'dateTime'">
                        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
                      </ng-container>
                      <ng-container *ngSwitchCase="'date'">
                        {{ getValue(info.dataKey) | date }}
                      </ng-container>
                      <ng-container *ngSwitchDefault>
                        {{ getValue(info.dataKey)}}
                      </ng-container>
                    </ng-container>
                  </dd>
                </div>
              </ng-container>
              <div *ngIf="hasEmptyCols()" class="border-t border-gray-200 px-4 py-6 sm:px-0" [ngClass]="getEmptyColSpanClass()">
                <dt class="text-md font-medium leading-6 text-gray-900"></dt>
                <dd class="mt-1 text-md leading-6 text-gray-700 sm:mt-2">
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </ng-container>
      <ng-container *ngSwitchCase="'narrow-with-hidden-labels'">
        <!-- <ui-form-varients-narrow-with-hidden-labels /> -->
        <div class="lg:col-start-3 lg:row-end-1">
          <h2 class="sr-only">Summary</h2>
          <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
            <dl class="flex flex-wrap">
              <div class="flex-auto pl-6 pt-6" *ngIf="!to.condensed">
                <dt class="text-sm font-semibold leading-6 text-gray-900">{{ to.title }}</dt>
                <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">{{ to.subtitle }}</dd>
              </div>
              <ng-container *ngFor="let info of data; let i = index">
                <ng-container [ngSwitch]="info.format">
                  <ng-container *ngSwitchCase="'currency'">
                    <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                      <dt class="flex-none">
                        <span class="sr-only">{{ info.title }}</span>
                        <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clip-rule="evenodd" />
                        </svg>
                      </dt>
                      <dd class="text-sm leading-6 text-gray-500">{{ getValue(info.dataKey) | currency }}</dd>
                    </div>

                  </ng-container>
                  <ng-container *ngSwitchCase="'percent'">
                    <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                      <dt class="flex-none">
                        <span class="sr-only">{{ info.title }}</span>
                        <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clip-rule="evenodd" />
                        </svg>
                      </dt>
                      <dd class="text-sm leading-6 text-gray-500">{{ getValue(info.dataKey) }}%</dd>
                    </div>

                  </ng-container>
                  <ng-container *ngSwitchCase="'date'">
                    <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                      <dt class="flex-none">
                        <span class="sr-only">{{ info.title }}</span>
                        <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                          <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                        </svg>
                      </dt>
                      <dd class="text-sm leading-6 text-gray-500">
                        <time datetime="2023-01-31">{{ getValue(info.dataKey) | date }}</time>
                      </dd>
                    </div>

                  </ng-container>
                  <ng-container *ngSwitchCase="'datetime'">
                    <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
                      <dt class="flex-none">
                        <span class="sr-only">{{ info.title }}</span>
                        <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                          <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                        </svg>
                      </dt>
                      <dd class="text-sm font-medium leading-6 text-gray-900">{{ this.checkformatedDateTime(valueDateTime)}}</dd>
                    </div>

                  </ng-container>
                  <ng-container *ngSwitchDefault>
                    <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                      <dt class="flex-none">
                        <span class="sr-only">{{ info.title }}</span>
                        <svg class="h-6 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd" />
                        </svg>
                      </dt>
                      <dd class="text-sm font-medium leading-6 text-gray-900">{{ getValue(info.dataKey)}}</dd>
                    </div>

                  </ng-container>
                </ng-container>
              </ng-container>
            </dl>
          </div>
        </div>
      </ng-container>
      <ng-container *ngSwitchCase ="'left-align-with-inline-actions'">
        <!-- <ui-form-varients-left-align-with-inline-actions /> -->
        <div class="px-4 sm:px-0" *ngIf="!to.condensed">
          <h3 class="text-base font-semibold leading-7 text-gray-900">{{ to.title }}</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{{ to.subtitle }}</p>
        </div>
        <div class="border-t border-gray-100" [ngClass]="{'mt-6': !to.condensed}">
          <dl class="divide-y divide-gray-100">
            <ng-container *ngFor="let info of data; let i = index">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">{{ info.title }}</dt>
                <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span class="flex-grow">
                    <ng-container [ngSwitch]="info.format">
                      <ng-container *ngSwitchCase="'currency'">
                        {{ getValue(info.dataKey) | currency }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'dateTime'">
                        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
                      </ng-container>
                      <ng-container *ngSwitchCase="'percent'">
                        {{ getValue(info.dataKey) }}%
                      </ng-container>
                      <ng-container *ngSwitchCase="'date'">
                        {{ getValue(info.dataKey) | date }}
                      </ng-container>
                      <ng-container *ngSwitchDefault>
                        {{ getValue(info.dataKey)}}
                      </ng-container>
                    </ng-container>
                  </span>
                  <span class="ml-4 flex-shrink-0">
                    <button type="button" class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Update</button>
                  </span>
                </dd>
              </div>
            </ng-container>
          </dl>
        </div>
      </ng-container>
      <ng-container *ngSwitchCase ="'left-aligned-card'">
        <!-- <ui-form-varients-left-aligned-card /> -->
        <div class="overflow-hidden bg-white shadow sm:rounded-lg p-2">
          <div *ngIf="!to.condensed" class="px-4 py-6 sm:px-6">
            <h3 class="text-xl font-semibold leading-7 text-gray-900">{{ to.title }}</h3>
            <p class="mt-1 max-w-2xl text-lg leading-6 text-gray-500">{{ to.subtitle }}</p>
          </div>
          <div class="border-t border-gray-200">
            <dl class="divide-y divide-gray-200">
              <ng-container *ngFor="let info of data; let i = index">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-md font-medium text-gray-900">{{ info.title }}</dt>
                  <dd class="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ng-container [ngSwitch]="info.format">
                      <ng-container *ngSwitchCase="'currency'">
                        {{ getValue(info.dataKey) | currency }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'percent'">
                        {{ getValue(info.dataKey) }}%
                      </ng-container>
                      <ng-container *ngSwitchCase="'date'">
                        {{ getValue(info.dataKey) | date }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'dateTime'">
                        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
                      </ng-container>
                      <ng-container *ngSwitchDefault>
                        {{ getValue(info.dataKey)}}
                      </ng-container>
                    </ng-container>
                  </dd>
                </div>
              </ng-container>
            </dl>
          </div>
        </div>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <!-- <ui-form-varients-left-aligned /> -->
        <div>
          <div *ngIf="!to.condensed" class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-7 text-gray-900">
              {{ to.title }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500"> {{ to.subtitle }}</p>
          </div>
          <div class="border-t border-gray-100" [ngClass]="{'mt-6': !to.condensed}">
            <dl class="divide-y divide-gray-100">
              <ng-container *ngFor="let info of data; let i = index">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">{{ info.title }}</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ng-container [ngSwitch]="info.format">
                      <ng-container *ngSwitchCase="'currency'">
                        {{ getValue(info.dataKey) | currency }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'date'">
                        {{ getValue(info.dataKey) | date }}
                      </ng-container>
                      <ng-container *ngSwitchCase="'percent'">
                        {{ getValue(info.dataKey) }}%
                      </ng-container>
                      <ng-container *ngSwitchCase="'dateTime'">
                        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
                      </ng-container>
                      <ng-container *ngSwitchDefault>
                        {{ getValue(info.dataKey)}}
                      </ng-container>
                    </ng-container>
                  </dd>
                </div>
              </ng-container>
            </dl>
          </div>
        </div>
      </ng-container>
    </ng-container>
    <div>
  `,
})
export class WebUiDescriptionWrapperComponent extends UiFormBaseField implements OnInit {
  gridColsClass: string;
  gridCols: number;
  data = [];

  gridColsClasses = [
    'sm:grid-cols-1',
    'sm:grid-cols-2',
    'sm:grid-cols-3',
    'sm:grid-cols-4',
    'sm:grid-cols-5',
    'sm:grid-cols-6',
    'sm:grid-cols-7',
    'sm:grid-cols-8',
    'sm:grid-cols-9',
    'sm:grid-cols-10',
    'sm:grid-cols-11',
    'sm:grid-cols-12',
  ]

  ngOnInit() {
    super.ngOnInit();

    if(this.to.varient === 'multi-column') {
      this.gridCols = this.to.gridCols ?? 2;
    }

    if(this.field.fieldGroup?.length > 0) {
      this.field.fieldGroup.map((field) => {
        console.log(field.templateOptions);
        const { label, format, dataKey, cols, hidden } = field.templateOptions;
        // If label component is hidden, then don;t show that on the list;
        if(hidden) {
          return;
        } else {
          this.data.push({
            title: label,
            format,
            dataKey,
            cols
          })
        }
      });
    }
  }

  hasEmptyCols() {
    if(!this.to?.data) return false;
    return this.data.length % this.gridCols !== 0;
  }

  getEmptyColSpanClass() {
    if(!this.to?.data) return 'sm:col-span-1';
    const dataCount = this.data.length;

    console.log({ dataCount, gridCols: this.gridCols });
    let emptyCols = dataCount % this.gridCols;
    emptyCols = this.gridCols - emptyCols;
    console.log({ emptyCols });
    return 'sm:col-span-' + emptyCols;
  }

  checkformatedDateTime(datevalue:string){
    return moment(datevalue).format("YYYY-MM-DD h:mm:ss a");
  }

  getValue(key: string) {
    return this.formService ? this.formService.getValueForKey(key, this.service.getData()) : "";
  }
}
