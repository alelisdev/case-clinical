import { Component, Input } from '@angular/core'
import { AgGridAngular } from '@ag-grid-community/angular'
import { ColDef } from '@ag-grid-community/core'

@Component({
  selector: 'ui-dashboard-table',
  template: `
    <div class="h-full">
      <div
        [style.max-width]="'calc(100vw - 256px)'"
        class="align-middle inline-block min-w-full h-full border-b border-gray-200 dark:border-gray-700"
      >
        <ag-grid-angular
          style="width: 100%; height: 100%;"
          class="ag-theme-alpine"
          [rowData]="rowData"
          [columnDefs]="columnDefs"
        ></ag-grid-angular>
        <!-- <table class="min-w-full">
          <thead>
            <tr class="border-t border-gray-200 dark:border-gray-700">
              <th
                class="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                <span class="lg:pl-2">Project</span>
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Members
              </th>
              <th
                class="hidden md:table-cell px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-500 dark:text-gray-400  uppercase tracking-wider"
              >
                Last updated
              </th>
              <th
                class="pr-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            <tr>
              <td class="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div class="flex items-center space-x-3 lg:pl-2">
                  <div class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-blue-600" aria-hidden="true"></div>
                  <a
                    [routerLink]="'/investment/1'"
                    class="truncate hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                  >
                    <span>
                      GraphQL API
                      <span class="text-gray-500 dark:text-gray-400 font-normal">in Engineering</span>
                    </span>
                  </a>
                </div>
              </td>
              <td class="px-6 py-3 text-sm text-gray-500 font-medium">
                <div class="flex items-center space-x-2">
                  <div class="flex flex-shrink-0 -space-x-1">
                    <img
                      class="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />

                    <img
                      class="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />

                    <img
                      class="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />

                    <img
                      class="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>

                  <span class="flex-shrink-0 text-xs leading-5 font-medium">+8</span>
                </div>
              </td>
              <td class="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                March 17, 2020
              </td>
              <td class="pr-6">
                <ui-menu-button></ui-menu-button>
              </td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  `,
})
export class WebUiDashboardTable {
  @Input() columnDefs: ColDef[]

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ]
}
