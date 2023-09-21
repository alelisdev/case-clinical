import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

export enum Variant {
  Default = 'default',
  White = 'white',
  Danger = 'danger',
}

@Component({
  selector: 'ui-button',
  template: `
    <button (click)="handleClick($event)" [class]="classes" [disabled]="disabled" [type]="type">
      <svg
        *ngIf="showCreateIcon"
        xmlns="http://www.w3.org/2000/svg"
        class="-ml-0.5 mr-2 h-4 w-4 bg-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>

      <svg
        *ngIf="showLeftArrowIcon"
        xmlns="http://www.w3.org/2000/svg"
        class="-ml-0.5 mr-2 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ label }}
    </button>
  `,
})
export class WebUiButtonComponent {
  @Input() link?: string
  @Input() disabled?: boolean
  @Input() variant?: Variant
  @Input() showCreateIcon?: boolean
  @Input() showLeftArrowIcon?: boolean
  @Input() label: string
  @Input() type = 'button'
  @Input() fill?: boolean
  @Output() handler = new EventEmitter<string>()

  constructor(private router: Router, private route: ActivatedRoute) {}

  get classes(): string {
    let className = "";
    switch (this.variant) {
      case Variant.Danger:
        className = 'inline-flex items-center shadow px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
        break;
      case Variant.White:
        className = `inline-flex items-center px-4 py-2 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:text-gray-100 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
        break;
      default:
      case Variant.Default:
        className = 'inline-flex items-center shadow px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        break;
    }
    if(this.fill) {
      className = `${className} w-full`;
    }
    return className;
  }

  handleClick(event) {
    if (this.link) {
      this.router.navigate([this.link], { relativeTo: this.route })
    } else {
      this.handler.emit(event)
    }
  }
}
