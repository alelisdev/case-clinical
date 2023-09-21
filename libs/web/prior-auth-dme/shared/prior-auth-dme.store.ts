
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorAuthDmeService } from './prior-auth-dme.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorAuthDmeInput, UserUpdatePriorAuthDmeInput, WebCoreDataAccessService, CorePaging, PriorAuthDme, PriorAuthorizationRequest,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorAuthDmeFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorAuthDme
  done: boolean,
  formName?: string
priorAuthId?: string,durableMedicalEquipmentId?: string,
  priorAuthDmes: PriorAuthDme[]
 priorAuthorizationRequests?: PriorAuthorizationRequest[],
 durableMedicalEquipments?: DurableMedicalEquipment[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorAuthDmeFeatureStore extends ComponentStore<PriorAuthDmeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthDmeService: PriorAuthDmeService
) {
    super({ 
      loading: false,
      priorAuthDmes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
priorAuthId: undefined,
durableMedicalEquipmentId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorAuthDmeId')) {
      var priorAuthDmeId = this.route.snapshot.paramMap.get('priorAuthDmeId')
      this.setFormName('priorAuthDme_edit')
    } else {
      this.setFormName('priorAuthDme_create')
    }


    if(this.route.snapshot.paramMap.has("priorAuthId")) {
      var priorAuthId = this.route.snapshot.paramMap.get("priorAuthId")
      this.setPriorAuthId(priorAuthId)
    }


    if(this.route.snapshot.paramMap.has("durableMedicalEquipmentId")) {
      var durableMedicalEquipmentId = this.route.snapshot.paramMap.get("durableMedicalEquipmentId")
      this.setDurableMedicalEquipmentId(durableMedicalEquipmentId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthDmes$ = this.select((s) => s.priorAuthDmes)
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly durableMedicalEquipments$ = this.select((s) => s.durableMedicalEquipments || [])

readonly priorAuthId$ = this.select((s) => s.priorAuthId)

readonly durableMedicalEquipmentId$ = this.select((s) => s.durableMedicalEquipmentId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthDmes$,
this.priorAuthorizationRequests$,this.durableMedicalEquipments$,
    (errors, loading, item, formName, priorAuthDmes, priorAuthorizationRequests,durableMedicalEquipments ) => ({
    errors,
    loading,
    item,
    formName,
    priorAuthDmes,

            priorAuthorizationRequests,durableMedicalEquipments
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.priorAuthId$,
this.durableMedicalEquipmentId$, this.searchQuery$, (paging, priorAuthId,
durableMedicalEquipmentId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    priorAuthId: priorAuthId,durableMedicalEquipmentId: durableMedicalEquipmentId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setPriorAuthId = this.updater((state, priorAuthId: string) => ({
                ...state,
    priorAuthId,
  }))


            readonly setDurableMedicalEquipmentId = this.updater((state, durableMedicalEquipmentId: string) => ({
                ...state,
    durableMedicalEquipmentId,
  }))



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


  readonly filterDurableMedicalEquipments = (term) => 
        this.data.userSelectDurableMedicalEquipments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let durableMedicalEquipments = res.data.items;
              this.patchState({durableMedicalEquipments})
              return durableMedicalEquipments
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



  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))


  readonly addDurableMedicalEquipment = this.updater((state, durableMedicalEquipment: DurableMedicalEquipment) => ({
    ...state, durableMedicalEquipments: state.durableMedicalEquipments.concat(durableMedicalEquipment)
  }))

    

  readonly setItem = this.updater((state, item: PriorAuthDme) => ({...state, item}))

  addNewPriorAuthDme = this.updater((state, priorAuthDme: PriorAuthDme) => ({ ...state, priorAuthDmes: [...state.priorAuthDmes, priorAuthDme] }))

  updatePriorAuthDme = this.updater((state, priorAuthDme: PriorAuthDme) => {
    return {
      ...state,
      priorAuthDmes: state.priorAuthDmes.map((el) => {
        if (el.id === priorAuthDme.id) {
          return priorAuthDme
        } else {
          return el
        }
      }),
    }
  })

  addPriorAuthDmes = this.updater((state, newPriorAuthDmes: any[]) => ({...state, priorAuthDmes: state.priorAuthDmes.concat(newPriorAuthDmes) }))
  updatePriorAuthDmes = this.updater((state, updatedPriorAuthDmes: any[]) => {
    return {
      ...state,
      priorAuthDmes: state.priorAuthDmes.map((priorAuthDme) => {
        const updated = updatedPriorAuthDmes.find((el) => el.id === priorAuthDme.id);
        return updated ? updated : priorAuthDme;
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
        return this.priorAuthDmeService.validatePriorAuthDmeExcelData(excelData, vm.priorAuthorizationRequests,vm.durableMedicalEquipments);
      })
    )
  }


  readonly loadPriorAuthDmeEffect = this.effect<string>((priorAuthDmeId$) =>
    priorAuthDmeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorAuthDmeId) =>
        this.data.userPriorAuthDme({ priorAuthDmeId }).pipe(
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



  readonly loadPriorAuthDmesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthDmes({input}).pipe(
          tapResponse(
            (res) =>{
              console.log('$$$$$$$$$$$$$$$$$$$$$$')
              console.log(res.data.items);
              return this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorAuthDmes: res.data.items,
                errors: res.errors,
                loading: false,
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

  readonly createPriorAuthDmeEffect = this.effect<UserCreatePriorAuthDmeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>{
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.priorAuthDmeService.createPriorAuthDme(filteredObj).pipe(
          tapResponse(
            (priorAuthDme: PriorAuthDme) => {
              this.addNewPriorAuthDme(priorAuthDme)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorAuthDme, loading: false, done: true }), 300);
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
        );
      }
        
      ),
    ),
  )

    readonly updatePriorAuthDmeEffect = this.effect<UserUpdatePriorAuthDmeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorAuthDmeService.updatePriorAuthDme(input, input.id).pipe(
              tapResponse(
                (priorAuthDme) => {
                  this.updatePriorAuthDme(priorAuthDme)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorAuthDme, loading: false, done: true }), 300);
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
  
    readonly deletePriorAuthDmeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorAuthDme]) => {
          return this.data.userDeletePriorAuthDme({priorAuthDmeId: priorAuthDme.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorAuthDmeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthDmeService.importPriorAuthDmes(data).pipe(
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

            this.addPriorAuthDmes(created);
            this.updatePriorAuthDmes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
