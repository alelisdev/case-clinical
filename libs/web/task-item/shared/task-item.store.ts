
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { TaskItemService } from './task-item.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateTaskItemInput, UserUpdateTaskItemInput, WebCoreDataAccessService, CorePaging, TaskItem, LegalCase,User } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface TaskItemFeatureState {
  errors?: any
  loading?: boolean
  item?: TaskItem
  done: boolean,
  formName?: string
legalCaseId?: string,assignedToId?: string,
  taskItems: TaskItem[]
 legalCases?: LegalCase[],
 users?: User[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebTaskItemFeatureStore extends ComponentStore<TaskItemFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly taskItemService: TaskItemService
) {
    super({ 
      loading: false,
      taskItems: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
assignedToId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('taskItemId')) {
      var taskItemId = this.route.snapshot.paramMap.get('taskItemId')
      this.setFormName('taskItem_edit')
    } else {
      this.setFormName('taskItem_create')
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }


    if(this.route.snapshot.paramMap.has("assignedToId")) {
      var assignedToId = this.route.snapshot.paramMap.get("assignedToId")
      this.setAssignedToId(assignedToId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly taskItems$ = this.select((s) => s.taskItems)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly users$ = this.select((s) => s.users || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly assignedToId$ = this.select((s) => s.assignedToId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.taskItems$,
this.legalCases$,this.users$,
    (errors, loading, item, formName, taskItems, legalCases,users ) => ({
    errors,
    loading,
    item,
    formName,
    taskItems,

            legalCases,users
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.legalCaseId$,
this.assignedToId$, this.searchQuery$, (paging, legalCaseId,
assignedToId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,assignedToId: assignedToId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))


            readonly setAssignedToId = this.updater((state, assignedToId: string) => ({
                ...state,
    assignedToId,
  }))



  readonly filterLegalCases = (term) => 
        this.data.userSelectLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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



  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

    

  readonly setItem = this.updater((state, item: TaskItem) => ({...state, item}))

  addNewTaskItem = this.updater((state, taskItem: TaskItem) => ({ ...state, taskItems: [...state.taskItems, taskItem] }))

  updateTaskItem = this.updater((state, taskItem: TaskItem) => {
    return {
      ...state,
      taskItems: state.taskItems.map((el) => {
        if (el.id === taskItem.id) {
          return taskItem
        } else {
          return el
        }
      }),
    }
  })

  addTaskItems = this.updater((state, newTaskItems: any[]) => ({...state, taskItems: state.taskItems.concat(newTaskItems) }))
  updateTaskItems = this.updater((state, updatedTaskItems: any[]) => {
    return {
      ...state,
      taskItems: state.taskItems.map((taskItem) => {
        const updated = updatedTaskItems.find((el) => el.id === taskItem.id);
        return updated ? updated : taskItem;
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
        return this.taskItemService.validateTaskItemExcelData(excelData, vm.legalCases,vm.users);
      })
    )
  }


  readonly loadTaskItemEffect = this.effect<string>((taskItemId$) =>
    taskItemId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((taskItemId) =>
        this.data.userTaskItem({ taskItemId }).pipe(
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



  readonly loadTaskItemsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userTaskItems({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                taskItems: res.data.items,
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

  readonly createTaskItemEffect = this.effect<UserCreateTaskItemInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.taskItemService.createTaskItem({...input }).pipe(
          tapResponse(
            (taskItem: TaskItem) => {
              this.addNewTaskItem(taskItem)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: taskItem, loading: false, done: true }), 300);
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

    readonly updateTaskItemEffect = this.effect<UserUpdateTaskItemInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.taskItemService.updateTaskItem(input, input.id).pipe(
              tapResponse(
                (taskItem) => {
                  this.updateTaskItem(taskItem)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: taskItem, loading: false, done: true }), 300);
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
  
    readonly deleteTaskItemEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, taskItem]) => {
          return this.data.userDeleteTaskItem({taskItemId: taskItem.id})
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

  readonly importExcelEffect = this.effect<UserUpdateTaskItemInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.taskItemService.importTaskItems(data).pipe(
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

            this.addTaskItems(created);
            this.updateTaskItems(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
