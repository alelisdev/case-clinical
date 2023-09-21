import { tap, withLatestFrom } from 'rxjs/operators'
import { switchMap } from 'rxjs'
import { EventEmitter, Injectable } from '@angular/core'
import { AcademyService } from './academy.service'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { FormService } from '@case-clinical/web/ui/form'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import {
  AcademyCategory,
  Course,
  UserCreateStepInput,
  UserUpdateStepInput,
  UserUpdateCourseInput,
  UserCreateCourseInput,
  UserCreateAcademyCategoryInput,
  UserUpdateAcademyCategoryInput,
} from '@case-clinical/web/core/data-access'

export interface AcademyState {
  categories?: AcademyCategory[]
  courses?: Course[]
  course?: Course
  categorySlug?: string
  searchQuery?: string
  hideCompleted?: boolean
}

@Injectable({ providedIn: 'root' })
export class AcademyStore extends ComponentStore<AcademyState> {
  constructor(
    private academyService: AcademyService,
    private formService: FormService,
    private toast: WebUiToastService,
  ) {
    super({
      categories: [],
      courses: [],
      course: null,
      categorySlug: 'all',
      searchQuery: '',
      hideCompleted: false,
    })
  }

  readonly categories$ = this.select((s) => s.categories)
  readonly courses$ = this.select((s) => {
    let filteredCoures = Object.assign(s.courses)
    if (s.categorySlug !== 'all') {
      filteredCoures = filteredCoures.filter((course) => course.category.slug === s.categorySlug)
    }
    if (s.searchQuery !== '') {
      filteredCoures = filteredCoures.filter(
        (course) =>
          course.title.toLowerCase().includes(s.searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(s.searchQuery.toLowerCase()) ||
          course.category.title.toLowerCase().includes(s.searchQuery.toLowerCase()),
      )
    }
    // Filter by completed
    if (s.hideCompleted) {
      filteredCoures = filteredCoures.filter((course) => (course.progress?.completed || 0) === 0)
    }
    return filteredCoures
  })
  readonly course$ = this.select((s) => {
    if(s.course?.steps?.length) {
      s.course.steps = s.course.steps.sort((a, b) => a.order - b.order)
    }
    return s.course;
  })

  readonly vm$ = this.select(this.categories$, this.courses$, this.course$, (categories, courses, course) => ({
    categories,
    courses,
    course,
  }))

  addNewCategory = this.updater((state, category: AcademyCategory) => ({ ...state, categories: [ ...state.categories, category ] }))

  updateCategory = this.updater((state, data: any) => {
    const index = state.categories.findIndex((category) => category.id === data.categoryId)
    if (index != -1) {
      state.categories[index] = data.updated
    }
    return {
      ...state,
      categories: state.categories,
    }
  })

  setCategorySlug = this.updater((state, slug: string) => ({ ...state, categorySlug: slug }))

  setSearchQuery = this.updater((state, query: string) => ({ ...state, searchQuery: query }))

  setHideCompleted = this.updater((state, hide: boolean) => ({ ...state, hideCompleted: hide }))

  addNewCourse = this.updater((state, newCourse: Course) => ({ ...state, courses: [...state.courses, newCourse] }))

  updateCourse = this.updater((state, data: any) => {
    const index = state.courses.findIndex((course) => course.id === data.courseId)
    if (index != -1) {
      state.courses[index] = data.updated
    }
    return {
      ...state,
      courses: state.courses,
    }
  })

  filterCategories = (term) => this.academyService.getCategories()

  updateStepOrderEffect = this.effect<{ courseId: string, stepId: string, order: number }>((data$) => data$.pipe(
    withLatestFrom(this.course$),
    tap(
      ([data, course]) => {
          const selectedStep = course.steps.find((step) => step.id === data.stepId)
          if(selectedStep.order < data.order) {
            course.steps.forEach(step => {
              if(step.order <= data.order && step.order > selectedStep.order ) step.order  = step.order - 1;
            })
          } else if(selectedStep.order > data.order) {
            course.steps.forEach(step => {
              if(step.order >= data.order && step.order < selectedStep.order) step.order  = step.order + 1;
            })
          }
          selectedStep.order = data.order;
          this.patchState({
            course: course
          })
      },
    ),
    switchMap(([data, course]) => this.academyService.updateStepOrder(data.stepId, data.order).pipe(
      tap(
        (result: any) => {
          console.log('update order result: ', result)
        }
      )
    ))
  ))

  loadCategoriesEffect = this.effect((input$) =>
    input$.pipe(
      switchMap((_) =>
        this.academyService.getCategories().pipe(
          tapResponse(
            (data) => {
              console.log(data)
              this.patchState({
                categories: data,
              })
            },
            (error) => {
              console.log(error)
            },
          ),
        ),
      ),
    ),
  )

  loadCoursesEffect = this.effect((input$) =>
    input$.pipe(
      switchMap((_) =>
        this.academyService.getCourses().pipe(
          tapResponse(
            (data) => {
              const latestCompletedCourseId = localStorage.getItem('latest_completed_course_id')
              if(latestCompletedCourseId) {
                localStorage.removeItem('latest_completed_course_id')
                const latestCompletedCoure = data.find(course => course.id === latestCompletedCourseId)
                if(latestCompletedCoure) {
                  if(latestCompletedCoure.progress.currentStep !== 0) {
                    latestCompletedCoure.progress.completed += 1;
                    latestCompletedCoure.progress.currentStep = 0;
                  }
                }
              }
              this.patchState({
                courses: data,
              })
            },
            (error) => {},
          ),
        ),
      ),
    ),
  )

  loadCourseByIdEffect = this.effect<string>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.academyService.getCourseById(id).pipe(
          tapResponse(
            (course) => {
              this.patchState({
                course: course,
              })
            },
            (error) => {},
          ),
        ),
      ),
    ),
  )

  createAcademyCategoryEffect = this.effect<{ input: UserCreateAcademyCategoryInput; sendEmitter: EventEmitter<any> }>((data$) =>
    data$.pipe(
      switchMap((data) =>
        this.academyService.createAcademyCategory(data.input).pipe(
          tapResponse(
            (created) => {
              this.toast.success('Created new category', { duration: 3000 })
              this.addNewCategory(created)
              data.sendEmitter.emit(created)
            },
            (error: any) => {
              this.toast.error(error.Message, { duration: 3000 })
              this.formService.setErrors(error.Data)
            },
          ),
        ),
      ),
    ),
  )

  createCourseEffect = this.effect<{ input: UserCreateCourseInput; sendEmitter: EventEmitter<void> }>((data$) =>
    data$.pipe(
      switchMap((data) =>
        this.academyService.createCourse(data.input).pipe(
          tapResponse(
            (created) => {
              this.toast.success('Created new course', { duration: 3000 })
              this.addNewCourse(created)
              data.sendEmitter.emit()
            },
            (error: any) => {
              this.toast.error(error.Message, { duration: 3000 })
              this.formService.setErrors(error.Data)
            },
          ),
        ),
      ),
    ),
  )

  updateAcademyCategoryEffect = this.effect<{ categoryId: string; input: UserUpdateAcademyCategoryInput; sendEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        switchMap((data) =>
          this.academyService.updateAcademyCategory(data.categoryId, data.input).pipe(
            tapResponse(
              (updated) => {
                this.toast.success('Updated course', { duration: 3000 })
                this.updateCategory({ categoryId: data.categoryId, updated: updated })
                data.sendEmitter.emit(updated)
              },
              (error: any) => {
                this.toast.error(error.Message, { duration: 3000 })
                this.formService.setErrors(error.Data)
              },
            ),
          ),
        ),
      ),
  )

  updateCourseEffect = this.effect<{ courseId: string; input: UserUpdateCourseInput; sendEmitter: EventEmitter<void> }>(
    (data$) =>
      data$.pipe(
        switchMap((data) =>
          this.academyService.updateCourse(data.courseId, data.input).pipe(
            tapResponse(
              (updated) => {
                this.toast.success('Updated course', { duration: 3000 })
                this.updateCourse({ courseId: data.courseId, updated: updated })
                data.sendEmitter.emit()
              },
              (error: any) => {
                this.toast.error(error.Message, { duration: 3000 })
                this.formService.setErrors(error.Data)
              },
            ),
          ),
        ),
      ),
  )

  createCourseStepEffect = this.effect<{ input: UserCreateStepInput; sendEmitter: EventEmitter<void> }>((data$) =>
    data$.pipe(
      withLatestFrom(this.course$),
      switchMap(([data, course]) =>
        this.academyService.createCourseStep(data.input).pipe(
          tapResponse(
            (created) => {
              this.patchState({
                course: {
                  ...course,
                  totalSteps: course.totalSteps + 1,
                  steps: [...course.steps, created],
                },
              })
              this.toast.success('Create new course step', { duration: 3000 })
              data.sendEmitter.emit()
            },
            (error: any) => {
              this.toast.error(error.Message, { duration: 3000 })
              this.formService.setErrors(error.Data)
            },
          ),
        ),
      ),
    ),
  )

  updateCourseStepEffect = this.effect<{ stepId: string; input: UserUpdateStepInput; sendEmitter: EventEmitter<void> }>(
    (data$) =>
      data$.pipe(
        withLatestFrom(this.course$),
        switchMap(([data, course]) =>
          this.academyService.updateCourseStep(data.stepId, data.input).pipe(
            tapResponse(
              (updated) => {
                const steps = Object.assign(course.steps)
                const updatedStepIndex = steps.findIndex((step) => step.id === data.stepId)
                if (updatedStepIndex != -1) {
                  steps[updatedStepIndex] = updated
                  this.patchState({
                    course: {
                      ...course,
                      steps: steps,
                    },
                  })
                }
                data.sendEmitter.emit()
                this.toast.success('Updated course step', { duration: 3000 })
              },
              (error: any) => {
                this.toast.error(error.Message, { duration: 3000 })
                this.formService.setErrors(error.Data)
              },
            ),
          ),
        ),
      ),
  )

  crateCoureProgressEffect = this.effect<{ courseId: string}>((data$) =>
    data$.pipe(
      withLatestFrom(this.course$),
      switchMap(([data, course]) =>
        this.academyService.createCourseProgress({ courseId: data.courseId }).pipe(
          tapResponse(
            (created) => {
              this.patchState({
                course: {
                  ...course,
                  progress: {
                    courseProgressId: created.id,
                    currentStep: created.currentStep,
                    completed: created.completed,
                  },
                },
              })
            },
            (error: any) => {
              console.log(error)
            },
          ),
        ),
      ),
    ),
  )

  updateCourseProgressEffect = this.effect<{ courseProgressId: string; currentStep: number }>((data$) =>
    data$.pipe(
      withLatestFrom(this.course$),
      switchMap(([data, course]) =>
        {
          if(data.currentStep === course.totalSteps) {
            localStorage.setItem('latest_completed_course_id', course.id)
          }
          return this.academyService.updateCourseProgress(data.courseProgressId, { currentStep: data.currentStep }).pipe(
            tapResponse(
              (updated) => {
                this.patchState({
                  course: {
                    ...course,
                    progress: {
                      ...course.progress,
                      currentStep: updated.currentStep,
                      completed: updated.completed,
                    },
                  },
                })
              },
              (error) => {
                console.log(error)
              },
            ),
          )
        }
      ),
    ),
  )
}
