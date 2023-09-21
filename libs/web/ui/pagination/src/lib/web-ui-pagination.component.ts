import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'ui-pagination',
  template: `
    <div
      class="bg-transparent px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <a
          (click)="onDecrementClick()"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          (click)="onIncrementClick()"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-200">
            Showing
            <span class="font-medium">{{ skip + 1 }}</span>
            to
            <span class="font-medium">{{ rangeToLabel }}</span>
            of
            <span class="font-medium">{{ total }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              [attr.disabled]="!hasPrevPage ? true : null"
              [attr.readonly]="!hasPrevPage ? true : null"
              (click)="onDecrementClick()"
              class="relative cursor-pointer inline-flex disabled:cursor-default disabled:opacity-75 disabled:hover:bg-transparent items-center px-3 py-2 pt-2.5 rounded-l-md border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400  "
              [class.dark:hover:bg-gray-700]="hasPrevPage"
              [class.hover:bg-gray-50]="hasPrevPage"
            >
              <span class="sr-only">Previous</span>
              <ui-la-icon [icon]="'chevron-left'" [size]="'lg'"></ui-la-icon>
            </button>
            <ng-container *ngIf="showPages">
              <ng-container  *ngFor="let page of pages">
                <a
                  (click)="onGoToPageClick(page)"
                  [ngClass]="
                  computeButtonClasses(page) +
                  ' cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  "
                  >
                  {{ page }}
                </a>
              </ng-container>
            </ng-container>
            <button
              (click)="onIncrementClick()"
              [attr.disabled]="!hasNextPage ? true : null"
              [attr.readonly]="!hasNextPage ? true : null"
              [class.dark:hover:bg-gray-700]="hasNextPage"
              [class.hover:bg-gray-50]="hasNextPage"
              class="relative cursor-pointer inline-flex disabled:cursor-default disabled:opacity-75 disabled:hover:bg-transparent  items-center px-3 py-2 pt-2.5 rounded-r-md border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 "
            >
              <span class="sr-only">Next</span>
              <ui-la-icon [icon]="'chevron-right'" [size]="'lg'"></ui-la-icon>
            </button>
          </nav>
        </div>
      </div>
    </div>
  `,
})
export class WebUiPaginationComponent {
  @Input() limit: number
  @Input() skip: number
  @Input() total: number
  @Input() showPages : boolean
  @Output() skipChange = new EventEmitter<number>()
  @Output() pageChangedEmitter = new EventEmitter<number>()
  get pages(): number[] {
    if (!this.total || !this.limit) return []
    return new Array(this.maxPageCount).fill('').map((_, index) => index + 1)
  }

  get maxPageCount() {
    return Math.ceil(this.total / this.limit)
  }

  get hasPrevPage() {
    return this.skip >= 1 && this.limit != 0
  }

  get hasNextPage() {
    return this.skip + this.limit < this.total
    //return this.skip <= this.total && this.limit != 0
  }

  get rangeToLabel() {
    return !this.hasNextPage ? this.total : (this.skip) + this.limit
  }

  onDecrementClick() {
    if (this.hasPrevPage) {
      this.skipChange.emit(this.skip - this.limit)
    }
  }

  onIncrementClick() {
    if (this.hasNextPage) {
      this.skipChange.emit(this.skip + this.limit)
    }
  }

  onGoToPageClick(page: number) {
    const pageIndex = page - 1
    this.pageChangedEmitter.emit(pageIndex)
    if (pageIndex <= this.maxPageCount) {
      this.skipChange.emit(pageIndex)
    }
  }

  computeButtonClasses(page: number) {
    const activeStyles =
      'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-500 text-blue-600 dark:text-blue-100'
    const defaultStyles =
      'bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
    return page === this.skip + 1 ? activeStyles : defaultStyles
  }
}
