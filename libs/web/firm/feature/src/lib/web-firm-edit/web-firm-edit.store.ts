
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateFirmInput, WebCoreDataAccessService, Firm, FirmStatus,Document } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { FirmService } from '@case-clinical/web/firm/shared'

export interface FirmEditState {
  errors?: any
  loading?: boolean
  item?: Firm,
 firmStatuses?: FirmStatus[],
 documents?: Document[]
  searchTerm?: string
}

@Injectable()
export class WebFirmEditStore extends ComponentStore<FirmEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly firmService: FirmService
) {
    super({ loading: false })
    
    this.loadFirmEffect(route.params.pipe(map((route) => route?.firmId)))
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
        this.data.userSelectFirmStatuses({input: { name: term}}).pipe(
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


  readonly filterDocuments = (term) => 
        this.data.userSelectDocuments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let documents = res.data.items;
              this.patchState({documents})
              return documents
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



  readonly addFirmStatus = this.updater((state, firmStatus: FirmStatus) => ({
    ...state, firmStatuses: state.firmStatuses.concat(firmStatus)
  }))


  readonly addDocument = this.updater((state, document: Document) => ({
    ...state, documents: state.documents.concat(document)
  }))

  
  readonly loadFirmEffect = this.effect<string>((firmId$) =>
     firmId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((firmId) =>
        this.data.userFirm({firmId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateFirmEffect = this.effect<UserUpdateFirmInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.firmService.updateFirm(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
