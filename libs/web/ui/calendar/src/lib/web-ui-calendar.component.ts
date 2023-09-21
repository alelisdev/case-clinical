import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { FullCalendarComponent } from '@fullcalendar/angular'
import { Calendar as FullCalendar, CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core'
import { clone, cloneDeep, omit } from 'lodash-es'
import { Calendar, CalendarSettings } from './calendar.types'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment'
import {
  AdminCreateAppointmentInput,
  AdminCreateCalendarInput,
  AdminUpdateAppointmentInput,
  AdminUpdateCalendarInput,
  CalendarWeekday,
  UserUpdateCalendarInput,
} from '@case-clinical/web/core/data-access'
import { calendarColors } from './calendar-colors'
import { RRule } from 'rrule'



export enum DateFormat {
  DDMMYYYY = 'DD-MM-YYYY',
  MMDDYYYY = 'MM-DD-YYYY',
  YYYYMMDD = 'YYYY-MM-DD',
  Ll = 'll',
}

export enum TimeFormat {
  Twelve = 'Twelve',
  TwentyFour = 'TwentyFour',
}

export enum StartWeekOn {
  One = 1,
  Six = 6,
  Zero = 0,
}

@Component({
  selector: 'ui-calendar',
  styleUrls: ['./ui-calendar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="demo-app border dark:border-gray-800" *ngIf="isCalendar">
      <div class="demo-app-sidebar border-r">
        <div class="flex flex-col  min-h-full p-8">
          <div class="pb-6 text-3xl font-extrabold tracking-tight">Calendar</div>
          <div class="group flex items-center justify-between mb-3 calender">
            <span class="text-lg font-medium">Calendars</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 only-show-on-hover cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              (click)="calendarEvent()"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div
            class="group flex items-center justify-between mt-2 ng-star-inserted personal"
            *ngFor="let calendar of calendars"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                [checked]="calendar.visible"
                [attr.id]="calendar.color"
                (click)="toggleCalendarVisibility(calendar)"
              />

              <span class="w-3 h-3 ml-2 rounded-full" [style]="'background-color:' + calendar.color"></span>
              <label [attr.for]="calendar.color" class="cursor-text">
                <span class="ml-2 leading-none">{{ calendar.title }}</span>
              </label>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 personal-show-icon cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              (click)="openEditPanel(calendar)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>

          <!-- <div class="-mx-4 mt-auto setting dark:hover:text-gray-900" (click)="onSetting()">
            <a class="flex items-center w-full py-3 px-4 rounded-full hover:bg-hover" href="javascript:void(0)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="ml-2 font-medium leading-none">Settings</span></a
            >
          </div> -->
        </div>
      </div>
      <div class="demo-app-main">
        <full-calendar *ngIf="calendarVisible" [options]="calendarOptions" #fullCalendar></full-calendar>
      </div>
    </div>
    <div *ngIf="isSetting">
      <div class="m-4 flex items-center upperSetting">
        <span class="backIcon p-3 cursor-pointer dark:hover:text-gray-900" (click)="onBack()"
          ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            /></svg>
          </span>
        <span class="mx-2 text-lg">Setting</span>
      </div>
      <div class="mt-5 ml-4">
        <div class="grid grid-cols-4 ">
          <form [formGroup]="settingsForm">
            <div class="mb-4">
              <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Date Format</label
              >
              <select
                id="location"
                name="location"
                class="mt-1 block w-full pl-3 pr-10 py-4 text-base text-gray-400 hover:text-gray-700 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                [formControlName]="'dateFormat'"
              >
                <option [value]="'ll'">Aug 20, {{ year }}</option>
                <option [value]="'MMDDYYYY'">12/31/{{ year }}</option>
                <option [value]="'DDMMYYYY'">31/12/{{ year }}</option>
                <option [value]="'YYYYMMDD'">{{ year }}-12-31</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Time Format</label
              >
              <select
                id="location"
                name="location"
                class="mt-1 block w-full pl-3 pr-10 py-4 text-base text-gray-400 hover:text-gray-700 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                [formControlName]="'timeFormat'"
              >
                <option [value]="'Twelve'">1:00 PM</option>
                <option [value]="'TwentyFour'">13:00</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Start week on</label
              >
              <select
                id="location"
                name="location"
                class="mt-1 block w-full pl-3 pr-10 text-gray-400 hover:text-gray-700 py-4 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                [formControlName]="'startWeekOn'"
              >
                <option [value]="'Six'">Saturday</option>
                <option [value]="'Zero'">Sunday</option>
                <option [value]="'One'">Monday</option>
              </select>
            </div>
            <div class="text-center">
              <button
                type="button"
                (click)="updateSettings()"
                [disabled]="settingsForm.invalid || settingsForm.pristine"
                class="items-center px-5 w-full my-4 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- modal title -->

    <!-- This example requires Tailwind CSS v2.0+ -->
    <!-- Add / Edit mode -->
    <div class="fixed z-10 overflow-y-auto modal">
      <ng-container *ngIf="panelMode === 'add' || panelMode === 'edit'">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              <form
                novalidate=""
                class="flex flex-col w-full p-6 pt-8 sm:pt-10 sm:pr-8 ng-untouched ng-pristine ng-valid ng-star-inserted text-gray-900"
                [formGroup]="eventForm"
              >
                <input type="hidden" *ngIf="panelMode === 'edit'" name="id" id="id" [formControlName]="'id'" />
                <div class="flex items-center w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <div class="flex flex-auto">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      class="w-full ml-3 pl-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      [placeholder]="'Appointment title'"
                      [formControlName]="'title'"
                    />
                  </div>
                </div>
                <div class="flex items-start mt-5">
                  <div class="mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="flex flex-auto">
                    <input
                      autocomplete="off"
                      type="text"
                      class="w-full pl-3 ml-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      ngxDaterangepickerMd
                      [autoApply]="options.autoApply"
                      [linkedCalendars]="options.linkedCalendars"
                      [singleDatePicker]="options.singleDatePicker"
                      [showCustomRangeLabel]="true"
                      [alwaysShowCalendars]="true"
                      [ranges]="ranges"
                      [linkedCalendars]="true"
                      [isInvalidDate]="isInvalidDate"
                      [showClearButton]="true"
                      applyLabel="Okay"
                      [showDropdowns]="true"
                      startKey="start"
                      endKey="end"
                      [(ngModel)]="selected"
                      [showWeekNumbers]="options.showWeekNumbers"
                      [showCancel]="options.showCancel"
                      [showClearButton]="options.showClearButton"
                      [showISOWeekNumbers]="options.showISOWeekNumbers"
                      [customRangeDirection]="options.customRangeDirection"
                      [lockStartDate]="options.lockStartDate"
                      [closeOnAutoApply]="options.closeOnAutoApply"
                      firstMonthDayClass="first-day"
                      lastMonthDayClass="last-day"
                      emptyWeekRowClass="empty-week"
                      lastDayOfPreviousMonthClass="last-previous-day"
                      firstDayOfNextMonthClass="first-next-day"
                      name="daterange"
                      [formControlName]="'range'"
                      [locale]="{ format: dateCheckEnumFormat, firstDay: 1 }"
                      [timePicker]="!eventForm.get('allDay').value"
                      [timePickerSeconds]="false"
                      [timePickerIncrement]="1"
                      [timeFormat]="fetchSettings.timeFormat"
                      [timePicker24Hour]="timeCheckEnumFormat === 'TwentyFour' ? true : false"
                    />
                  </div>
                </div>
                <div class="flex justify-items-center items-center pt-5">
                  <label class="flex justify-center" for="allday-input">
                    <input
                      type="checkbox"
                      [formControlName]="'allDay'"
                      (change)="toggleChecked($event.target.checked)"
                      id="allday-input"
                    />
                    <span class="flex justify-center pl-3"><span style="display: none;">&nbsp;</span> All day </span>
                  </label>
                </div>

                <div class="flex items-center mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <div
                    class="flex flex-auto items-center h-12 ml-3 rounded-md border cursor-pointer shadow-sm border-gray-300 dark:bg-black dark:bg-opacity-5 dark:border-gray-500"
                  >
                    <div class="flex-auto pl-3 w-full" (click)="recurrenceEvent()">Does not repeat</div>
                  </div>
                </div>
                <div class="flex items-center mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>

                  <div class="ml-3 w-full">
                    <!-- <div>
                      <select
                        id="location"
                        name="location"
                        class="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        [formControlName]="'calendarId'"
                        (change)="$event.stopImmediatePropagation()"
                      >
                        <span
                          class="w-3 h-3 rounded-full"
                          [ngClass]="getCalendar(eventForm.get('calendarId').value)?.color"
                        ></span>
                        <span class="ml-3">{{ getCalendar(eventForm.get('calendarId').value)?.title }}</span>
                          <option [value]="calendar.id" data-icon={{calendar.color}} *ngFor="let calendar of calendars">
                            <div class="inline-flex items-center">
                              <span
                                class="w-3 h-3 ml-2 rounded-full absolute"
                                [style]="'background-color:' + calendar.color + ';'"
                              ></span>
                              <span class="ml-3">{{ calendar.title }}</span>
                            </div>
                          </option>
                      </select>
                    </div>
                  </div> -->

                    <div class="mt-1 relative" (clickOutside)="onClickedOutside($event)">
                      <button
                        type="button"
                        class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                        (click)="showOption = !showOption"
                      >
                        <div class="flex items-center">
                          <!-- On: "bg-green-400", Off: "bg-gray-200" -->
                          <span
                            aria-label="Online"
                            class="flex-shrink-0 inline-block h-2 w-2 rounded-full"
                            *ngIf="selectedCalendar"
                            [style.background]="selectedCalendar.color"
                          ></span>
                          {{selectedCalendar?.title}}
                        </div>
                        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <!-- Heroicon name: solid/selector -->
                          <svg
                            class="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>

                      <ul
                        class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                        *ngIf="showOption"
                      >
                        <li
                          class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 rounded-full hover:text-white"
                          id="listbox-option-0"
                          role="option"
                          *ngFor="let calendar of calendars"
                          (click)="selectValue(calendar)"
                        >
                          <div class="flex items-center">
                            <!-- Online: "bg-green-400", Not Online: "bg-gray-200" -->
                            <span
                              class="flex-shrink-0 inline-block h-2 w-2 rounded-full"
                              aria-hidden="true"
                              [style]="'background-color:' + calendar.color + ';'"
                            ></span>
                            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                            <span class="font-normal ml-3 block truncate">
                              {{ calendar.title }}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="flex items-center mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <div class="flex flex-auto ml-3">
                    <textarea
                      class="resize-none border rounded-md w-full"
                      placeholder="Appointment description"
                      id="mat-input-9"
                      data-placeholder="Appointment description"
                      aria-invalid="false"
                      aria-required="false"
                      [formControlName]="'description'"
                      [placeholder]="'Appointment description'"
                    >
                    </textarea>
                  </div>
                </div>
                <div class="ml-auto mt-6">
                  <button
                    type="button"
                    (click)="remoeEventModal()"
                    class=" bg-white text-black border font-bold py-2 px-4 rounded-full mr-3 hover:bg-gray-200 focus:outline-none focus:ring-offset-0 focus:ring-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    *ngIf="panelMode === 'add'"
                    class="bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0"
                    (click)="addEventHandle()"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    *ngIf="panelMode === 'edit'"
                    class="bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 "
                    (click)="updateEventHandle()"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ng-container>
    </div>

    <!-- Remove Date Modal -->
    <div class="fixed z-10 overflow-y-auto remove-modal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="p-3 text-center text-gray-900">Are you sure do you want to remove the event?</div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              (click)="removeEventHandle()"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-offset-0 focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Remove
            </button>
            <button
              type="button"
              (click)="removeModal()"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-0 focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Modal -->
    <div class="fixed z-10 overflow-y-auto info-modal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white text-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
        >
          <div>
            <div class="flex-auto p-8 ng-star-inserted">
              <div class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mat-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div class="flex flex-auto justify-between ml-6">
                  <div>
                    <div *ngIf="event?.event?.title" class="text-xl font-semibold tracking-tight leading-none">
                      {{ event?.event?.title }}
                    </div>
                    <div *ngIf="event?.event?.range?.start" class="mt-0.5 text-sm">
                      {{ date_format(event?.event?.range?.start) }}
                    </div>
                    <div class="text-secondary"></div>
                  </div>
                  <div class="flex -mt-2 -mr-2 ml-10">
                    <button
                      class="mat-focus-indicator mat-icon-button mat-button-base ng-star-inserted hover:text-gray-500"
                      (click)="updateEvent()"
                    >
                      <span class="mat-button-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      class="mat-focus-indicator mat-icon-button mat-button-base ng-star-inserted hover:text-gray-500"
                      (click)="removeEvent()"
                    >
                      <span class="mat-button-wrapper">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex mt-6 ng-star-inserted" *ngIf="event?.event?.description">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <div class="flex-auto ml-6">{{ event?.event?.description }}</div>
              </div>
              <div class="flex mt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div class="flex flex-auto items-center ml-6">
                  <div class="w-2 h-2 rounded-full" [style.background]="event?.color"></div>
                  <div class="ml-3 leading-none">{{ event?.title }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              (click)="remoeEventInfoModal()"
              class="mr-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-offset-2 focus:ring-0 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal calendar -->
    <div
      class="fixed z-10 overflow-y-auto calendar-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <ng-container *ngIf="calendarMode === 'add' || calendarMode === 'edit'">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div class="bg-white text-black mx-auto p-2">
              <ng-container *ngIf="calendarMode === 'add'">
                <p class="text-2xl font-semibold tracking-tight">Add calendar</p>
              </ng-container>
              <ng-container *ngIf="calendarMode === 'edit'">
                <p class="text-2xl font-semibold tracking-tight">Edit calendar</p></ng-container
              >
            </div>
            <form [formGroup]="calendarForm" class="text-gray-900">
              <div class="bg-white mx-auto p-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  [placeholder]="'Calendar title'"
                  [formControlName]="'title'"
                  required
                />
              </div>

              <div class="bg-white mx-auto p-2">
                <div>
                  <div>
                    <div class="flex flex-row relative">
                      <input
                        id="color-picker"
                        class="border border-gray-400 p-2 w-full text-base focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm rounded-md "
                        [(ngModel)]="currentColor"
                        [formControlName]="'color'"
                        readonly
                        required
                      />
                      <div
                        (click)="isOpen = !isOpen"
                        class="cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex"
                        [ngClass]="currentColor && 'bg-' + currentColor"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          [ngClass]="iconColor"
                          class="h-6 w-6 mx-auto my-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      </div>
                      <div
                        *ngIf="isOpen"
                        class="border border-gray-300 origin-top-right absolute right-0 top-full mt-2 rounded-md shadow-lg"
                      >
                        <div class="rounded-md bg-white shadow-xs p-2">
                          <div class="flex">
                            <ng-container *ngFor="let color of colors">
                              <div class="">
                                <ng-container *ngFor="let variant of variants">
                                  <div
                                    (click)="selectColor(color, variant)"
                                    class="cursor-pointer w-6 h-6 rounded-full mx-1 my-1"
                                    [ngClass]="color && 'bg-' + color + '-' + variant"
                                  ></div>
                                </ng-container>
                              </div>
                            </ng-container>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end mt-2">
                <button
                  type="button"
                  class="mr-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-offset-0 focus:ring-0 sm:text-sm"
                  (click)="closeEditPanel()"
                >
                  Cancel
                </button>
                <button
                  *ngIf="calendarMode === 'edit'"
                  type="button"
                  class="mr-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  focus:ring-offset-0 focus:ring-0 sm:text-sm"
                  (click)="deleteCalendar(calendarForm.get('id').value)"
                >
                  Delete
                </button>
                <button
                  *ngIf="calendarMode === 'edit'"
                  type="button"
                  class="disabled:opacity-50 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-offset-0 focus:ring-0 sm:text-sm"
                  [color]="'primary'"
                  [disabled]="calendarForm.invalid"
                  (click)="saveCalendar()"
                >
                  Update
                </button>
                <button
                  type="button"
                  class="disabled:opacity-50 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-offset-0 focus:ring-0 sm:text-sm"
                  *ngIf="calendarMode === 'add'"
                  [color]="'primary'"
                  [disabled]="calendarForm.invalid"
                  (click)="saveCalendar()"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </ng-container>
    </div>

    <!-- Recurrence Modal -->
    <div
      class="fixed z-10 overflow-y-auto recurrence-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed bg-gray-500 bg-opacity-75 transition-opacity recurrence-modal" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
        >
          <div>
            <form class="flex flex-col w-full" [formGroup]="recurrenceForm">
              <div class="text-2xl font-semibold text-black">Recurrence rules</div>

              <!-- Interval and frequency -->
              <div class="flex mt-12">
                <div class="w-full -mt-6">
                  <label class="text-black" for="interval">Repeat every</label>
                  <input
                    type="number"
                    class="w-full text-base border-gray-300 text-black outline-none focus:outline-none focus:ring-0 focus:border-0 sm:text-sm rounded-md"
                    [autocomplete]="'off'"
                    [formControlName]="'interval'"
                    [min]="1"
                    required
                    id="interval"
                    [ngClass]="[recurrenceForm.get('interval').invalid && 'border-red-500']"
                    onkeypress="return event.charCode > 48"
                  />
                </div>
                <div class="w-full ml-4">
                  <select
                    [formControlName]="'freq'"
                    class="block w-full pl-3 pr-10 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option [value]="'DAILY'" class="text-black">day(s)</option>
                    <option [value]="'WEEKLY'" class="text-black">week(s)</option>
                    <option [value]="'MONTHLY'" class="text-black">month(s)</option>
                    <option [value]="'YEARLY'" class="text-black">year(s)</option>
                  </select>
                </div>
              </div>

              <div
                class="flex flex-col mt-6"
                [formGroupName]="'weekly'"
                *ngIf="recurrenceForm.get('freq').value === 'WEEKLY'"
              >
                <div class="font-medium text-black">Repeat on</div>
                <mat-button-toggle-group
                  class="mt-1.5 border-0 space-x-1"
                  [formControlName]="'byDay'"
                  [multiple]="true"
                >
                  <mat-button-toggle
                    class="w-10 h-10 rounded-full text-black focus:outline-none focus:border-none  focus:ring-0"
                    *ngFor="let weekday of weekdays; let i = index"
                    [ngClass]="[weekday.label === currentDay ? 'bg-gray-300' : 'class_' + i]"
                    [disableRipple]="true"
                    [value]="weekday.value"
                    (click)="changeSelect(i)"
                  >
                    {{ weekday.abbr }}
                  </mat-button-toggle>
                </mat-button-toggle-group>
              </div>

              <!-- Monthly repeat options -->
              <div class="flex mt-6" [formGroupName]="'monthly'" *ngIf="recurrenceForm.get('freq').value === 'MONTHLY'">
                <div class="w-full">
                  <label class="text-black">Repeat on</label>
                  <select
                    [formControlName]="'repeatOn'"
                    class="block w-full pl-3 pr-10 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option [value]="'date'" class="text-black">
                      Monthly on day {{ recurrenceForm.get('monthly.date').value }}
                    </option>
                    <option [value]="'nthWeekday'" class="text-black">Monthly on the {{ nthWeekdayText }}</option>
                  </select>
                </div>
              </div>

              <!-- Ends -->
              <ng-container [formGroupName]="'end'">
                <div class="flex flex-col mt-10">
                  <div class="flex items-center">
                    <div class="w-full -mt-6">
                      <label class="text-black">Ends</label>
                      <select
                        [formControlName]="'type'"
                        class="block w-full pl-3 pr-10 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option [value]="'never'" class="text-black">Never</option>
                        <option [value]="'until'" class="text-black">On</option>
                        <option [value]="'count'" class="text-black">After</option>
                      </select>
                    </div>
                    <mat-form-field
                      class="w-40 ml-4 z-50 border-gray-300 border rounded-md"
                      *ngIf="recurrenceForm.get('end.type').value === 'until'"
                    >
                      <input matInput [matDatepicker]="untilDatePicker" [formControlName]="'until'" />
                      <mat-datepicker-toggle matSuffix [for]="untilDatePicker"></mat-datepicker-toggle>
                      <mat-datepicker #untilDatePicker></mat-datepicker>
                    </mat-form-field>

                    <ng-container *ngIf="recurrenceForm.get('end.type').value === 'count'">
                      <div class="w-full">
                        <br />
                        <div class="w-40 ml-4">
                          <input
                            type="number"
                            multiple
                            class="w-full text-base border-gray-300 text-black focus:outline-none focus:ring-0 focus:border-0 sm:text-sm rounded-md"
                            [autocomplete]="'off'"
                            [formControlName]="'count'"
                            [min]="1"
                            required
                            [ngClass]="[recurrenceForm.get('end.count').invalid && 'border-red-500']"
                            onkeypress="return event.charCode > 48"
                          />
                        </div>
                        <span class="ml-4 text-green-500" *ngIf="recurrenceForm.get('end.count').valid"
                          >occurrence(s)</span
                        >
                        <span class="ml-4 text-red-500" *ngIf="recurrenceForm.get('end.count').invalid"
                          >occurrence(s)</span
                        >
                      </div>
                    </ng-container>
                  </div>
                </div>
              </ng-container>

              <!-- Actions -->
              <div class="ml-auto mt-8">
                <button
                  class="clear"
                  (click)="clear()"
                  class="mr-2 rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none  focus:ring-offset-0 focus:ring-0 sm:text-sm"
                >
                  Clear
                </button>
                <button
                  [disabled]="recurrenceForm.invalid"
                  (click)="done()"
                  class="disabled:opacity-50 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset0 sm:text-sm"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class WebUiCalendarComponent {
  @ViewChild('fullCalendar') fullCalendar: FullCalendarComponent
  @Input() fetchEvent?: any
  @Input() calendars: any
  @Input() fetchSettings?: CalendarSettings
  @Input() weekdays?: CalendarWeekday[]
  @Output() addEventInServserSide = new EventEmitter<any>()
  @Output() removeEventInServserSide = new EventEmitter<any>()
  @Output() updateEventInServserSide = new EventEmitter<any>()
  @Output() addCalendarInServserSide = new EventEmitter<any>()
  @Output() updateCalendarInServserSide = new EventEmitter<any>()
  @Output() updateCalendarVisibleInServserSide = new EventEmitter<any>()
  @Output() deleteCalendarInServserSide = new EventEmitter<any>()
  @Output() settingsUpdateCalendarInServserSide = new EventEmitter<any>()

  selectedCalendar: Calendar

  startWeekOnheckEnumFormat: string
  timeCheckEnumFormat: string
  dateCheckEnumFormat: string
  recurrenceFormValues: any
  settingsForm: FormGroup
  currentCalendarSelect: Calendar
  recurrenceForm: FormGroup
  calendar: Calendar | null
  showOption: boolean = false
  calendarMode: string
  calendarColors: any = calendarColors
  eventForm: FormGroup
  calendarForm: FormGroup
  panelMode: string
  event: any
  calendarOptions: CalendarOptions
  selected: { startDate; endDate }
  dropDownMenu: boolean = false
  isCalendar = true
  isSetting = false
  views: any
  viewTitle: string
  calendarApi
  apiEvt
  clickInfo: EventClickArg
  currentEvents: EventApi[] = []
  fullCalendarApi: FullCalendar
  
  options: any = {
    autoApply: false,
    alwaysShowCalendars: false,
    showCancel: false,
    showClearButton: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: false,
    showISOWeekNumbers: false,
    customRangeDirection: true,
    lockStartDate: false,
    closeOnAutoApply: true,
  }


  calendarVisible = true
  colors: any[] = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
  variants: any[] = [500]
  currentColor: string
  iconColor: string = ''
  isOpen: boolean = false
  cloneFetch: any

  dataWeekEnd: any
  nthWeekdayText: string
  currentDay: string

  //selected: any;
  alwaysShowCalendars: boolean
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')]

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'))
  }

  constructor(private elementRef: ElementRef, private _formBuilder: FormBuilder) {
    this.alwaysShowCalendars = true
  }

  ngOnInit() {
    // Remove all model
    this.elementRef.nativeElement.querySelector('.modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.remove-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.recurrence-modal').style.display = 'none'

    // Enum check value exits
    this.dateCheckEnumFormat = 'MM/dd/yyyy'//DateFormat[this.fetchSettings[0]?.dateFormat]
    this.timeCheckEnumFormat = TimeFormat[this.fetchSettings[0]?.timeFormat]
    this.startWeekOnheckEnumFormat = StartWeekOn[this.fetchSettings[0]?.startWeekOn]

    // Create Day of Array
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // Find Current Date
    let dateObj = new Date()
    // Get Only day
    let day = dateObj.getDay()
    // Date covert to string
    this.currentDay = days[day]

    // Create the recurrence form
    this.recurrenceForm = this._formBuilder.group({
      freq: [null],
      interval: [null, Validators.required],
      weekly: this._formBuilder.group({
        byDay: [[]],
      }),
      monthly: this._formBuilder.group({
        repeatOn: [null], // date | nthWeekday
        date: [null],
        nthWeekday: [null],
      }),
      end: this._formBuilder.group({
        type: [null], // never | until | count
        until: [null],
        count: [null],
      }),
    })

    // Create the event form
    this.settingsForm = this._formBuilder.group({
      id: [''],
      dateFormat: [''],
      timeFormat: [''],
      startWeekOn: [''],
    })

    // Create the event form
    this.calendarForm = this._formBuilder.group({
      id: [''],
      title: [''],
      color: [''],
      visible: [true],
    })

    // Create the calendar form
    this.eventForm = this._formBuilder.group({
      id: [''],
      calendarId: [''],
      recurringEventId: [null],
      title: [''],
      description: [''],
      start: [null],
      end: [null],
      duration: [null],
      allDay: [true],
      recurrence: [null],
      range: [{}],
    })

    // Subscribe to 'range' field value changes
    this.eventForm.get('range').valueChanges.subscribe((value) => {
      if (!value) {
        return
      }

      // Set the 'start' field value from the range
      this.eventForm.get('start').setValue(value.start, { emitEvent: false })

      // If this is a recurring event...
      if (this.eventForm.get('recurrence').value) {
        // Update the recurrence rules if needed
        this._updateRecurrenceRule()

        // Set the duration field
        const duration = moment(value.end).diff(moment(value.start), 'minutes')
        this.eventForm.get('duration').setValue(duration, { emitEvent: false })

        // Update the end value
        this._updateEndValue()
      }
      // Otherwise...
      else {
        // Set the end field
        this.eventForm.get('end').setValue(value.end, { emitEvent: false })
      }
    })

    // Subscribe to 'recurrence' field changes
    this.eventForm.get('recurrence').valueChanges.subscribe((value) => {
      // If this is a recurring event...
      if (value) {
        // Update the end value
        this._updateEndValue()
      }
    })

    if (localStorage.getItem('panelMode')) {
      this.panelMode = localStorage.getItem('panelMode')
    } else {
      localStorage.setItem('panelMode', (this.panelMode = 'add'))
    }

    if (localStorage.getItem('calendarMode')) {
      this.calendarMode = localStorage.getItem('calendarMode')
    } else {
      localStorage.setItem('calendarMode', (this.calendarMode = 'add'))
    }

    this.initColor()

    let newSettingsObject = omit(this.fetchSettings[0], ['__typename', 'updatedAt', 'createdAt', 'name'])
    this.settingsForm.patchValue(newSettingsObject)
  }

  ngOnChanges() {
    // initial value of object
    this.calendarOptions = {
      plugins:[dayGridPlugin,timeGridPlugin,listPlugin,interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      buttonText: {
        list: 'Schedule',
      },
      initialView: 'dayGridMonth',
      eventSources: this.fetchEvent, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      droppable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
      */
    }
    //
  }

  getCalendar(id): Calendar {
    if (!id) {
      return
    }

    if(!this.fetchEvent){
      console.log('missing fetch event')
    }
    return this.fetchEvent.find((calendar) => calendar?.id === id)
  }

  ngAfterViewInit() {
    this.fullCalendarApi = this.fullCalendar.getApi()
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this
    calendarOptions.weekends = !calendarOptions.weekends
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.currentCalendarSelect = null
    this.elementRef.nativeElement.querySelector('.modal').classList.add('inset-0')
    this.elementRef.nativeElement.querySelector('.modal').style.display = 'block'
    localStorage.setItem('panelMode', (this.panelMode = 'add'))

    // Get calendar event date
    this.calendarApi = selectInfo.view.calendar

    // New date
    var startDate = new Date()

    // Update date
    startDate.setFullYear(startDate.getFullYear() + 1)

    // Format date
    let endDateFormat = moment(startDate).format('YYYY-MM-DD HH:mm:ss')
    let startDateFormat = moment(selectInfo.startStr).format('YYYY-MM-DD HH:mm:ss')

    // Set date
    let range = {
      start: startDateFormat,
      end: endDateFormat,
    }

    // Reset form event
    this.eventForm.reset()

    // Set Range
    this.eventForm.get('range').setValue(range)
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.elementRef.nativeElement.querySelector('.info-modal').classList.add('inset-0')
    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'block'
    this.apiEvt = clickInfo.view.calendar

    this.clickInfo = clickInfo

    // Find the event with the clicked event's id
    const event: any = cloneDeep(this.currentEvents.find((item) => item.id === clickInfo.event.id))

    // Set the range on the event
    event.range = {
      start: event.start,
      end: event.end,
    }

    let eventColor = this.getCalendar(event._def.extendedProps.calendarId)

    // Set the event
    this.event = { event: event, color: eventColor.color, title: eventColor.title }

    // Event clone
    let updateEvent = { ...event._def, range: event.range, ...event._def.extendedProps, id: event._def.publicId }

    // Reset the form and fill the event
    this.eventForm.reset()
    this.eventForm.patchValue(updateEvent)
    this.currentCalendarSelect = null
    this.timePicker = false
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events
  }

  public onSetting() {
    this.isCalendar = false
    this.isSetting = true
    this.elementRef.nativeElement.querySelector('.calendar-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.info-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.remove-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.recurrence-modal').classList.remove('inset-0')

    this.elementRef.nativeElement.querySelector('.modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.remove-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.recurrence-modal').style.display = 'none'
  }
  public onBack() {
    this.isSetting = false
    this.isCalendar = true
    this.elementRef.nativeElement.querySelector('.modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.remove-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.recurrence-modal').style.display = 'none'
  }

  remoeEventModal() {
    this.elementRef.nativeElement.querySelector('.modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.modal').style.display = 'none'
  }
  removeModal() {
    this.elementRef.nativeElement.querySelector('.remove-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.remove-modal').style.display = 'none'
  }

  addEventHandle() {
    this.calendarApi.unselect() // clear date selection

    // Get the clone of the event form value
    let newEvent = clone(this.eventForm.value)

    let start = moment(newEvent.range.start.$d).format()
    let end = moment(newEvent.range.end.$d).format()

    // If the event is a recurring event...
    if (newEvent.recurrence) {
      // Set the event duration
      newEvent.duration = moment(end).diff(moment(start), 'minutes')
    }

    // Find color
    let color =  this.selectedCalendar?.color  //this.fetchEvent.find((color) => color?.id === this.selectedCalendar?.id)

    if (!color) {
      color = 'New'
    }

    let customId: string

    if (!this.currentCalendarSelect?.id) {
      customId = this.fetchEvent[0].id
    } else {
      customId = this.currentCalendarSelect?.id
    }


    // Send data server
    if (newEvent.calendarId) {
      //this.calendarApi.addEvent({ ...newEvent, color, rrule: newEvent.recurrence })
      this.addEventInServserSide.emit({ input: newEvent })
      this.fullCalendarApi.refetchEvents()
      this.eventForm.reset()
    }
    this.elementRef.nativeElement.querySelector('.modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.modal').style.display = 'none'

    localStorage.removeItem('panelMode')
  }

  updateEventHandle() {
    // Get the clone of the event form value
    let newEvent = clone(this.eventForm.value)

    let start
    let end

    // Date formate
    if (
      moment(this.selected.startDate).format() === moment(newEvent.range.start.$d).format() &&
      moment(this.selected.endDate).format() === moment(newEvent.range.end.$d).format()
    ) {
      start = newEvent.range.start
      end = newEvent.range.end
    } else {
      start = moment(newEvent.range.start.$d).format()
      end = moment(newEvent.range.end.$d).format()
    }

    // If the event is a recurring event...
    if (newEvent.recurrence) {
      // Set the event duration
      newEvent.duration = moment(end).diff(moment(start), 'minutes')
    }

    // Modify the event before sending it to the server

    if (!this.currentCalendarSelect?.id) {
      newEvent = omit(
        newEvent,
        ['range', 'duration'],
        (newEvent.start = start),
        (newEvent.end = end),
      ) as AdminCreateAppointmentInput
    } else {
      newEvent = omit(
        newEvent,
        ['range', 'duration'],
        (newEvent.start = newEvent.range.start),
        (newEvent.end = newEvent.range.end),
        (newEvent.calendarId = this.currentCalendarSelect?.id),
      ) as AdminUpdateAppointmentInput
    }

    // Update calendar event
    let event_source_object_update = this.fetchEvent.map((data) => {
      data.events.map((res) => {
        if (res.calendarId === newEvent.calendarId) {
          if (res.recurrence === '') {
            res.start = newEvent.start
            res.end = newEvent.end
            res.id = newEvent.id
            res.isFirstInstance = newEvent.isFirstInstance
            res.recurrence = newEvent.recurrence
            res.recurringEventId = newEvent.recurringEventId
            res.calendarId = newEvent.calendarId
            res.title = newEvent.title
            res.description = newEvent.description
          } else {
            res.start = newEvent.start
            res.end = newEvent.end
            res.id = newEvent.id
            res.isFirstInstance = newEvent.isFirstInstance
            res.recurrence = newEvent.recurrence
            res.rrule = newEvent.recurrence
            res.recurringEventId = newEvent.recurringEventId
            res.calendarId = newEvent.calendarId
            res.title = newEvent.title
            res.description = newEvent.description
          }
        }
      })
      return data
    })

    this.apiEvt.unselect()

    this.apiEvt.addEventSource(event_source_object_update).remove()

    const id = this.clickInfo.event._def.publicId as string
    this.updateEventInServserSide.emit(newEvent)

    this.elementRef.nativeElement.querySelector('.modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.info-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'none'
  }

  removeEvent() {
    this.elementRef.nativeElement.querySelector('.remove-modal').classList.add('inset-0')
    this.elementRef.nativeElement.querySelector('.remove-modal').style.display = 'block'
    this.elementRef.nativeElement.querySelector('.info-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'none'
  }

  updateEvent() {
    this.elementRef.nativeElement.querySelector('.modal').classList.add('inset-0')
    this.elementRef.nativeElement.querySelector('.modal').style.display = 'block'

    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'none'
    this.elementRef.nativeElement.querySelector('.info-modal').classList.remove('inset-0')
    localStorage.setItem('panelMode', (this.panelMode = 'edit'))
  }

  removeEventHandle() {
    this.apiEvt.unselect()
    this.clickInfo.event.remove()
    this.removeEventInServserSide.emit(this.clickInfo.event._def.publicId)
    this.removeModal()
  }

  date_format(date_string) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    let date = new Date(date_string)
    return (
      days[date.getDay()] +
      ' ' +
      months[date.getMonth()] +
      ' ' +
      date.getDate() +
      ' ' +
      date.toLocaleTimeString('en-US')
    )
  }

  calendarEvent() {
    localStorage.setItem('panelMode', (this.calendarMode = 'add'))
    this.elementRef.nativeElement.querySelector('.calendar-modal').classList.add('inset-0')
    this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'block'
  }

  closeEditPanel() {
    this.elementRef.nativeElement.querySelector('.calendar-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'none'
  }

  saveCalendar() {
    if (this.calendarMode === 'add') {
      // Get the clone of the calendar form value
      let newCalendar = clone(this.calendarForm.value)

      // Modify the calendar before sending it to the server
      newCalendar = omit(newCalendar, ['id']) as AdminCreateCalendarInput

      // Send data server
      if (newCalendar) {
        this.addCalendarInServserSide.emit({ input: newCalendar })
        this.calendarForm.reset()
        this.calendarForm.get('color').setValue('indigo')
        this.elementRef.nativeElement.querySelector('.calendar-modal').classList.remove('inset-0')
        this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'none'
      }
    } else {
      // Get the clone of the calendar form value
      let newCalendar = clone(this.calendarForm.value)

      // Modify the calendar before sending it to the server
      newCalendar = omit(newCalendar) as AdminUpdateCalendarInput

      const calendarId = newCalendar.id as string

      // Send data server
      this.updateCalendarInServserSide.emit({ calendarId: calendarId, input: newCalendar })
      this.calendarForm.reset()
      this.calendarForm.get('color').setValue('indigo')
      this.elementRef.nativeElement.querySelector('.calendar-modal').classList.remove('inset-0')
      this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'none'
    }
  }

  deleteCalendar(calendarId) {
    this.deleteCalendarInServserSide.emit({ calendarId: calendarId })
    this.calendarForm.reset()
    this.calendarForm.get('color').setValue('indigo')
    this.elementRef.nativeElement.querySelector('.calendar-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'none'
  }

  toggleCalendarVisibility(calendar: Calendar): void {
    // Toggle the visibility
    if(calendar.visible === null) {
      calendar.visible = false
    }

    calendar.visible = !calendar.visible

    console.log('toggling and emitting', calendar)
    // Dodify object of update
    //let calendarData = omit(calendar, ['__typename']) as UserUpdateCalendarInput

    // Send data server
    this.updateCalendarVisibleInServserSide.emit(calendar)
  }

  openEditPanel(calendar) {
    localStorage.setItem('panelMode', (this.calendarMode = 'edit'))
    this.elementRef.nativeElement.querySelector('.calendar-modal').classList.add('inset-0')
    this.elementRef.nativeElement.querySelector('.calendar-modal').style.display = 'block'

    // Reset the form and fill the calendar
    this.calendarForm.reset()
    this.calendarForm.patchValue(calendar)
  }

  initColor() {
    this.currentColor = 'indigo'
    this.setIconWhite()
  }
  setIconWhite() {
    this.iconColor = 'text-gray'
  }
  setIconBlack() {
    this.iconColor = 'text-black'
  }

  selectColor(color, variant) {
    console.log('selectColor', color)
    this.currentColor = color
    this.setIconWhite()
    this.isOpen = !this.isOpen
    
  }

  get year(): string {
    return new Date().getFullYear().toString()
  }

  updateSettings(): void {
    // Get the settings
    const settings = this.settingsForm.value

    // Update the settings on the server
    this.settingsUpdateCalendarInServserSide.emit(settings)

    // Reset the form with the updated settings
    this.settingsForm.reset()
  }

  selectValue(calendar) {
    console.log('selected calendar', calendar)

    this.selectedCalendar = calendar
    if (this.panelMode === 'edit') {
      //this.getCalendar('')
     //this.currentCalendarSelect = this.getCalendar(calendar?.id)
      this.showOption = false
    } else {
     //this.currentCalendarSelect = this.getCalendar(calendar?.id)
      this.showOption = false
    }
  }

  public timePicker: boolean = true
  public toggleChecked(value) {
    value ? (this.timePicker = false) : (this.timePicker = true)
  }

  recurrenceEvent() {
    this.elementRef.nativeElement.querySelectorAll('.recurrence-modal').forEach((res) => {
      res.classList.add('inset-0')
      res.style.display = 'block'
    })

    this.dataWeekEnd = this.eventForm.value

    // Initialize
    this._init()

    // Subscribe to 'freq' field value changes
    this.recurrenceForm.get('freq').valueChanges.subscribe((value) => {
      // Set the end values
      this._setEndValues(value)
    })

    // Subscribe to 'weekly.byDay' field value changes
    this.recurrenceForm.get('weekly.byDay').valueChanges.subscribe((value) => {
      // Get the event's start date
      const startDate = moment(this.eventForm.value.range.start)

      // If nothing is selected, select the original value from
      //  the event form to prevent an empty value on the field
      if (!value || !value.length) {
        //Get the day of event start date
        const eventStartDay = startDate.format('dd').toUpperCase()
        // Set the original value back without emitting a
        // change event to prevent an infinite loop
        this.recurrenceForm.get('weekly.byDay').setValue([eventStartDay], { emitEvent: false })
      }
    })

    // Patch the form with the values
    this.recurrenceForm.patchValue(this.recurrenceFormValues)

    // Set end values for the first time
    this._setEndValues(this.recurrenceForm.get('freq').value)
  }

  ngOnDestroy() {
    localStorage.removeItem('panelMode')
    localStorage.removeItem('calendarMode')
  }

  clear(): void {
    // Close the dialog
    this.elementRef.nativeElement.querySelectorAll('.recurrence-modal').forEach((res) => {
      res.classList.remove('inset-0')
      res.style.display = 'none'
    })
  }

  done(): void {
    // Get the recurrence form values
    const recurrenceForm = this.recurrenceForm.value

    let newInterval = Math.abs(recurrenceForm.interval)

    if (newInterval < 1) {
      newInterval = 1
    }

    // Prepare the rule array and add the base rules
    const ruleArr = ['FREQ=' + recurrenceForm.freq, 'INTERVAL=' + newInterval]

    // If monthly on certain days...
    if (recurrenceForm.freq === 'MONTHLY' && recurrenceForm.monthly.repeatOn === 'nthWeekday') {
      ruleArr.push('BYDAY=' + recurrenceForm.monthly.nthWeekday)
    }

    // If weekly...
    if (recurrenceForm.freq === 'WEEKLY') {
      // If byDay is an array...
      if (Array.isArray(recurrenceForm.weekly.byDay)) {
        ruleArr.push('BYDAY=' + recurrenceForm.weekly.byDay.join(','))
      }
      // Otherwise
      else {
        ruleArr.push('BYDAY=' + recurrenceForm.weekly.byDay)
      }
    }

    // If one of the end options is selected...
    if (recurrenceForm.end.type === 'until') {
      ruleArr.push('UNTIL=' + moment(recurrenceForm.end.until).endOf('day').utc().format('YYYYMMDD[T]HHmmss[Z]'))
    }

    if (recurrenceForm.end.type === 'count') {
      ruleArr.push('COUNT=' + recurrenceForm.end.count)
    }

    // Generate rule text
    const ruleText = ruleArr.join(';')

    this.elementRef.nativeElement.querySelectorAll('.recurrence-modal').forEach((res) => {
      res.classList.remove('inset-0')
    })

    if (ruleText === '') {
      // Clear the recurrence field if recurrence cleared
      this.eventForm.get('recurrence').setValue(null)
    }
    // Otherwise...
    else {
      // Update the recurrence field with the result
      this.eventForm.get('recurrence').setValue(ruleText)
    }

    this.recurrenceForm.reset()
  }

  private _init(): void {
    // Get the event's start date
    const startDate = moment(this.dataWeekEnd.range.start)

    // Calculate the weekday
    const weekday = moment(this.dataWeekEnd.range.start).format('dd').toUpperCase()

    // Calculate the nthWeekday
    let nthWeekdayNo = 1
    while (startDate.clone().isSame(startDate.clone().subtract(nthWeekdayNo, 'week'), 'month')) {
      nthWeekdayNo++
    }
    const nthWeekday = nthWeekdayNo + weekday

    // Calculate the nthWeekday as text
    const ordinalNumberSuffixes = {
      1: 'st',
      2: 'nd',
      3: 'rd',
      4: 'th',
      5: 'th',
    }
    this.nthWeekdayText =
      nthWeekday.slice(0, 1) +
      ordinalNumberSuffixes[nthWeekday.slice(0, 1)] +
      ' ' +
      this.weekdays.find((item) => item.value === nthWeekday.slice(-2)).label

    // Set the defaults on recurrence form values
    this.recurrenceFormValues = {
      freq: 'DAILY',
      interval: 1,
      weekly: {
        byDay: weekday,
      },
      monthly: {
        repeatOn: 'date',
        date: moment(this.dataWeekEnd.range.start).date(),
        nthWeekday: nthWeekday,
      },
      end: {
        type: 'never',
        until: null,
        count: null,
      },
    }

    // If recurrence rule string is available on the
    // event meaning that the is a recurring one...
    if (this.dataWeekEnd.recurrence) {
      // Parse the rules
      const parsedRules: any = {}
      this.dataWeekEnd.recurrence.split(';').forEach((rule) => {
        parsedRules[rule.split('=')[0]] = rule.split('=')[1]
      })

      // Overwrite the recurrence form values
      this.recurrenceFormValues.freq = parsedRules.FREQ
      this.recurrenceFormValues.interval = parsedRules.INTERVAL

      if (parsedRules.FREQ === 'WEEKLY') {
        this.recurrenceFormValues.weekly.byDay = parsedRules.BYDAY.split(',')
      }

      if (parsedRules.FREQ === 'MONTHLY') {
        this.recurrenceFormValues.monthly.repeatOn = parsedRules.BYDAY ? 'nthWeekday' : 'date'
      }

      this.recurrenceFormValues.end.type = parsedRules.UNTIL ? 'until' : parsedRules.COUNT ? 'count' : 'never'
      this.recurrenceFormValues.end.until = parsedRules.UNTIL || null
      this.recurrenceFormValues.end.count = parsedRules.COUNT || null
    }
  }

  private _setEndValues(freq: string): void {
    // Return if freq is not available
    if (!freq) {
      return
    }

    // Get the event's start date
    const startDate = moment(this.dataWeekEnd.range.startDate)

    // Get the end type
    const endType = this.recurrenceForm.get('end.type').value

    // If until is not selected
    if (endType !== 'until') {
      let until

      // Change the until's default value based on the frequency
      if (freq === 'DAILY') {
        until = startDate.clone().add(1, 'month').toISOString()
      }

      if (freq === 'WEEKLY') {
        until = startDate.clone().add(12, 'weeks').toISOString()
      }

      if (freq === 'MONTHLY') {
        until = startDate.clone().add(12, 'months').toISOString()
      }

      if (freq === 'YEARLY') {
        until = startDate.clone().add(5, 'years').toISOString()
      }

      // Set the until
      this.recurrenceForm.get('end.until').setValue(until)
    }

    // If count is not selected...
    if (endType !== 'count') {
      let count

      // Change the count's default value based on the frequency
      if (freq === 'DAILY') {
        count = 30
      }

      if (freq === 'WEEKLY' || freq === 'MONTHLY') {
        count = 12
      }

      if (freq === 'YEARLY') {
        count = 5
      }

      // Set the count
      this.recurrenceForm.get('end.count').setValue(count)
    }
  }

  public isActive = false
  onList() {
    this.isActive = !this.isActive
  }
  select = []

  private _updateEndValue(): void {
    // Get the event recurrence
    const recurrence = this.eventForm.get('recurrence').value

    // Return if this is a non-recurring event
    if (!recurrence) {
      return
    }

    // Parse the recurrence rule
    const parsedRules = {}
    recurrence.split(';').forEach((rule) => {
      // Split the rule
      const parsedRule = rule.split('=')

      // Add the rule to the parsed rules
      parsedRules[parsedRule[0]] = parsedRule[1]
    })

    // If there is an UNTIL rule...
    if (parsedRules['UNTIL']) {
      // Use that to set the end date
      this.eventForm.get('end').setValue(parsedRules['UNTIL'])

      // Return
      return
    }

    // If there is a COUNT rule...
    if (parsedRules['COUNT']) {
      // Generate the RRule string
      const rrule =
        'DTSTART=' +
        moment(this.eventForm.get('start').value).utc().format('YYYYMMDD[T]HHmmss[Z]') +
        '\nRRULE:' +
        recurrence

      // Use RRule string to generate dates
      const dates = RRule.fromString(rrule).all()

      // Get the last date from dates array and set that as the end date
      this.eventForm.get('end').setValue(moment(dates[dates.length - 1]).toISOString())

      // Return
      return
    }

    // If there are no UNTIL or COUNT, set the end date to a fixed value
    this.eventForm.get('end').setValue(moment().year(9999).endOf('year').toISOString())
  }

  private _updateRecurrenceRule(): void {
    // Get the event
    const event = this.eventForm.value

    // Return if this is a non-recurring event
    if (!event.recurrence) {
      return
    }

    // Parse the recurrence rule
    const parsedRules = {}
    event.recurrence.split(';').forEach((rule) => {
      // Split the rule
      const parsedRule = rule.split('=')

      // Add the rule to the parsed rules
      parsedRules[parsedRule[0]] = parsedRule[1]
    })

    // If there is a BYDAY rule, split that as well
    if (parsedRules['BYDAY']) {
      parsedRules['BYDAY'] = parsedRules['BYDAY'].split(',')
    }

    // Do not update the recurrence rule if ...
    // ... the frequency is DAILY,
    // ... the frequency is WEEKLY and BYDAY has multiple values,
    // ... the frequency is MONTHLY and there isn't a BYDAY rule,
    // ... the frequency is YEARLY,
    if (
      parsedRules['FREQ'] === 'DAILY' ||
      (parsedRules['FREQ'] === 'WEEKLY' && parsedRules['BYDAY'].length > 1) ||
      (parsedRules['FREQ'] === 'MONTHLY' && !parsedRules['BYDAY']) ||
      parsedRules['FREQ'] === 'YEARLY'
    ) {
      return
    }

    // If the frequency is WEEKLY, update the BYDAY value with the new one
    if (parsedRules['FREQ'] === 'WEEKLY') {
      parsedRules['BYDAY'] = [moment(event.start).format('dd').toUpperCase()]
    }

    // If the frequency is MONTHLY, update the BYDAY value with the new one
    if (parsedRules['FREQ'] === 'MONTHLY') {
      // Calculate the weekday
      const weekday = moment(event.start).format('dd').toUpperCase()

      // Calculate the nthWeekday
      let nthWeekdayNo = 1
      while (moment(event.start).isSame(moment(event.start).subtract(nthWeekdayNo, 'week'), 'month')) {
        nthWeekdayNo++
      }

      // Set the BYDAY
      parsedRules['BYDAY'] = [nthWeekdayNo + weekday]
    }

    // Generate the rule string from the parsed rules
    const rules = []
    Object.keys(parsedRules).forEach((key) => {
      rules.push(key + '=' + (Array.isArray(parsedRules[key]) ? parsedRules[key].join(',') : parsedRules[key]))
    })
    const rrule = rules.join(';')

    // Update the recurrence rule
    this.eventForm.get('recurrence').setValue(rrule)
  }

  changeSelect(value) {
    if (this.elementRef.nativeElement.querySelector('.class_' + value).classList.contains('bg-gray-300')) {
      this.elementRef.nativeElement.querySelector('.class_' + value).classList.remove('bg-gray-300')
    } else {
      this.elementRef.nativeElement.querySelector('.class_' + value).classList.add('bg-gray-300')
    }
  }

  remoeEventInfoModal() {
    this.elementRef.nativeElement.querySelector('.info-modal').classList.remove('inset-0')
    this.elementRef.nativeElement.querySelector('.info-modal').style.display = 'none'
  }

  typeof_variable(vrr) {
    return typeof vrr
  }

  onClickedOutside(e: Event) {
    if (this.showOption) {
      this.showOption = false
    }
  }
}
