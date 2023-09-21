
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, RequiredField, UserCreateRequiredFieldInput, AccidentType,MedLevel } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RequiredFieldFormState {
  errors?: any
  loading?: boolean
  item?: RequiredField,
 accidentTypes?: AccidentType[],
 medLevels?: MedLevel[]
  searchTerm?: string
}

@Injectable()
export class WebRequiredFieldFormStore extends ComponentStore<RequiredFieldFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
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



  readonly createRequiredFieldEffect = this.effect<UserCreateRequiredFieldInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateRequiredField({ input }).pipe(
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


  readonly addAccidentType = this.updater((state, accidentType: AccidentType) => ({
    ...state, accidentTypes: state.accidentTypes.concat(accidentType)
  }))


  readonly addMedLevel = this.updater((state, medLevel: MedLevel) => ({
    ...state, medLevels: state.medLevels.concat(medLevel)
  }))

}
