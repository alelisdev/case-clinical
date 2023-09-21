
import { Component } from '@angular/core'
import { WebUserFeaturePermissionDetailStore } from '../web-user-feature-permission-detail.store'

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
                Name
              </div>
              <div class="w-1/2 text-sm text-gray-900">
                {{ vm.item.name }}
              </div>
            </div>


                

                
              <div class="px-4 py-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Feature Permission</h3>
              </div>

              <div class="border-t border-gray-200 px-4 py-5">
                <dl class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                    
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.name ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Feature Id</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.featureId ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Permission Id</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.permissionId ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">User Feature Permissions</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.userFeaturePermissions ?? 'None' }}</dd>
                  </div>

                </dl>
              </div>



              <div class="px-4 py-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900">User</h3>
              </div>

              <div class="border-t border-gray-200 px-4 py-5">
                <dl class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                    
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Developer</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.developer ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Username</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.username ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Password</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.password ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">First Name</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.firstName ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Last Name</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.lastName ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Avatar Url</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.avatarUrl ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Line 1</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.line1 ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Line 2</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.line2 ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">City</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.city ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">State</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.state ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Postal Code</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.postalCode ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Phone</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.phone ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Bio</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.bio ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.status ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Date Of Birth</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.dateOfBirth ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Cell Phone</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.cellPhone ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Education</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.education ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Firm Id</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.firmId ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Intakes</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.intakes ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Emails</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.emails ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Settings</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.settings ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">User Roles</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.userRoles ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">User Calendars</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.userCalendars ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Documents</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.documents ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Assigned Documents</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.assignedDocuments ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Messages</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.messages ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Chats</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.chats ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Navigations</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.navigations ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Notifications</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.notifications ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Shortcuts</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.shortcuts ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Case Notes</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.caseNotes ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Team Users</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.teamUsers ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Tasks</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.tasks ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">User Features</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.userFeatures ?? 'None' }}</dd>
                  </div>


                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">User Feature Permissions</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ vm.item.userFeaturePermissions ?? 'None' }}</dd>
                  </div>

                </dl>
              </div>



                
              </div>
            </div>
          </div>
        </ui-page>
      </ng-container>
    </ng-container>
  `,
  providers: [WebUserFeaturePermissionDetailStore],
})
export class WebUserFeaturePermissionOverviewComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: WebUserFeaturePermissionDetailStore) {}

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteUserFeaturePermissionEffect(item)
    }
  }

  
}

