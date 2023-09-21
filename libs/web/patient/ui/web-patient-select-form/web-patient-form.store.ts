
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Patient, UserCreatePatientInput, Ethnicity,Gender,Language } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PatientFormState {
  errors?: any
  loading?: boolean
  item?: Patient,
 ethnicities?: Ethnicity[],
 genders?: Gender[],
 languages?: Language[]
  searchTerm?: string
}

@Injectable()
export class WebPatientFormStore extends ComponentStore<PatientFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly ethnicities$ = this.select((s) => s.ethnicities || [])
  readonly genders$ = this.select((s) => s.genders || [])
  readonly languages$ = this.select((s) => s.languages || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.ethnicities$,this.genders$,this.languages$,
    (errors, loading, item, ethnicities,genders,languages ) => ({
    errors,
    loading,
    item,
ethnicities,genders,languages
  }),
{debounce: true})



  readonly filterEthnicities = (term) => 
        this.data.userSelectEthnicities({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let ethnicities = res.data.items;
              this.patchState({ethnicities})
              return ethnicities
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


  readonly filterGenders = (term) => 
        this.data.userSelectGenders({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let genders = res.data.items;
              this.patchState({genders})
              return genders
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


  readonly filterLanguages = (term) => 
        this.data.userSelectLanguages({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let languages = res.data.items;
              this.patchState({languages})
              return languages
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



  readonly createPatientEffect = this.effect<UserCreatePatientInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePatient({ input }).pipe(
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


  readonly addEthnicity = this.updater((state, ethnicity: Ethnicity) => ({
    ...state, ethnicities: state.ethnicities.concat(ethnicity)
  }))


  readonly addGender = this.updater((state, gender: Gender) => ({
    ...state, genders: state.genders.concat(gender)
  }))


  readonly addLanguage = this.updater((state, language: Language) => ({
    ...state, languages: state.languages.concat(language)
  }))

}
