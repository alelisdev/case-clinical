
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PlaceOfServiceService } from './place-of-service.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePlaceOfServiceInput, UserUpdatePlaceOfServiceInput, WebCoreDataAccessService, CorePaging, PlaceOfService,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PlaceOfServiceFeatureState {
  errors?: any
  loading?: boolean
  item?: PlaceOfService
  done: boolean,
  formName?: string

  placeOfServices: PlaceOfService[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPlaceOfServiceFeatureStore extends ComponentStore<PlaceOfServiceFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly placeOfServiceService: PlaceOfServiceService
) {
    super({ 
      loading: false,
      placeOfServices: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('placeOfServiceId')) {
      var placeOfServiceId = this.route.snapshot.paramMap.get('placeOfServiceId')
      this.setFormName('placeOfService_edit')
    } else {
      this.setFormName('placeOfService_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly placeOfServices$ = this.select((s) => s.placeOfServices)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.placeOfServices$,

    (errors, loading, item, formName, placeOfServices,  ) => ({
    errors,
    loading,
    item,
    formName,
    placeOfServices,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: PlaceOfService) => ({...state, item}))

  addNewPlaceOfService = this.updater((state, placeOfService: PlaceOfService) => ({ ...state, placeOfServices: [...state.placeOfServices, placeOfService] }))

  updatePlaceOfService = this.updater((state, placeOfService: PlaceOfService) => {
    return {
      ...state,
      placeOfServices: state.placeOfServices.map((el) => {
        if (el.id === placeOfService.id) {
          return placeOfService
        } else {
          return el
        }
      }),
    }
  })

  addPlaceOfServices = this.updater((state, newPlaceOfServices: any[]) => ({...state, placeOfServices: state.placeOfServices.concat(newPlaceOfServices) }))
  updatePlaceOfServices = this.updater((state, updatedPlaceOfServices: any[]) => {
    return {
      ...state,
      placeOfServices: state.placeOfServices.map((placeOfService) => {
        const updated = updatedPlaceOfServices.find((el) => el.id === placeOfService.id);
        return updated ? updated : placeOfService;
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
        return this.placeOfServiceService.validatePlaceOfServiceExcelData(excelData);
      })
    )
  }


  readonly loadPlaceOfServiceEffect = this.effect<string>((placeOfServiceId$) =>
    placeOfServiceId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((placeOfServiceId) =>
        this.data.userPlaceOfService({ placeOfServiceId }).pipe(
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



  readonly loadPlaceOfServicesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPlaceOfServices({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                placeOfServices: res.data.items,
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

  readonly createPlaceOfServiceEffect = this.effect<UserCreatePlaceOfServiceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.placeOfServiceService.createPlaceOfService({...input }).pipe(
          tapResponse(
            (placeOfService: PlaceOfService) => {
              this.addNewPlaceOfService(placeOfService)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: placeOfService, loading: false, done: true }), 300);
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

    readonly updatePlaceOfServiceEffect = this.effect<UserUpdatePlaceOfServiceInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.placeOfServiceService.updatePlaceOfService(input, input.id).pipe(
              tapResponse(
                (placeOfService) => {
                  this.updatePlaceOfService(placeOfService)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: placeOfService, loading: false, done: true }), 300);
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
  
    readonly deletePlaceOfServiceEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, placeOfService]) => {
          return this.data.userDeletePlaceOfService({placeOfServiceId: placeOfService.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePlaceOfServiceInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.placeOfServiceService.importPlaceOfServices(data).pipe(
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

            this.addPlaceOfServices(created);
            this.updatePlaceOfServices(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
