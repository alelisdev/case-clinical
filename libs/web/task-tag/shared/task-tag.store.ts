
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { TaskTagService } from './task-tag.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateTaskTagInput, UserUpdateTaskTagInput, WebCoreDataAccessService, CorePaging, TaskTag, TaskItem,Tag } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface TaskTagFeatureState {
  errors?: any
  loading?: boolean
  item?: TaskTag
  done: boolean,
  formName?: string
taskId?: string,tagId?: string,
  taskTags: TaskTag[]
 taskItems?: TaskItem[],
 tags?: Tag[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebTaskTagFeatureStore extends ComponentStore<TaskTagFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly taskTagService: TaskTagService
) {
    super({ 
      loading: false,
      taskTags: [],
      done: false,
      searchQuery: '',
      formName: undefined,
taskId: undefined,
tagId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('taskTagId')) {
      var taskTagId = this.route.snapshot.paramMap.get('taskTagId')
      this.setFormName('taskTag_edit')
    } else {
      this.setFormName('taskTag_create')
    }


    if(this.route.snapshot.paramMap.has("taskId")) {
      var taskId = this.route.snapshot.paramMap.get("taskId")
      this.setTaskId(taskId)
    }


    if(this.route.snapshot.paramMap.has("tagId")) {
      var tagId = this.route.snapshot.paramMap.get("tagId")
      this.setTagId(tagId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly taskTags$ = this.select((s) => s.taskTags)
  readonly taskItems$ = this.select((s) => s.taskItems || [])
  readonly tags$ = this.select((s) => s.tags || [])

readonly taskId$ = this.select((s) => s.taskId)

readonly tagId$ = this.select((s) => s.tagId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.taskTags$,
this.taskItems$,this.tags$,
    (errors, loading, item, formName, taskTags, taskItems,tags ) => ({
    errors,
    loading,
    item,
    formName,
    taskTags,

            taskItems,tags
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.taskId$,
this.tagId$, this.searchQuery$, (paging, taskId,
tagId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    taskId: taskId,tagId: tagId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setTaskId = this.updater((state, taskId: string) => ({
                ...state,
    taskId,
  }))


            readonly setTagId = this.updater((state, tagId: string) => ({
                ...state,
    tagId,
  }))



  readonly filterTaskItems = (term) => 
        this.data.userSelectTaskItems({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let taskItems = res.data.items;
              this.patchState({taskItems})
              return taskItems
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


  readonly filterTags = (term) => 
        this.data.userSelectTags({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let tags = res.data.items;
              this.patchState({tags})
              return tags
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



  readonly addTaskItem = this.updater((state, taskItem: TaskItem) => ({
    ...state, taskItems: state.taskItems.concat(taskItem)
  }))


  readonly addTag = this.updater((state, tag: Tag) => ({
    ...state, tags: state.tags.concat(tag)
  }))

    

  readonly setItem = this.updater((state, item: TaskTag) => ({...state, item}))

  addNewTaskTag = this.updater((state, taskTag: TaskTag) => ({ ...state, taskTags: [...state.taskTags, taskTag] }))

  updateTaskTag = this.updater((state, taskTag: TaskTag) => {
    return {
      ...state,
      taskTags: state.taskTags.map((el) => {
        if (el.id === taskTag.id) {
          return taskTag
        } else {
          return el
        }
      }),
    }
  })

  addTaskTags = this.updater((state, newTaskTags: any[]) => ({...state, taskTags: state.taskTags.concat(newTaskTags) }))
  updateTaskTags = this.updater((state, updatedTaskTags: any[]) => {
    return {
      ...state,
      taskTags: state.taskTags.map((taskTag) => {
        const updated = updatedTaskTags.find((el) => el.id === taskTag.id);
        return updated ? updated : taskTag;
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
        return this.taskTagService.validateTaskTagExcelData(excelData, vm.taskItems,vm.tags);
      })
    )
  }


  readonly loadTaskTagEffect = this.effect<string>((taskTagId$) =>
    taskTagId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((taskTagId) =>
        this.data.userTaskTag({ taskTagId }).pipe(
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



  readonly loadTaskTagsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userTaskTags({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                taskTags: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

  readonly createTaskTagEffect = this.effect<UserCreateTaskTagInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.taskTagService.createTaskTag({...input }).pipe(
          tapResponse(
            (taskTag: TaskTag) => {
              this.addNewTaskTag(taskTag)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: taskTag, loading: false, done: true }), 300);
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

    readonly updateTaskTagEffect = this.effect<UserUpdateTaskTagInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.taskTagService.updateTaskTag(input, input.id).pipe(
              tapResponse(
                (taskTag) => {
                  this.updateTaskTag(taskTag)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: taskTag, loading: false, done: true }), 300);
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
  
    readonly deleteTaskTagEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, taskTag]) => {
          return this.data.userDeleteTaskTag({taskTagId: taskTag.id})
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
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateTaskTagInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.taskTagService.importTaskTags(data).pipe(
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

            this.addTaskTags(created);
            this.updateTaskTags(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
