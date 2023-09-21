import { Component, ViewEncapsulation } from '@angular/core'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { map } from 'rxjs/operators'

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./web-dashboard.feature.scss'],
  template: `
    <ui-page
      headerTitle="Hey, Micheal Buller"
      title="Case Manager"
      firmName="The Bennett Law Firm, P.A., New Hampshire"
      [advertisementBanners]="brands"
    >
      <main class="pb-8 dashboard-page">
        <div class="max-w-3xl mx-auto lg:max-w-7xl">
          <h1 class="sr-only">Profile</h1>
          <!-- Main 3 column grid -->
          <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            <!-- Left column -->
            <div class="grid grid-cols-1 gap-4 lg:col-span-2">
              <ng-container *ngIf="me$ | async as user">
                <!-- Welcome panel -->
                <section aria-labelledby="profile-overview-title">
                  <div class="rounded-lg bg-white overflow-hidden shadow">
                    <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
                    <div class="bg-white p-5">
                      <div class="sm:flex sm:items-center sm:justify-between mb-4">
                        <div class="sm:flex sm:space-x-5">
                          <div class="text-center sm:text-left">
                            <p class="text-2xl font-bold ">Featured Providers</p>
                          </div>
                        </div>
                      </div>
                      <ui-carousel-pro
                        [carouselType]="'avatar'"
                        [images]="images"
                        [imagesForSlider]="imagesForSlider"
                      ></ui-carousel-pro>
                    </div>
                  </div>
                </section>
              </ng-container>

              <h2 class="text-2xl font-bold py-2">Task List</h2>
              <!-- This example requires Tailwind CSS v2.0+ -->
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Role
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                              <span class="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- Odd row -->
                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Cooper</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Regional Paradigm Technician
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.cooper@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <!-- Even row -->
                          <tr class="bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cody Fisher</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Product Directives Officer
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">cody.fisher@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Owner</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Cooper</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Regional Paradigm Technician
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.cooper@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <!-- Even row -->
                          <tr class="bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cody Fisher</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Product Directives Officer
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">cody.fisher@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Owner</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Cooper</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Regional Paradigm Technician
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.cooper@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <!-- More people... -->
                        </tbody>
                      </table>
                      <!-- This example requires Tailwind CSS v2.0+ -->
                      <div
                        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                      >
                        <div class="flex-1 flex justify-between sm:hidden">
                          <a
                            href="#"
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Previous
                          </a>
                          <a
                            href="#"
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p class="text-sm text-gray-700">
                              Showing
                              <span class="font-medium">1</span>
                              to
                              <span class="font-medium">10</span>
                              of
                              <span class="font-medium">97</span>
                              results
                            </p>
                          </div>
                          <div>
                            <nav
                              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                              aria-label="Pagination"
                            >
                              <a
                                href="#"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                                <span class="sr-only">Previous</span>
                                <!-- Heroicon name: solid/chevron-left -->
                                <svg
                                  class="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </a>
                              <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                              <a
                                href="#"
                                aria-current="page"
                                class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                1
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                2
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                              >
                                3
                              </a>
                              <span
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                              >
                                ...
                              </span>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                              >
                                8
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                9
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                10
                              </a>
                              <a
                                href="#"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                                <span class="sr-only">Next</span>
                                <!-- Heroicon name: solid/chevron-right -->
                                <svg
                                  class="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </a>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 class="text-2xl font-bold py-2">Recent Cases</h2>
              <!-- This example requires Tailwind CSS v2.0+ -->
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Client Name
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date of Loss
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Accident Type
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Case Phase
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                              <span class="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- Odd row -->
                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Cooper</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Regional Paradigm Technician
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.cooper@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <!-- Even row -->
                          <tr class="bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cody Fisher</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Product Directives Officer
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">cody.fisher@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Owner</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Cooper</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Regional Paradigm Technician
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.cooper@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <!-- Even row -->
                          <tr class="bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cody Fisher</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Product Directives Officer
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">cody.fisher@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Owner</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Cooper</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Regional Paradigm Technician
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane.cooper@example.com</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            </td>
                          </tr>

                          <!-- More people... -->
                        </tbody>
                      </table>
                      <!-- This example requires Tailwind CSS v2.0+ -->
                      <div
                        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                      >
                        <div class="flex-1 flex justify-between sm:hidden">
                          <a
                            href="#"
                            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Previous
                          </a>
                          <a
                            href="#"
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p class="text-sm text-gray-700">
                              Showing
                              <span class="font-medium">1</span>
                              to
                              <span class="font-medium">10</span>
                              of
                              <span class="font-medium">97</span>
                              results
                            </p>
                          </div>
                          <div>
                            <nav
                              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                              aria-label="Pagination"
                            >
                              <a
                                href="#"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                                <span class="sr-only">Previous</span>
                                <!-- Heroicon name: solid/chevron-left -->
                                <svg
                                  class="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </a>
                              <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                              <a
                                href="#"
                                aria-current="page"
                                class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                1
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                2
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                              >
                                3
                              </a>
                              <span
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                              >
                                ...
                              </span>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                              >
                                8
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                9
                              </a>
                              <a
                                href="#"
                                class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              >
                                10
                              </a>
                              <a
                                href="#"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                                <span class="sr-only">Next</span>
                                <!-- Heroicon name: solid/chevron-right -->
                                <svg
                                  class="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </a>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Actions panel -->
            </div>

            <!-- Right column -->
            <div class="grid grid-cols-1 gap-4">
              <section aria-labelledby="weather-widget">
                <ui-weather-widget></ui-weather-widget>
              </section>
              <!-- Announcements -->
              <section aria-labelledby="mini-calender">
                <div class="mashed-background rounded-lg text-white overflow-hidden shadow">
                  <div class="px-3 py-1">
                    <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700">
                      <div class="flex flex-wrap overflow-hidden">
                        <div class="w-full rounded shadow-sm">
                          <div class="flex items-center justify-between mb-4">
                            <div class="text-left font-bold text-xl text-black dark:text-white">Dec 2021</div>
                            <div class="flex space-x-4">
                              <button class="p-2 rounded-full bg-blue-500 text-white">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                  <path
                                    fill="currentColor"
                                    d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
                                  ></path>
                                </svg>
                              </button>
                              <button class="p-2 rounded-full bg-blue-500 text-white">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                  <path
                                    fill="currentColor"
                                    d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div class="-mx-2">
                            <table class="w-full text-black dark:text-white">
                              <tr>
                                <th class="py-2 px-2  ">S</th>
                                <th class="py-2 px-2  ">M</th>
                                <th class="py-2 px-2  ">T</th>
                                <th class="py-2 px-2  ">W</th>
                                <th class="py-2 px-2  ">T</th>
                                <th class="py-2 px-2  ">F</th>
                                <th class="py-2 px-2  ">S</th>
                              </tr>
                              <tr class="text-gray-400 dark:text-gray-500">
                                <td class="py-2 px-2   text-center text-gray-500 dark:text-gray-500">25</td>
                                <td class="py-2 px-2   text-center text-gray-500 dark:text-gray-500">26</td>
                                <td class="py-2 px-2   text-center text-gray-500 dark:text-gray-500">27</td>
                                <td class="py-2 px-2   text-center text-gray-500 dark:text-gray-500">28</td>
                                <td class="py-2 px-2   text-center text-gray-500 dark:text-gray-500">29</td>
                                <td class="py-2 px-2   text-center text-gray-500 dark:text-gray-500">30</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center text-gray-800 cursor-pointer">
                                  1
                                </td>
                              </tr>
                              <tr class="text-gray-500">
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">2</td>
                                <td class="py-2 relative px-1  hover:text-blue-500 text-center cursor-pointer">
                                  3
                                  <span
                                    class="absolute rounded-full h-2 w-2 bg-blue-500 bottom-0 left-1/2 transform -translate-x-1/2"
                                  >
                                  </span>
                                </td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">4</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">5</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">6</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">7</td>
                                <td class="py-2 px-2  relative lg:px-3 hover:text-blue-500 text-center cursor-pointer">
                                  8
                                  <span
                                    class="absolute rounded-full h-2 w-2 bg-yellow-500 bottom-0 left-1/2 transform -translate-x-1/2"
                                  >
                                  </span>
                                </td>
                              </tr>
                              <tr class="text-gray-500">
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">9</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">10</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">11</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">12</td>
                                <td class="py-2 px-2   text-center text-white cursor-pointer">
                                  <span class="p-2 rounded-full bg-blue-500"> 13 </span>
                                </td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">14</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">15</td>
                              </tr>
                              <tr class="text-gray-500">
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">16</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">17</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">18</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">19</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">20</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">21</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">22</td>
                              </tr>
                              <tr class="text-gray-500">
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">23</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">24</td>
                                <td class="py-2 px-2   hover:text-blue-500 relative text-center cursor-pointer">
                                  25
                                  <span
                                    class="absolute rounded-full h-2 w-2 bg-red-500 bottom-0 left-1/2 transform -translate-x-1/2"
                                  >
                                  </span>
                                </td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">26</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">27</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">28</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">29</td>
                              </tr>
                              <tr class="text-gray-500">
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">30</td>
                                <td class="py-2 px-2   hover:text-blue-500 text-center cursor-pointer">31</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="w-full float-left overflow-hidden">
                    <div class="dashboard-content">
                      <div class="content">
                        <div class="box">
                          <div class="percent job">
                            <svg>
                              <circle cx="45" cy="45" r="45"></circle>
                              <circle cx="45" cy="45" r="45"></circle>
                              <circle cx="45" cy="45" r="45"></circle>
                            </svg>
                            <div class="number">
                              <h2>12</h2>
                            </div>
                          </div>
                          <h2 class="text">
                            Client <br />
                            Events
                          </h2>
                        </div>
                        <div class="box">
                          <div class="percent finance">
                            <svg>
                              <circle cx="45" cy="45" r="45"></circle>
                              <circle cx="45" cy="45" r="45"></circle>
                              <circle cx="45" cy="45" r="45"></circle>
                            </svg>
                            <div class="number">
                              <h2>2</h2>
                            </div>
                          </div>
                          <h2 class="text">Key Dates Approaching</h2>
                        </div>
                        <div class="box">
                          <div class="percent skill">
                            <svg>
                              <circle cx="45" cy="45" r="45"></circle>
                              <circle cx="45" cy="45" r="45"></circle>
                              <circle cx="45" cy="45" r="45"></circle>
                            </svg>
                            <div class="number">
                              <h2>15</h2>
                            </div>
                          </div>
                          <h2 class="text">
                            Pending <br />
                            Tasks
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section aria-labelledby="music-widget">
                <ui-music-widget [audioList]="audioList"></ui-music-widget>
              </section>

              <section aria-labelledby="content-widget">
                <div class="p-5 pt-0 rounded-md bg-white border-b border-gray-200 overflow-hidden shadow">
                  <div class="mb-5 lg:flex">
                    <div class="w-1/5 mt-5">
                      <img class="w-15 h-15" src="assets/images/LOim.png" />
                      <p class="ml-2 text-base text-black font-semibold">Aries</p>
                    </div>
                    <div class="mt-2 text-center w-4/5 pr-0">
                      <h3 class="text-xl font-bold text-black ">General Horoscope</h3>
                      <p class="text-xs text-gray-500 leading-5 mt-3  ">
                        someone eles's beliefs and advice may seem dubious to you, but you should help in mind that
                        those doodle wish you well
                      </p>
                    </div>
                  </div>
                  <div class="mb-0 lg:flex">
                    <div class="w-1/5 mt-5"></div>
                    <div class="w-4/5">
                      <a
                        style="color: #7b91f7; border-color:#f2f2f2;"
                        href="#"
                        class="mr-2 px-6 py-2 font-semibold text-white border-2 rounded-md text-sm"
                        >92% Love</a
                      >
                      <a
                        style="color: #ffb394; border-color:#f2f2f2;"
                        href="#"
                        class="px-6 py-2 font-semibold text-white border-2 rounded-md text-sm"
                        >56% health</a
                      >
                    </div>
                  </div>
                </div>
              </section>
              <section aria-labelledby="quick-links-title" *ngIf="false">
                <div
                  class="rounded-lg  bg-gray-200 border-b border-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px"
                >
                  <h2 class="sr-only" id="quick-links-title">Quick links</h2>
                  <div
                    class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                  >
                    <div class="flex justify-between">
                      <div
                        (click)="openTab('music')"
                        [ngClass]="activeTabClass('music')"
                        class="cursor-pointer rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white"
                      >
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
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          />
                        </svg>
                      </div>
                      <span
                        (click)="openTab('par')"
                        [ngClass]="activeTabClass('par')"
                        class="cursor-pointer rounded-lg inline-flex p-3 ring-4 ring-white"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path></svg
                      ></span>
                      <span
                        (click)="openTab('task')"
                        [ngClass]="activeTabClass('task')"
                        class="cursor-pointer rounded-lg inline-flex p-3 ring-4 ring-white"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          ></path></svg
                      ></span>
                      <span
                        (click)="openTab('funding')"
                        [ngClass]="activeTabClass('funding')"
                        class="cursor-pointer rounded-lg inline-flex p-3 ring-4 ring-white"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path></svg
                      ></span>
                      <span
                        (click)="openTab('expense')"
                        [ngClass]="activeTabClass('expense')"
                        class="cursor-pointer rounded-lg inline-flex p-3 text-rose-700 ring-4 ring-white"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                          ></path></svg
                      ></span>
                      <span
                        (click)="openTab('training')"
                        [ngClass]="activeTabClass('training')"
                        class="cursor-pointer rounded-lg inline-flex p-3 ring-4 ring-white"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="h-6 w-6"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                          <path
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          ></path></svg
                      ></span>
                    </div>
                  </div>

                  <ng-container *ngFor="let tab of tabs">
                    <ng-container *ngIf="tab.active">
                      <div
                        class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                      >
                        <div class="">
                          <h3 class="text-lg font-medium">
                            <a href="#" class="focus:outline-none">
                              <!-- Extend touch target to entire panel -->
                              <span class="absolute inset-0" aria-hidden="true"></span>
                              {{ tab.title }}
                            </a>
                          </h3>
                          <p class="mt-2 text-sm text-gray-500">
                            {{ tab.content }}
                          </p>
                        </div>
                        <span
                          class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                          aria-hidden="true"
                        >
                        </span>
                      </div>
                    </ng-container>
                  </ng-container>
                </div>
              </section>
            </div>
          </div>
          <section aria-labelledby="quick-links-title">
            <div
              class="rounded-lg mt-8 bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid md:grid-cols-3  sm:grid-cols-2 sm:gap-px"
            >
              <h2 class="sr-only" id="quick-links-title">Quick links</h2>

              <div
                class=" rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-rose-50 text-rose-700 ring-4 ring-white">
                    <!-- Heroicon name: outline/receipt-refund -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="mt-6">
                  <h3 class="text-lg font-medium">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true"></span>
                      Submit an expense
                    </a>
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Track your case expenditures. Any out of pocket expenses that you require reimbursement for must be
                    tracked to a case.
                  </p>
                </div>
                <span
                  class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                    />
                  </svg>
                </span>
              </div>
              <div
                class=" rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                    <!-- Heroicon name: outline/academic-cap -->

                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="mt-6">
                  <h3 class="text-lg font-medium">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true"></span>
                      Task List
                    </a>
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Click here for quick access to the tasks currently assigned to you or your team.
                  </p>
                </div>
                <span
                  class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                    />
                  </svg>
                </span>
              </div>

              <div
                class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                    <!-- Heroicon name: outline/clock -->
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
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                  <h3 class="text-lg font-medium">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true"></span>
                      Listen to Your Favorite Music
                    </a>
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Sign in to Apple music or Spotify on your profile to access your favorite music.
                  </p>
                </div>
                <span
                  class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                    />
                  </svg>
                </span>
              </div>
              <div
                class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                    <!-- Heroicon name: outline/badge-check -->
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                  <h3 class="text-lg font-medium">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true"></span>
                      Prior Authorization Request
                    </a>
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Have a Rx or orders for your client in hand? Submit them here to PCH to quickly retrieve an
                    Authorization number.
                  </p>
                </div>
                <span
                  class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                    />
                  </svg>
                </span>
              </div>
              <div
                class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                    <!-- Heroicon name: outline/badge-check -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                  <h3 class="text-lg font-medium">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true"></span>
                      Training
                    </a>
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Case Clinical Underwriting E-Learning, click here to access content on how to use the system. You will also find
                    a great course library on specific procedures and what they entail.
                  </p>
                </div>
                <span
                  class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                    />
                  </svg>
                </span>
              </div>
              <div
                class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
              >
                <div>
                  <span class="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                    <!-- Heroicon name: outline/cash -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                  <h3 class="text-lg font-medium">
                    <a href="#" class="focus:outline-none">
                      <!-- Extend touch target to entire panel -->
                      <span class="absolute inset-0" aria-hidden="true"></span>
                      Apply for Funding
                    </a>
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    Have a STAT surgery? If you don't have time to submit your case for PCH Underwriting and need
                    funding, click here for quick access.
                  </p>
                </div>
                <span
                  class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ui-page>
  `,
})
export class WebDashboardFeatureComponent {
  breadcrumbs = [{ name: 'Dashboard', path: '/dashboard' }]
  me$ = this.data.me().pipe(map((res) => res.data.me))
  public delay?: any = 2000
  constructor(private readonly data: WebCoreDataAccessService) {}

