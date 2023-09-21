import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core'

@Component({
  selector: 'ui-modal',
  template: `
    <div *ngIf="show" class="dark:bg-gray-800 border dark:border-indigo-700 px-6 py-4 mb-3 md:mb-6 rounded-lg shadow">
      <div>
        <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div
              class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-6"
              [ngClass]="width ? 'sm:max-w-' + width : 'sm:max-w-sm'"
            >
              <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4" *ngIf="closeButton">
                <button
                  type="button"
                  (click)="closeModal()"
                  class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ng-content></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class WebUiModalComponent {
  @Input() closeButton?: boolean = true
  @Input() show?: boolean
  @Input() width?: string

  @Output() showChange = new EventEmitter<boolean>()

  closeModal() {
    this.showChange.emit(false)
    this.show = false
  }
}
