
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePatientInput, WebCoreDataAccessService, Patient, Ethnicity,Gender,Language } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PatientService } from '@case-clinical/web/patient/shared'

export interface PatientCreateState {
  errors?: any
  loading?: boolean
  item?: Patient,
 ethnicities?: Ethnicity[],
 genders?: Gender[],
 languages?: Language[]
  searchTerm?: string
}

@Injectable()
export class WebPatientCreateStore extends ComponentStore<PatientCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly patientService: PatientService
) {
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



  readonly addEthnicity = this.updater((state, ethnicity: Ethnicity) => ({
    ...state, ethnicities: state.ethnicities.concat(ethnicity)
  }))


  readonly addGender = this.updater((state, gender: Gender) => ({
    ...state, genders: state.genders.concat(gender)
  }))


  readonly addLanguage = this.updater((state, language: Language) => ({
    ...state, languages: state.languages.concat(language)
  }))

    

  readonly createPatientEffect = this.effect<UserCreatePatientInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.patientService.createPatient({...input}).pipe(
          tapResponse(
            (patient: Patient) => {
              this.patchState({ item: patient, loading: false })
              return this.router.navigate(['..', patient?.id], {relativeTo: this.route})
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
