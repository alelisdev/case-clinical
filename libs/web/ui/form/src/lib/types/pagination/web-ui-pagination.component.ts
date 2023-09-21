import { Component, OnDestroy} from '@angular/core'
import { UiFormBaseField } from '../base-field-type'
import { OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'ui-pagination',
  template: `
    <mat-paginator
      [length]="total"
      [pageSize]="limit"
      (page)="pageChanged($event)"
      aria-label="Select page"
    >
    </mat-paginator>
  `,
})
export class WebUiPaginationComponent extends UiFormBaseField implements OnInit, OnDestroy {
  limit: number
  skip: number
  total: number
  pageIndex: number

  subscriber

  ngOnInit(): void {
    super.ngOnInit()

    const useDataKey = this.to.useKey
    if (useDataKey === 0) {
      const dataKey = this.to.paginationKey
      const source = this.formService.getValueForKey(dataKey, this.formState);
      if (source instanceof Observable) {

        this.subscriber = source.subscribe((paging) => {

          const { limit, skip, total } = paging;
          this.limit = limit ?? 10
          this.skip = skip ?? 0
          this.total = total ?? 0

          this.pageIndex = Math.ceil(this.skip / this.limit) + 1;

          this.cd.detectChanges();

        })
      }
    } else {
      this.limit = this.to.limit
      this.skip = this.to.skip
      this.total = this.to.total
      this.pageIndex = Math.ceil(this.skip / this.limit) + 1;
    }
  }

  pageChanged(event: PageEvent) {
    if(this.to.skipChange && this.to.skipChange) this.to.skipChange(event.pageIndex * this.limit);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
    this.subscriber?.unsubscribe()
  }
}
