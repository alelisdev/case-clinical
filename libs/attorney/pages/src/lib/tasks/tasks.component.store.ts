import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { FormService } from '@case-clinical/web/ui/form'
import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { Injectable, Injector } from '@angular/core'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
export interface TasksState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class TasksStore extends AttorneyBaseStore<TasksState> {
  private subscriber: any
  constructor(
    private data: WebCoreDataAccessService,
    private formService: FormService,
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    injector: Injector,
  ) {
    super(injector)
  }

  loading$ = this.select((s) => s.loading)

  taskItems$ = this.select(this.attorneyOptions$, this.selectedAttorneyId$, (attorneys, selectedId) => {
    const tItems: any[] = []
    if (attorneys)
      JSON.parse(JSON.stringify(attorneys))?.forEach((attorney: any) => {
        if ((attorney.id === selectedId || selectedId === 'all') && attorney.id !== 'all')
          attorney.legalCases?.forEach((legalCase: any) => {
            legalCase.taskItems?.forEach((taskItem: any) => {
              tItems.push({
                ...taskItem,
                attorneyId: attorney.id,
                legalCaseId: legalCase.id,
              })
            })
          })
      })

    return tItems
  })

  vm$ = this.select(this.loading$, this.user$, this.taskItems$, (loading, user, taskItems) => {
    return {
      loading,
      user,
      taskItems,
    }
  })

  override getInitialState(): TasksState {
    return {
      query: '',
      loading: false,
    }
  }
}
