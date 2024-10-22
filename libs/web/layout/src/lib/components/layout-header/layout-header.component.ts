import { User } from '@case-clinical/web/core/data-access'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'layout-header',
  template: `
    <nav class="dark:bg-gray-800 bg-white">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="">
          <div class="flex items-center justify-between h-16 px-4 sm:px-0">
            <div class="flex items-center w-full">
              <div class="flex-shrink-0">
                <a routerLink="/">
                  <img *ngIf="logo" [attr.src]="logo" [attr.loading]="'lazy'" class="h-8" alt="App Logo" />
                </a>
              </div>
              <div class="hidden md:flex justify-center w-full">
                <div class="flex items-baseline space-x-4 text-gray-500 dark:text-gray-300">
                  <ng-container *ngFor="let link of links">
                    <a
                      [routerLink]="link.route"
                      [routerLinkActive]="[
                        'text-blue-600',
                        'bg-blue-50',
                        'dark:bg-blue-900',
                        'dark:text-blue-100',
                        'dark:hover:bg-blue-800',
                        'dark:hover:text-blue-50',
                        'hover:bg-blue-50',
                        'hover:text-blue-700'
                      ]"
                      class="px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-50 cursor-pointer"
                      >{{ link.label }}</a
                    >
                  </ng-container>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <a
                  *ngIf="notificationsLink"
                  [routerLink]="notificationsLink"
                  class="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span class="sr-only">View notifications</span>
                  <!-- Heroicon name: bell -->
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </a>

                <!-- Profile dropdown -->
                <div class="ml-3 relative">
                  <div>
                    <button
                      (click)="showProfileLinks = !showProfileLinks"
                      class="w-8 bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span class="sr-only">Open user menu</span>
                      <img *ngIf="user?.avatarUrl" class="h-8 w-8 rounded-full" [src]="user?.avatarUrl" alt="" />
                    </button>
                  </div>
                  <!--
                    Profile dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  -->
                  <div
                    class="origin-top-right z-40 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 dark:text-gray-300 ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                    [class.block]="showProfileLinks"
                    [class.hidden]="!showProfileLinks"
                  >
                    <ng-container *ngFor="let link of profileLinks">
                      <a
                        [routerLink]="link.route"
                        (click)="showProfileLinks = false"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem"
                      >
                        {{ link.label }}
                      </a>
                    </ng-container>
                  </div>
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button
                (click)="showMobileMenu = !showMobileMenu"
                class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">Open main menu</span>
                <!--
                  Heroicon name: menu

                  Menu open: "hidden", Menu closed: "block"
                -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  [class]="{ block: !showMobileMenu, hidden: showMobileMenu }"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <!--
                  Heroicon name: x

                  Menu open: "block", Menu closed: "hidden"
                -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  [class]="{ block: showMobileMenu, hidden: !showMobileMenu }"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--
        Mobile menu, toggle classes based on menu state.

        Open: "block", closed: "hidden"
      -->
      <div class="hidden  md:hidden" [class.block]="showMobileMenu" [class.hidden]="!showMobileMenu">
        <div class="px-2 py-3 space-y-1 sm:px-3  text-gray-300">
          <ng-container *ngFor="let link of links">
            <a
              [routerLink]="link.route"
              routerLinkActive=" rounded-md text-white bg-gray-900"
              (click)="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700"
            >
              {{ link.label }}
            </a>
          </ng-container>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" [src]="user?.avatarUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white" *ngIf="user?.username">
                {{ user?.username }}
              </div>
            </div>
            <a
              *ngIf="notificationsLink"
              [routerLink]="notificationsLink"
              class="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: bell -->
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </a>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <ng-container *ngFor="let link of profileLinks">
              <a
                [routerLink]="link.route"
                (click)="showMobileMenu = false; showProfileLinks = false"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                role="menuitem"
              >
                {{ link.label }}
              </a>
            </ng-container>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class LayoutHeaderComponent {
  showProfileLinks = false
  showMobileMenu = false
  @Input() notificationsLink?: string
  @Input() user?: User
  @Input() links: { label: string; route: string }[] = []
  @Input() profileLinks: { label: string; route: string }[] = []
  @Input() logo: string
}
