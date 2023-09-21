
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Insurance, UserCreateInsuranceInput, LegalCase,InsuranceType,InsuranceSector } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface InsuranceFormState {
  errors?: any
  loading?: boolean
  item?: Insurance,
 legalCases?: LegalCase[],
 insuranceTypes?: InsuranceType[],
 insuranceSectors?: InsuranceSector[]
  searchTerm?: string
}

@Injectable()
export class WebInsuranceFormStore extends ComponentStore<InsuranceFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly insuranceTypes$ = this.select((s) => s.insuranceTypes || [])
  readonly insuranceSectors$ = this.select((s) => s.insuranceSectors || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.legalCases$,this.insuranceTypes$,this.insuranceSectors$,
    (errors, loading, item, legalCases,insuranceTypes,insuranceSectors ) => ({
    errors,
    loading,
    item,
legalCases,insuranceTypes,insuranceSectors
  }),
{debounce: true})



  readonly filterLegalCases = (term) => 
        this.data.userLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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


  readonly filterInsuranceTypes = (term) => 
        this.data.userSelectInsuranceTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let insuranceTypes = res.data.items;
              this.patchState({insuranceTypes})
              return insuranceTypes
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


  readonly filterInsuranceSectors = (term) => 
        this.data.userSelectInsuranceSectors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let insuranceSectors = res.data.items;
              this.patchState({insuranceSectors})
              return insuranceSectors
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



  readonly createInsuranceEffect = this.effect<UserCreateInsuranceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateInsurance({ input }).pipe(
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


  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addInsuranceType = this.updater((state, insuranceType: InsuranceType) => ({
    ...state, insuranceTypes: state.insuranceTypes.concat(insuranceType)
  }))


  readonly addInsuranceSector = this.updater((state, insuranceSector: InsuranceSector) => ({
    ...state, insuranceSectors: state.insuranceSectors.concat(insuranceSector)
  }))

}