  brands = [
    {
      path: '/assets/images/advertisement.png',
      name: 'advertisement',
    },
    {
      path: '/assets/images/advertisement.png',
      name: 'advertisement',
    },
    {
      path: '/assets/images/advertisement.png',
      name: 'advertisement',
    },
  ]

  images = [
    {
      path: '/assets/doctors/ortho/dr.atoian,orthopedic-surgeon,pasadena.png',
      name: 'Dr. Atoian', //Pasadena,
      location: 'Pasadena',
      title: 'Orthopedic Surgeon',
    },
    {
      path: '/assets/doctors/ortho/dr.kim,ortho-extremity,san-diego.png',
      name: 'Dr. Kim', //San Diego
      location: 'San Diego',
      title: 'Ortho Extremity',
    },
    {
      path: '/assets/doctors/ortho/dr.eldringhoff,ortho-extremity,west-covina,los-anglese.png',
      name: 'Dr. Eldringhoff', //West Covina, Los Anglese
      location: 'Los Anglese',
      title: 'Ortho Extremity',
    },
    {
      path: '/assets/doctors/ortho/dr.bergen,ortho-extremity,la-jolla.png',
      name: 'Dr. Bergen', //La Jolla,
      location: 'La Jolla',
      title: 'Ortho Extremity',
    },
    {
      path: '/assets/doctors/ortho/dr.samimi,ortho-extremity,west-covina.png',
      name: 'Dr. Samimi', //West Covina
      location: 'West Covina',
      title: 'Ortho Extremity',
    },
    {
      path: '/assets/doctors/pain/dr.alves,pain-management,palmdale.png',
      name: 'Dr. Alves', //Palmdale
      location: 'Palmdale',
      title: ' Pain Management',
    },
  ]

