
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { SpecialtyService } from './specialty.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateSpecialtyInput, UserUpdateSpecialtyInput, WebCoreDataAccessService, CorePaging, Specialty,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface SpecialtyFeatureState {
  errors?: any
  loading?: boolean
  item?: Specialty
  done: boolean,
  formName?: string

  specialties: Specialty[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebSpecialtyFeatureStore extends ComponentStore<SpecialtyFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly specialtyService: SpecialtyService
) {
    super({ 
      loading: false,
      specialties: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('specialtyId')) {
      var specialtyId = this.route.snapshot.paramMap.get('specialtyId')
      this.setFormName('specialty_edit')
    } else {
      this.setFormName('specialty_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly specialties$ = this.select((s) => s.specialties)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.specialties$,

    (errors, loading, item, formName, specialties,  ) => ({
    errors,
    loading,
    item,
    formName,
    specialties,

            
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







    

  readonly setItem = this.updater((state, item: Specialty) => ({...state, item}))

  addNewSpecialty = this.updater((state, specialty: Specialty) => ({ ...state, specialties: [...state.specialties, specialty] }))

  updateSpecialty = this.updater((state, specialty: Specialty) => {
    return {
      ...state,
      specialties: state.specialties.map((el) => {
        if (el.id === specialty.id) {
          return specialty
        } else {
          return el
        }
      }),
    }
  })

  addSpecialties = this.updater((state, newSpecialties: any[]) => ({...state, specialties: state.specialties.concat(newSpecialties) }))
  updateSpecialties = this.updater((state, updatedSpecialties: any[]) => {
    return {
      ...state,
      specialties: state.specialties.map((specialty) => {
        const updated = updatedSpecialties.find((el) => el.id === specialty.id);
        return updated ? updated : specialty;
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
        return this.specialtyService.validateSpecialtyExcelData(excelData);
      })
    )
  }


  readonly loadSpecialtyEffect = this.effect<string>((specialtyId$) =>
    specialtyId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((specialtyId) =>
        this.data.userSpecialty({ specialtyId }).pipe(
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



  readonly loadSpecialtiesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userSpecialties({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                specialties: res.data.items,
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

  readonly createSpecialtyEffect = this.effect<UserCreateSpecialtyInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.specialtyService.createSpecialty({...input }).pipe(
          tapResponse(
            (specialty: Specialty) => {
              this.addNewSpecialty(specialty)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: specialty, loading: false, done: true }), 300);
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

    readonly updateSpecialtyEffect = this.effect<UserUpdateSpecialtyInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.specialtyService.updateSpecialty(input, input.id).pipe(
              tapResponse(
                (specialty) => {
                  this.updateSpecialty(specialty)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: specialty, loading: false, done: true }), 300);
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
  
    readonly deleteSpecialtyEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, specialty]) => {
          return this.data.userDeleteSpecialty({specialtyId: specialty.id})
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

  readonly importExcelEffect = this.effect<UserUpdateSpecialtyInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.specialtyService.importSpecialties(data).pipe(
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

            this.addSpecialties(created);
            this.updateSpecialties(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
