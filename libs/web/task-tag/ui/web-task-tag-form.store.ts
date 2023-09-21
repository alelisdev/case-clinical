
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, TaskTag, TaskItem,Tag } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TaskTagFormState {
  errors?: any
  loading?: boolean
  item?: TaskTag,
 taskItems?: TaskItem[],
 tags?: Tag[]
  searchTerm?: string
}

@Injectable()
export class WebTaskTagFormStore extends ComponentStore<TaskTagFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
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


}
