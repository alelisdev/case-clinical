import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'

export interface MenuItem {
  label?: string
  id: string
  icon: string
}

export interface IDropDownItem {
  id: string
  name: string
  icons: string
}

@Component({
  selector: 'ui-dropdown',
  template: `
    <div class="relative inline-block text-left">
      <div *ngIf="enableMinimalMenuIcon">
        <button
          type="button"
          class="rounded-full dark:hover:bg-gray-700 transition duration-100 ease-linear display-flex items-center justify-center p-2 flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          [class.bg-transparent]="menuButton"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span class="sr-only">Open options</span>
          <div class="h-5 w-5">
            <ui-icon class="h-5 w-5 dark:text-gray-300" icon="dotsVertical"></ui-icon>
          </div>
        </button>
      </div>

      <div *ngIf="!enableMinimalMenuIcon">
        <button
          *ngIf="!icon"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          (click)="closeMenu()"
        >
          {{ label }}
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          type="button"
          *ngIf="icon"
          class="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          (click)="closeMenu()"
        >
          <span class="sr-only">Open options</span>
          <ui-icon [icon]="icon"></ui-icon>
        </button>
      </div>

      <div
        class="origin-top-{{ direction }} absolute {{
          direction
        }}-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        *ngIf="show"
      >
        <div class="py-1" role="none">
          <div class="px-4 py-3" role="none" *ngIf="heading">
            <p class="text-sm" role="none">{{ to.heading }}</p>
          </div>
          <a
            *ngFor="let item of items"
            href="#"
            [ngClass]="item.icons ? 'group flex' : 'block'"
            class="items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 "
            role="menuitem"
            (click)="this.onSelect(item)"
          >
            <ui-icon
              *ngIf="item.icons"
              [icon]="item.icons"
              class="mr-3 h-7 w-7 text-gray-400 group-hover:text-gray-500"
            ></ui-icon>
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
  `,
})
export class WebUiDropdownComponent implements OnInit {
  @Input() direction?: string
  @Input() enableMinimalMenuIcon?: boolean
  @Input() icon?: string
  @Input() heading?: string
  @Input() label?: string
  @Input() items: MenuItem[]

  @Output() onSelect = new EventEmitter()

  public show: boolean = false

  ngOnInit() {
    if (!this.direction) {
      this.direction = 'left'
    }
  }

  closeMenu() {
    this.show = !this.show
  }
}
