import { MarkdownService } from 'ngx-markdown';
import { AcademyStore } from './../academy.store';
import { ActivatedRoute } from '@angular/router';
import { AcademyCategory, Step } from '@case-clinical/web/core/data-access'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { MatTabGroup } from '@angular/material/tabs'
import { Subject, takeUntil } from 'rxjs'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { Course } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'academy-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup
  course: Course
  currentStep: number = -1
  drawerMode: 'over' | 'side' = 'side'
  drawerOpened: boolean = true
  private _unsubscribeAll: Subject<any> = new Subject<any>()

  /**
   * Constructor
   */
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private route: ActivatedRoute,
    private store: AcademyStore,
    public dialog: DialogService,
    public markdownService: MarkdownService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store.loadCourseByIdEffect(params.get("id"))
    })

    // Get the course
    this.store.course$.pipe(takeUntil(this._unsubscribeAll)).subscribe((course: Course) => {
      if(course) {
        console.log(course)
        if(!course.progress) {
          this.store.crateCoureProgressEffect({courseId: course.id})
          return;
        }

        // Get the course
        this.course = course

        if(this.course.steps?.length <= 0) {
          return;
        }
        // Go to step
        this.currentStep = course.progress?.currentStep || 0;
        this.goToCurrentStep()

        // Mark for check
        this._changeDetectorRef.markForCheck()
      }
    })

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side'
          this.drawerOpened = true
        } else {
          this.drawerMode = 'over'
          this.drawerOpened = false
        }

        // Mark for check
        this._changeDetectorRef.markForCheck()
      })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    if(this.course) {
      const totalSteps = this.course.totalSteps || 0
      const currentStep = this.currentStep || 0
      if((totalSteps === currentStep + 1) && totalSteps > 0) {
        this.store.updateCourseProgressEffect({courseProgressId: this.course.progress.courseProgressId, currentStep: currentStep+1})
      }
    }
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Go to given step
   *
   * @param step
   */
  goToCurrentStep(): void {
    // Go to the step
    this.courseSteps.selectedIndex = this.currentStep
    // this._scrollCurrentStepElementIntoView()
    // Mark for check
    this._changeDetectorRef.markForCheck()
  }

  get getCurrentStep() {
    if(this.currentStep >= 0) {
      if(this.course) {
        const step = this.course.steps?.find((step) => (step.order) === this.currentStep)
        return step;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Go to previous step
   */
  goToPreviousStep(): void {
    // Return if we already on the first step
    if (this.currentStep === 0) {
      return
    }

    // Set the current step
    this.currentStep = this.currentStep - 1
    this.store.updateCourseProgressEffect({ courseProgressId: this.course.progress.courseProgressId, currentStep: this.currentStep })
  }

  /**
   * Go to next step
   */
  goToNextStep(): void {
    // Return if we already on the last step
    if (this.currentStep === this.course.totalSteps - 1) {
      return
    }
    this.currentStep = this.currentStep + 1
    this.store.updateCourseProgressEffect({ courseProgressId: this.course.progress.courseProgressId, currentStep: this.currentStep })
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.order || index
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Scrolls the current step element from
   * sidenav into the view. This only happens when
   * previous/next buttons pressed as we don't want
   * to change the scroll position of the sidebar
   * when the user actually clicks around the sidebar.
   *
   * @private
   */
  private _scrollCurrentStepElementIntoView(): void {
    // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
    setTimeout(() => {
      // Get the current step element and scroll it into view
      const currentStepElement = this._document.getElementsByClassName('current-step')[0]
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  }

  drop($event) {
    console.log($event)
    if($event.previousIndex != $event.currentIndex) {
      this.store.updateStepOrderEffect({ courseId: this.course.id, stepId: $event.item.data.id, order: $event.currentIndex})
    }
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      step
    }: { step ?: Step },
  ) {
    this.dialog.open(tpl, { data: { step }, width: '80%', closeButton: false})
  }
}
