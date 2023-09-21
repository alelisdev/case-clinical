
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateTaskTagInput, WebCoreDataAccessService, TaskTag, TaskItem,Tag } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface TaskTagUpdateState {
  errors ?: any
  loading?: boolean
  item?: TaskTag,
 taskItems?: TaskItem[],
 tags?: Tag[]
  searchTerm?: string
}

@Injectable()
export class WebTaskTagEditStore extends ComponentStore<TaskTagUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadTaskTagEffect(route.params.pipe(pluck('taskTagId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly taskItems$ = this.select((s) => s.taskItems)
  readonly tags$ = this.select((s) => s.tags)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.taskItems$,this.tags$,
    (errors, loading, item, taskItems,tags ) => ({
    errors,
    loading,
    item,
taskItems,tags
  }),
{debounce: true})



  readonly filterTaskItems = (term) => 
        this.data.userTaskItems({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let taskItems = res.data.items;
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
        this.data.userTags({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let tags = res.data.items;
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


    

readonly loadTaskTagEffect = this.effect<string>((taskTagId$) =>
    taskTagId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((taskTagId) =>
        this.data.userTaskTag({ taskTagId }).pipe(
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

  readonly updateTaskTagEffect = this.effect<UserUpdateTaskTagInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateTaskTag({ input, taskTagId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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

