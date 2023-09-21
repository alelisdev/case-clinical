
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateRequiredFieldInput, WebCoreDataAccessService, RequiredField, AccidentType,MedLevel } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { RequiredFieldService } from '@case-clinical/web/required-field/shared'

export interface RequiredFieldCreateState {
  errors?: any
  loading?: boolean
  item?: RequiredField,
 accidentTypes?: AccidentType[],
 medLevels?: MedLevel[]
  searchTerm?: string
}

@Injectable()
export class WebRequiredFieldCreateStore extends ComponentStore<RequiredFieldCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly requiredFieldService: RequiredFieldService
) {
    super({ loading: false })
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

    

  readonly createRequiredFieldEffect = this.effect<UserCreateRequiredFieldInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.requiredFieldService.createRequiredField({...input}).pipe(
          tapResponse(
            (requiredField: RequiredField) => {
              this.patchState({ item: requiredField, loading: false })
              return this.router.navigate(['..', requiredField?.id], {relativeTo: this.route})
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
