
import { Component } from '@angular/core'
import { WebTaskDetailStore } from '../web-task-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-template #headerControls>
        <div class="flex-none ml-auto space-x-3">
          <ui-button icon="back-arrow" variant="white" routerLink="../../../" label="Back"></ui-button>
          <ui-button icon="pencil" variant="white" routerLink="../edit" label="Edit"></ui-button>
          <ui-button icon="trash" variant="danger" (handler)="deleteItem(vm.item)" label="Delete"></ui-button>
        
        </div>
      </ng-template>

      <ng-template #headerTemplate>
        <ui-card-header [enableBackButton]="false" [controlsTemplate]="headerControls"></ui-card-header>
      </ng-template>

      <ng-template #subTitleTemplate>
        <div class="flex-none ml-auto space-x-3">
          <div *ngIf="vm.item">Put Relevant Details Here</div>
        </div>
      </ng-template>

      <ng-container *ngIf="vm.item">
        <ui-page
          [headerTitle]="vm.item?.name" 
          [controlsTemplate]="headerTemplate"
          [disableHeaderPadding]="true"
          [disableBodyPadding]="true"
        >
          <div class="flex-1 bg-white rounded-lg shadow md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800">
            <div class="px-4 py-5 sm:p-0" [style.min-height.px]="600">
              <div class="flex flex-row flex-wrap">
                
            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Id
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.id }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Created At
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.createdAt | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Updated At
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.updatedAt | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Name
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.name }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Title
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.title }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Due Date
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.dueDate | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Assigned Date
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.assignedDate | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Completed On
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.completedOn | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Completed
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.completed }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Completion Notes
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.completionNotes }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Assigned To
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.assignedTo?.name }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Appointment
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.appointment?.name }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Task Category
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.taskCategory?.name }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Task Sub Category
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.taskSubCategory?.name }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Task Status
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.taskStatus }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Task Priority Name
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.taskPriorityName }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Assigned User
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.assignedUser }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Subject
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.subject }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Summary
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.summary }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Due By
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.dueBy | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Scheduled For
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.scheduledFor | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Date Closed
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.dateClosed | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Closed By
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.closedBy }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Is Important
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.isImportant }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Temp
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.temp }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Created By
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.createdBy }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Date Created
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.dateCreated | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Removed
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.removed }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Task Completed Date
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.taskCompletedDate | date}}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Mig Source
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.migSource }}
              </div>
            </div>


            <div class="flex w-full py-4 border-b border-gray-200 lg:w-1/2 sm:py-5 sm:gap-4 sm:px-6">
              <div class="w-1/2 text-sm font-bold text-gray-700">
                Entity
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.entity }}
              </div>
            </div>

              </div>
            </div>
          </div>
        </ui-page>
      </ng-container>
    </ng-container>
  `,
  providers: [WebTaskDetailStore],
})
export class WebTaskOverviewComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: WebTaskDetailStore) {}

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteTaskEffect(item)
    }
  }
}

