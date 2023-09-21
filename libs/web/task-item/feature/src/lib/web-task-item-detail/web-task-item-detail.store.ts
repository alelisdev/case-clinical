
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,TaskItem } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface TaskItemDetailState {
  errors ?: any
  loading?: boolean
  item?: TaskItem
}

@Injectable()
export class WebTaskItemDetailStore extends ComponentStore<TaskItemDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadTaskItemEffect(route.params.pipe(pluck('taskItemId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Type', value: item?.type },
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },
{ label: 'Notes', value: item?.notes },

{ label: 'Order', value: item?.order },
{ label: 'Priority', value: item?.priority },

{ label: 'Title', value: item?.title },
{ label: 'Due Date', value: item?.dueDate },
{ label: 'Assigned Date', value: item?.assignedDate },
{ label: 'Completed on', value: item?.completedOn },
{ label: 'Completed', value: item?.completed },
{ label: 'Task Tags', value: item?.taskTags },
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

  readonly loadTaskItemEffect = this.effect<string>((taskItemId$) =>
    taskItemId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((taskItemId) =>
        this.data.userTaskItem({ taskItemId }).pipe(
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

  readonly deleteTaskItemEffect = this.effect<TaskItem>(
    (taskItem$) =>
      taskItem$.pipe(
        switchMap((taskItem) =>
          this.data
            .userDeleteTaskItem({
              taskItemId: taskItem.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/task-items'])
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
}

