
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, RequiredField, UserCreateRequiredFieldInput, MedLevel } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RequiredFieldFormState {
  errors?: any
  loading?: boolean
  item?: RequiredField,
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
  readonly medLevels$ = this.select((s) => s.medLevels || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.medLevels$,
    (errors, loading, item, medLevels ) => ({
    errors,
    loading,
    item,
medLevels
  }),
{debounce: true})



  readonly filterMedLevels = (term) => 
        this.data.userMedLevels({input: { name: term}}).pipe(
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


  readonly addMedLevel = this.updater((state, medLevel: MedLevel) => ({
    ...state, medLevels: state.medLevels.concat(medLevel)
  }))

}
