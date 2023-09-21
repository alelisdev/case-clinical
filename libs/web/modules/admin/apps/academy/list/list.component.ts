import { AcademyStore } from './../academy.store';
import { DialogService } from '@ngneat/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core'
import { MatSelectChange } from '@angular/material/select'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import { AcademyService } from '../academy.service'
import { Course } from '@case-clinical/web/core/data-access'

@Component({
  selector: 'academy-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyListComponent implements OnInit {
  readonly vm$ = this.store.vm$

  /**
   * Constructor
   */
  constructor(
    public _academyService: AcademyService,
    public dialog: DialogService,
    private store: AcademyStore,
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    console.log(localStorage.getItem('accessToken'))
    this.store.loadCategoriesEffect()
    this.store.loadCoursesEffect()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter by search query
   *
   * @param query
   */
  filterByQuery(query: string): void {
    this.store.setSearchQuery(query)
  }

  /**
   * Filter by category
   *
   * @param change
   */
  filterByCategory(change: MatSelectChange): void {
    this.store.setCategorySlug(change.value)
  }

  /**
   * Show/hide completed courses
   *
   * @param change
   */
  toggleCompleted(change: MatSlideToggleChange): void {
    this.store.setHideCompleted(change.checked)
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      course
    }: { course ?: Course },
  ) {
    this.dialog.open(tpl, { data: { course }, closeButton: false })
  }

}