  imagesForSlider = [
    { path: '/assets/carousels/photo-1444065707204-12decac917e8.jfif' },
    { path: '/assets/carousels/photo-1445452916036-9022dfd33aa8.jfif' },
    { path: '/assets/carousels/photo-1443996104801-80c82e789b18.jfif' },
    { path: '/assets/carousels/photo-1505839673365-e3971f8d9184.jfif' },
    { path: '/assets/carousels/photo-1545420333-23a22b18b8fa.jfif' },
  ]

  public audioList: Audiolist[] = [
    {
      url: 'https://dl.dropboxusercontent.com/s/w99exjxnwoqwz0e/Cartoon-on-on-feat-daniel-levi-ncs-release.mp3?dl=0',
      title: 'Sample 1',
    },
    {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      title: 'Sample 2',
      cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg',
    },
    {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
      title: 'Sample 3',
      cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg',
    },
  ]

  tabs = [
    {
      id: 'music',
      active: true,
      color: 'text-white',
      background: 'bg-blue-700',
      title: 'Listen to Your Favorite Music',
      content: 'Sign in to Apple music or Spotify on your profile to access your favorite music.',
    },
    {
      id: 'par',
      active: false,
      color: 'text-white',
      background: 'bg-green-700',
      title: 'Prior Authorization Request',
      content:
        'Have a Rx or orders for your client in hand? Submit them here to PCH to quickly retrieve an Authorization number.',
    },
    {
      id: 'task',
      active: false,
      color: 'text-white',
      background: 'bg-blue-700',
      title: 'Task List',
      content: 'Click here for quick access to the tasks currently assigned to you or your team.',
    },
    {
      id: 'funding',
      active: false,
      color: 'text-white',
      background: 'bg-yellow-700',
      title: 'Apply for Funding',
      content:
        "Have a STAT surgery? If you don't have time to submit your case for PCH Underwriting and need funding, click here for quick access.",
    },
    {
      id: 'expense',
      active: false,
      color: 'text-white',
      background: 'bg-blue-700',
      title: 'Submit an expense',
      content:
        'Track your case expenditures. Any out of pocket expenses that you require reimbursement for must be tracked to a case.',
    },
    {
      id: 'training',
      active: false,
      color: 'text-white',
      background: 'bg-indigo-700',
      title: 'Training',
      content:
        'Case Clinical Underwriting E-Learning, click here to access content on how to use the system. You will also find a great course library on specific procedures and what they entail.',
    },
  ]

  openTab(id: string) {
    const tabIndex = this.tabs.findIndex((t) => t.id == id)
    if (tabIndex !== -1) {
      this.tabs = this.tabs.map((tab) => {
        tab.active = false
        return tab
      })
      this.tabs[tabIndex].active = true
    }
  }

  activeTabClass(id: string) {
    const tabIndex = this.tabs.findIndex((t) => t.id == id)
    if (tabIndex !== -1) {
      if (this.tabs[tabIndex].active) {
        return this.tabs[tabIndex].color + ' ' + this.tabs[tabIndex].background
      }
    }
    return ''
  }
}

type Audiolist = {
  url: string
  title?: string
  cover?: string
}
