
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateRequiredFieldInput, WebCoreDataAccessService, RequiredField, AccidentType,MedLevel } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { RequiredFieldService } from '@case-clinical/web/required-field/shared'

export interface RequiredFieldEditState {
  errors?: any
  loading?: boolean
  item?: RequiredField,
 accidentTypes?: AccidentType[],
 medLevels?: MedLevel[]
  searchTerm?: string
}

@Injectable()
export class WebRequiredFieldEditStore extends ComponentStore<RequiredFieldEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly requiredFieldService: RequiredFieldService
) {
    super({ loading: false })
    
    this.loadRequiredFieldEffect(route.params.pipe(map((route) => route?.requiredFieldId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly accidentTypes$ = this.select((s) => s.accidentTypes || [])
  readonly medLevels$ = this.select((s) => s.medLevels || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.accidentTypes$,this.medLevels$,
    (errors, loading, item, accidentTypes,medLevels ) => ({
    errors,
    loading,
    item,
accidentTypes,medLevels
  }),
{debounce: true})



  readonly filterAccidentTypes = (term) => 
        this.data.userSelectAccidentTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let accidentTypes = res.data.items;
              this.patchState({accidentTypes})
              return accidentTypes
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


  readonly filterMedLevels = (term) => 
        this.data.userSelectMedLevels({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let medLevels = res.data.items;
              this.patchState({medLevels})
              return medLevels
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



  readonly addAccidentType = this.updater((state, accidentType: AccidentType) => ({
    ...state, accidentTypes: state.accidentTypes.concat(accidentType)
  }))


  readonly addMedLevel = this.updater((state, medLevel: MedLevel) => ({
    ...state, medLevels: state.medLevels.concat(medLevel)
  }))

  
  readonly loadRequiredFieldEffect = this.effect<string>((requiredFieldId$) =>
     requiredFieldId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((requiredFieldId) =>
        this.data.userRequiredField({requiredFieldId}).pipe(
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

  readonly updateRequiredFieldEffect = this.effect<UserUpdateRequiredFieldInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.requiredFieldService.updateRequiredField(input, item?.id).pipe(
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
