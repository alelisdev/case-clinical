


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Chat } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-chat-table-view',
  template: `
    <ng-container>
        <div class="bg-white rounded-lg shadow dark:bg-gray-800" >
          <div class="sm:flex sm:items-center p-4">
            <div class="sm:flex-auto">
              <h1 class="text-xl font-semibold text-gray-900">Chats</h1>
            </div>
            <div class="sm:ml-16 sm:flex-none" *ngIf="chats?.length > 0">
              <a
                type="button"
                (click)="openDialog(createChatTpl, {chat: {}})"
                class="transition duration-200 inline-flex items-center justify-center rounded-full border border-transparent bg-gray-50 p-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <ng-template #createChatTpl let-ref>
          <div class="flex-grow flex flex-col">
            <div class="text-lg font-semibold tracking-wider px-4 py-3 flex space-x-4 items-center justify-between">
              <div class="flex items-center space-x-4">
                <ui-icon icon="table"></ui-icon>
                <div>Create Chat</div>
              </div>
            </div>
            <div class="flex-grow">
              <ui-chat-form (send)="this.createChat($event); ref.close()" [chat]="ref.data?.chat">
                <ui-button color="gray" (click)="ref.close()" label="Close"></ui-button>
              </ui-chat-form>
            </div>
          </div>
        </ng-template>

            
          <div class="min-h-64 overflow-x-auto">
            <div *ngIf="chats?.length > 0; else noData" class="flex flex-col">
              <div class="overflow-x-auto">
                <div class="inline-block min-w-full align-middle">
                  <div class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          
                          <th
                            scope="col"
                           class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Name
                          </th>


                          <th
                            scope="col"
                           class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            User Id
                          </th>


                          <th
                            scope="col"
                           class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Unread Count
                          </th>


                          <th
                            scope="col"
                           class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Muted
                          </th>


                          <th
                            scope="col"
                           class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Last Message
                          </th>


                          <th
                            scope="col"
                           class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Last Message At
                          </th>


                          <th
                            scope="col"
                           class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Messages
                          </th>

                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr *ngFor="let row of chats">
                          
                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            {{ row.name }}
                          </td>


                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            {{ row.userId }}
                          </td>


                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            {{ row.unreadCount }}
                          </td>


                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            {{ row.muted }}
                          </td>


                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            {{ row.lastMessage }}
                          </td>


                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            {{ row.lastMessageAt }}
                          </td>


                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            {{ row.messages }}
                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
               </div>
             </div>
          </div>


                  <ng-template #noData>
              <div class="h-64 w-full flex flex-row items-center justify-center">
              <a
                type="button"
                (click)="openDialog(createChatTpl, {chat: {}})"
                class="transition duration-200 inline-flex items-center justify-center rounded-full border border-transparent bg-gray-50 p-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              </div>
            </ng-template>
        </div>
    </ng-container>
  `,
})
export class WebChatTableViewComponent
    {
  @Input() chats: Chat[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createChat($event) {
      this.chats.push($event)
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      chat,
    }: { chat?: Chat },
  ) {
    this.dialog.open(tpl, { data: { chat }, closeButton: false })
  }

}


