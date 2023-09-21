
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorAuthorizationImplantService } from './prior-authorization-implant.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorAuthorizationImplantInput, UserUpdatePriorAuthorizationImplantInput, WebCoreDataAccessService, CorePaging, PriorAuthorizationImplant, Implant,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorAuthorizationImplantFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationImplant
  done: boolean,
  formName?: string
implantId?: string,priorAuthorizationRequestId?: string,
  priorAuthorizationImplants: PriorAuthorizationImplant[]
 implants?: Implant[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorAuthorizationImplantFeatureStore extends ComponentStore<PriorAuthorizationImplantFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationImplantService: PriorAuthorizationImplantService
) {
    super({ 
      loading: false,
      priorAuthorizationImplants: [],
      done: false,
      searchQuery: '',
      formName: undefined,
implantId: undefined,
priorAuthorizationRequestId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorAuthorizationImplantId')) {
      var priorAuthorizationImplantId = this.route.snapshot.paramMap.get('priorAuthorizationImplantId')
      this.setFormName('priorAuthorizationImplant_edit')
    } else {
      this.setFormName('priorAuthorizationImplant_create')
    }


    if(this.route.snapshot.paramMap.has("implantId")) {
      var implantId = this.route.snapshot.paramMap.get("implantId")
      this.setImplantId(implantId)
    }


    if(this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthorizationImplants$ = this.select((s) => s.priorAuthorizationImplants)
  readonly implants$ = this.select((s) => s.implants || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])

readonly implantId$ = this.select((s) => s.implantId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationImplants$,
this.implants$,this.priorAuthorizationRequests$,
    (errors, loading, item, formName, priorAuthorizationImplants, implants,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
    formName,
    priorAuthorizationImplants,

            implants,priorAuthorizationRequests
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.implantId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, implantId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    implantId: implantId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setImplantId = this.updater((state, implantId: string) => ({
                ...state,
    implantId,
  }))


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))



  readonly filterImplants = (term) => 
        this.data.userSelectImplants({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let implants = res.data.items;
              this.patchState({implants})
              return implants
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


  readonly filterPriorAuthorizationRequests = (term) => 
        this.data.userSelectPriorAuthorizationRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let priorAuthorizationRequests = res.data.items;
              this.patchState({priorAuthorizationRequests})
              return priorAuthorizationRequests
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



  readonly addImplant = this.updater((state, implant: Implant) => ({
    ...state, implants: state.implants.concat(implant)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly setItem = this.updater((state, item: PriorAuthorizationImplant) => ({...state, item}))

  addNewPriorAuthorizationImplant = this.updater((state, priorAuthorizationImplant: PriorAuthorizationImplant) => ({ ...state, priorAuthorizationImplants: [...state.priorAuthorizationImplants, priorAuthorizationImplant] }))

  updatePriorAuthorizationImplant = this.updater((state, priorAuthorizationImplant: PriorAuthorizationImplant) => {
    return {
      ...state,
      priorAuthorizationImplants: state.priorAuthorizationImplants.map((el) => {
        if (el.id === priorAuthorizationImplant.id) {
          return priorAuthorizationImplant
        } else {
          return el
        }
      }),
    }
  })

  addPriorAuthorizationImplants = this.updater((state, newPriorAuthorizationImplants: any[]) => ({...state, priorAuthorizationImplants: state.priorAuthorizationImplants.concat(newPriorAuthorizationImplants) }))
  updatePriorAuthorizationImplants = this.updater((state, updatedPriorAuthorizationImplants: any[]) => {
    return {
      ...state,
      priorAuthorizationImplants: state.priorAuthorizationImplants.map((priorAuthorizationImplant) => {
        const updated = updatedPriorAuthorizationImplants.find((el) => el.id === priorAuthorizationImplant.id);
        return updated ? updated : priorAuthorizationImplant;
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
        return this.priorAuthorizationImplantService.validatePriorAuthorizationImplantExcelData(excelData, vm.implants,vm.priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthorizationImplantEffect = this.effect<string>((priorAuthorizationImplantId$) =>
    priorAuthorizationImplantId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorAuthorizationImplantId) =>
        this.data.userPriorAuthorizationImplant({ priorAuthorizationImplantId }).pipe(
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



  readonly loadPriorAuthorizationImplantsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationImplants({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorAuthorizationImplants: res.data.items,
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

  readonly createPriorAuthorizationImplantEffect = this.effect<UserCreatePriorAuthorizationImplantInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorAuthorizationImplantService.createPriorAuthorizationImplant({...input }).pipe(
          tapResponse(
            (priorAuthorizationImplant: PriorAuthorizationImplant) => {
              this.addNewPriorAuthorizationImplant(priorAuthorizationImplant)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorAuthorizationImplant, loading: false, done: true }), 300);
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

    readonly updatePriorAuthorizationImplantEffect = this.effect<UserUpdatePriorAuthorizationImplantInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorAuthorizationImplantService.updatePriorAuthorizationImplant(input, input.id).pipe(
              tapResponse(
                (priorAuthorizationImplant) => {
                  this.updatePriorAuthorizationImplant(priorAuthorizationImplant)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorAuthorizationImplant, loading: false, done: true }), 300);
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
  
    readonly deletePriorAuthorizationImplantEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorAuthorizationImplant]) => {
          return this.data.userDeletePriorAuthorizationImplant({priorAuthorizationImplantId: priorAuthorizationImplant.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationImplantInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationImplantService.importPriorAuthorizationImplants(data).pipe(
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

            this.addPriorAuthorizationImplants(created);
            this.updatePriorAuthorizationImplants(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
