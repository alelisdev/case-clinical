
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { BodyPartService } from './body-part.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateBodyPartInput, UserUpdateBodyPartInput, WebCoreDataAccessService, CorePaging, BodyPart,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface BodyPartFeatureState {
  errors?: any
  loading?: boolean
  item?: BodyPart
  done: boolean,
  formName?: string

  bodyParts: BodyPart[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebBodyPartFeatureStore extends ComponentStore<BodyPartFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly bodyPartService: BodyPartService
) {
    super({ 
      loading: false,
      bodyParts: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('bodyPartId')) {
      var bodyPartId = this.route.snapshot.paramMap.get('bodyPartId')
      this.setFormName('bodyPart_edit')
    } else {
      this.setFormName('bodyPart_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly bodyParts$ = this.select((s) => s.bodyParts)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.bodyParts$,

    (errors, loading, item, formName, bodyParts,  ) => ({
    errors,
    loading,
    item,
    formName,
    bodyParts,

            
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







    

  readonly setItem = this.updater((state, item: BodyPart) => ({...state, item}))

  addNewBodyPart = this.updater((state, bodyPart: BodyPart) => ({ ...state, bodyParts: [...state.bodyParts, bodyPart] }))

  updateBodyPart = this.updater((state, bodyPart: BodyPart) => {
    return {
      ...state,
      bodyParts: state.bodyParts.map((el) => {
        if (el.id === bodyPart.id) {
          return bodyPart
        } else {
          return el
        }
      }),
    }
  })

  addBodyParts = this.updater((state, newBodyParts: any[]) => ({...state, bodyParts: state.bodyParts.concat(newBodyParts) }))
  updateBodyParts = this.updater((state, updatedBodyParts: any[]) => {
    return {
      ...state,
      bodyParts: state.bodyParts.map((bodyPart) => {
        const updated = updatedBodyParts.find((el) => el.id === bodyPart.id);
        return updated ? updated : bodyPart;
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
        return this.bodyPartService.validateBodyPartExcelData(excelData);
      })
    )
  }


  readonly loadBodyPartEffect = this.effect<string>((bodyPartId$) =>
    bodyPartId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((bodyPartId) =>
        this.data.userBodyPart({ bodyPartId }).pipe(
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



  readonly loadBodyPartsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userBodyParts({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                bodyParts: res.data.items,
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

  readonly createBodyPartEffect = this.effect<UserCreateBodyPartInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.bodyPartService.createBodyPart({...input }).pipe(
          tapResponse(
            (bodyPart: BodyPart) => {
              this.addNewBodyPart(bodyPart)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: bodyPart, loading: false, done: true }), 300);
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

    readonly updateBodyPartEffect = this.effect<UserUpdateBodyPartInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.bodyPartService.updateBodyPart(input, input.id).pipe(
              tapResponse(
                (bodyPart) => {
                  this.updateBodyPart(bodyPart)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: bodyPart, loading: false, done: true }), 300);
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
  
    readonly deleteBodyPartEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, bodyPart]) => {
          return this.data.userDeleteBodyPart({bodyPartId: bodyPart.id})
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

  readonly importExcelEffect = this.effect<UserUpdateBodyPartInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.bodyPartService.importBodyParts(data).pipe(
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

            this.addBodyParts(created);
            this.updateBodyParts(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
