
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Task } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface TaskDetailState {
  errors ?: any
  loading?: boolean
  item?: Task
}

@Injectable()
export class WebTaskDetailStore extends ComponentStore<TaskDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadTaskEffect(route.params.pipe(pluck('taskId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },
{ label: 'Title', value: item?.title },
{ label: 'Due Date', value: item?.dueDate },
{ label: 'Assigned Date', value: item?.assignedDate },
{ label: 'Completed On', value: item?.completedOn },
{ label: 'Completed', value: item?.completed },
{ label: 'Completion Notes', value: item?.completionNotes },
//{f.name}
//{f.name}
//{f.name}
//{f.name}
{ label: 'Task Status', value: item?.taskStatus },
{ label: 'Task Priority Name', value: item?.taskPriorityName },
{ label: 'Assigned User', value: item?.assignedUser },
{ label: 'Subject', value: item?.subject },
{ label: 'Summary', value: item?.summary },
{ label: 'Due By', value: item?.dueBy },
{ label: 'Scheduled For', value: item?.scheduledFor },
{ label: 'Date Closed', value: item?.dateClosed },
{ label: 'Closed By', value: item?.closedBy },
{ label: 'Is Important', value: item?.isImportant },
{ label: 'Temp', value: item?.temp },
{ label: 'Created By', value: item?.createdBy },
{ label: 'Date Created', value: item?.dateCreated },
{ label: 'Removed', value: item?.removed },
{ label: 'Task Completed Date', value: item?.taskCompletedDate },
{ label: 'Mig Source', value: item?.migSource },
{ label: 'Entity', value: item?.entity },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
    
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadTaskEffect = this.effect<string>((taskId$) =>
    taskId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((taskId) =>
        this.data.userTask({ taskId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly deleteTaskEffect = this.effect<Task>(
    (task$) =>
      task$.pipe(
        switchMap((task) =>
          this.data
            .userDeleteTask({
              taskId: task.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/tasks']),
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
}

