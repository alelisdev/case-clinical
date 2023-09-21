
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorAuthorizationEquipmentService } from './prior-authorization-equipment.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorAuthorizationEquipmentInput, UserUpdatePriorAuthorizationEquipmentInput, WebCoreDataAccessService, CorePaging, PriorAuthorizationEquipment, Equipment,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorAuthorizationEquipmentFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationEquipment
  done: boolean,
  formName?: string
equipmentId?: string,priorAuthorizationRequestId?: string,
  priorAuthorizationEquipments: PriorAuthorizationEquipment[]
 equipments?: Equipment[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorAuthorizationEquipmentFeatureStore extends ComponentStore<PriorAuthorizationEquipmentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationEquipmentService: PriorAuthorizationEquipmentService
) {
    super({ 
      loading: false,
      priorAuthorizationEquipments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
equipmentId: undefined,
priorAuthorizationRequestId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorAuthorizationEquipmentId')) {
      var priorAuthorizationEquipmentId = this.route.snapshot.paramMap.get('priorAuthorizationEquipmentId')
      this.setFormName('priorAuthorizationEquipment_edit')
    } else {
      this.setFormName('priorAuthorizationEquipment_create')
    }


    if(this.route.snapshot.paramMap.has("equipmentId")) {
      var equipmentId = this.route.snapshot.paramMap.get("equipmentId")
      this.setEquipmentId(equipmentId)
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
  readonly priorAuthorizationEquipments$ = this.select((s) => s.priorAuthorizationEquipments)
  readonly equipments$ = this.select((s) => s.equipments || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])

readonly equipmentId$ = this.select((s) => s.equipmentId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationEquipments$,
this.equipments$,this.priorAuthorizationRequests$,
    (errors, loading, item, formName, priorAuthorizationEquipments, equipments,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
    formName,
    priorAuthorizationEquipments,

            equipments,priorAuthorizationRequests
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.equipmentId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, equipmentId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    equipmentId: equipmentId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setEquipmentId = this.updater((state, equipmentId: string) => ({
                ...state,
    equipmentId,
  }))


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))



  readonly filterEquipments = (term) => 
        this.data.userSelectEquipments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let equipments = res.data.items;
              this.patchState({equipments})
              return equipments
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



  readonly addEquipment = this.updater((state, equipment: Equipment) => ({
    ...state, equipments: state.equipments.concat(equipment)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly setItem = this.updater((state, item: PriorAuthorizationEquipment) => ({...state, item}))

  addNewPriorAuthorizationEquipment = this.updater((state, priorAuthorizationEquipment: PriorAuthorizationEquipment) => ({ ...state, priorAuthorizationEquipments: [...state.priorAuthorizationEquipments, priorAuthorizationEquipment] }))

  updatePriorAuthorizationEquipment = this.updater((state, priorAuthorizationEquipment: PriorAuthorizationEquipment) => {
    return {
      ...state,
      priorAuthorizationEquipments: state.priorAuthorizationEquipments.map((el) => {
        if (el.id === priorAuthorizationEquipment.id) {
          return priorAuthorizationEquipment
        } else {
          return el
        }
      }),
    }
  })

  addPriorAuthorizationEquipments = this.updater((state, newPriorAuthorizationEquipments: any[]) => ({...state, priorAuthorizationEquipments: state.priorAuthorizationEquipments.concat(newPriorAuthorizationEquipments) }))
  updatePriorAuthorizationEquipments = this.updater((state, updatedPriorAuthorizationEquipments: any[]) => {
    return {
      ...state,
      priorAuthorizationEquipments: state.priorAuthorizationEquipments.map((priorAuthorizationEquipment) => {
        const updated = updatedPriorAuthorizationEquipments.find((el) => el.id === priorAuthorizationEquipment.id);
        return updated ? updated : priorAuthorizationEquipment;
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
        return this.priorAuthorizationEquipmentService.validatePriorAuthorizationEquipmentExcelData(excelData, vm.equipments,vm.priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthorizationEquipmentEffect = this.effect<string>((priorAuthorizationEquipmentId$) =>
    priorAuthorizationEquipmentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorAuthorizationEquipmentId) =>
        this.data.userPriorAuthorizationEquipment({ priorAuthorizationEquipmentId }).pipe(
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



  readonly loadPriorAuthorizationEquipmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationEquipments({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorAuthorizationEquipments: res.data.items,
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

  readonly createPriorAuthorizationEquipmentEffect = this.effect<UserCreatePriorAuthorizationEquipmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorAuthorizationEquipmentService.createPriorAuthorizationEquipment({...input }).pipe(
          tapResponse(
            (priorAuthorizationEquipment: PriorAuthorizationEquipment) => {
              this.addNewPriorAuthorizationEquipment(priorAuthorizationEquipment)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorAuthorizationEquipment, loading: false, done: true }), 300);
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

    readonly updatePriorAuthorizationEquipmentEffect = this.effect<UserUpdatePriorAuthorizationEquipmentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorAuthorizationEquipmentService.updatePriorAuthorizationEquipment(input, input.id).pipe(
              tapResponse(
                (priorAuthorizationEquipment) => {
                  this.updatePriorAuthorizationEquipment(priorAuthorizationEquipment)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorAuthorizationEquipment, loading: false, done: true }), 300);
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
  
    readonly deletePriorAuthorizationEquipmentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorAuthorizationEquipment]) => {
          return this.data.userDeletePriorAuthorizationEquipment({priorAuthorizationEquipmentId: priorAuthorizationEquipment.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationEquipmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationEquipmentService.importPriorAuthorizationEquipments(data).pipe(
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

            this.addPriorAuthorizationEquipments(created);
            this.updatePriorAuthorizationEquipments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
