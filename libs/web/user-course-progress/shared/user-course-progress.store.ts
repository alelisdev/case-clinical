
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { UserCourseProgressService } from './user-course-progress.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateUserCourseProgressInput, UserUpdateUserCourseProgressInput, WebCoreDataAccessService, CorePaging, UserCourseProgress, User,Course } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface UserCourseProgressFeatureState {
  errors?: any
  loading?: boolean
  item?: UserCourseProgress
  done: boolean
userId?: string,courseId?: string,
  userCourseProgresses: UserCourseProgress[]
 users?: User[],
 courses?: Course[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebUserCourseProgressFeatureStore extends ComponentStore<UserCourseProgressFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly userCourseProgressService: UserCourseProgressService
) {
    super({ 
      loading: false,
      userCourseProgresses: [],
      done: false,
      searchQuery: '',
userId: undefined,
courseId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })


    if(this.route.snapshot.paramMap.has("userId")) {
      var userId = this.route.snapshot.paramMap.get("userId")
      this.setUserId(userId)
    }


    if(this.route.snapshot.paramMap.has("courseId")) {
      var courseId = this.route.snapshot.paramMap.get("courseId")
      this.setCourseId(courseId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly userCourseProgresses$ = this.select((s) => s.userCourseProgresses)
  readonly users$ = this.select((s) => s.users || [])
  readonly courses$ = this.select((s) => s.courses || [])
  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.userCourseProgresses$,
this.users$,this.courses$,
    (errors, loading, item, userCourseProgresses, users,courses ) => ({
    errors,
    loading,
    item,
    userCourseProgresses,
users,courses
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    total: paging.total
  }))


            readonly setUserId = this.updater((state, userId: string) => ({
                ...state,
    userId,
  }))


            readonly setCourseId = this.updater((state, courseId: string) => ({
                ...state,
    courseId,
  }))



  readonly filterUsers = (term) => 
        this.data.userSelectUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterCourses = (term) => 
        this.data.userSelectCourses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let courses = res.data.items;
              this.patchState({courses})
              return courses
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))


  readonly addCourse = this.updater((state, course: Course) => ({
    ...state, courses: state.courses.concat(course)
  }))

    

  addNewUserCourseProgress = this.updater((state, userCourseProgress: UserCourseProgress) => ({ ...state, userCourseProgresses: [...state.userCourseProgresses, userCourseProgress] }))

  updateUserCourseProgress = this.updater((state, userCourseProgress: UserCourseProgress) => {
    return {
      ...state,
      userCourseProgresses: state.userCourseProgresses.map((el) => {
        if (el.id === userCourseProgress.id) {
          return userCourseProgress
        } else {
          return el
        }
      }),
    }
  })

  addUserCourseProgresses = this.updater((state, newUserCourseProgresses: any[]) => ({...state, userCourseProgresses: state.userCourseProgresses.concat(newUserCourseProgresses) }))
  updateUserCourseProgresses = this.updater((state, updatedUserCourseProgresses: any[]) => {
    return {
      ...state,
      userCourseProgresses: state.userCourseProgresses.map((userCourseProgress) => {
        const updated = updatedUserCourseProgresses.find((el) => el.id === userCourseProgress.id);
        return updated ? updated : userCourseProgress;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.userCourseProgressService.validateUserCourseProgressExcelData(excelData, vm.users,vm.courses);
      })
    )
  }

  readonly loadUserCourseProgressEffect = this.effect<string>((userCourseProgressId$) =>
    userCourseProgressId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((userCourseProgressId) =>
        this.data.userUserCourseProgress({ userCourseProgressId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly loadUserCourseProgressesEffect = this.effect(($) =>
        $.pipe(
          tap(() => { this.patchState({ loading: true }) }),
          withLatestFrom(this.input$),
          switchMap(([_, input]) =>
            this.data.userUserCourseProgresses({ input }).pipe(
              tapResponse(
                (res) => {
                  this.patchState({
                    paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                    userCourseProgresses: res.data.items,
                    errors: res.errors,
                    loading: false,
                  })
                },
                (errors: any) => 
                  this.patchState({
                    loading: false,
                    errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                }),
              ),
            ),
          ),
        ),
      )

  readonly createUserCourseProgressEffect = this.effect<UserCreateUserCourseProgressInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.userCourseProgressService.createUserCourseProgress({...input }).pipe(
          tapResponse(
            (userCourseProgress: UserCourseProgress) => {
              this.addNewUserCourseProgress(userCourseProgress)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: userCourseProgress, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updateUserCourseProgressEffect = this.effect<UserUpdateUserCourseProgressInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.userCourseProgressService.updateUserCourseProgress(input, input.id).pipe(
              tapResponse(
                (userCourseProgress) => {
                  this.updateUserCourseProgress(userCourseProgress)
                  this.toast.success('Updated Successfully')
                  setTimeout(() => this.patchState({item: userCourseProgress, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deleteUserCourseProgressEffect = this.effect<UserCourseProgress>(
    (userCourseProgress$) =>
      userCourseProgress$.pipe(
        switchMap((userCourseProgress) =>
          this.data
            .userDeleteUserCourseProgress({
                userCourseProgressId: userCourseProgress.id,
            })
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            ),
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateUserCourseProgressInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.userCourseProgressService.importUserCourseProgresses(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addUserCourseProgresses(created);
            this.updateUserCourseProgresses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
