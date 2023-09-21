
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Firm, UserCreateFirmInput, FirmStatus,Document } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface FirmFormState {
  errors?: any
  loading?: boolean
  item?: Firm,
 firmStatuses?: FirmStatus[],
 documents?: Document[]
  searchTerm?: string
}

@Injectable()
export class WebFirmFormStore extends ComponentStore<FirmFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly firmStatuses$ = this.select((s) => s.firmStatuses || [])
  readonly documents$ = this.select((s) => s.documents || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.firmStatuses$,this.documents$,
    (errors, loading, item, firmStatuses,documents ) => ({
    errors,
    loading,
    item,
firmStatuses,documents
  }),
{debounce: true})



  readonly filterFirmStatuses = (term) => 
        this.data.userFirmStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let firmStatuses = res.data.items;
              this.patchState({firmStatuses})
              return firmStatuses
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


  readonly createFirmEffect = this.effect<UserCreateFirmInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateFirm({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addFirmStatus = this.updater((state, firmStatus: FirmStatus) => ({
    ...state, firmStatuses: state.firmStatuses.concat(firmStatus)
  }))


  readonly addDocument = this.updater((state, document: Document) => ({
    ...state, documents: state.documents.concat(document)
  }))

}
