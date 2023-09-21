
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateInsuranceInput, WebCoreDataAccessService, Insurance, LegalCase,InsuranceType,InsuranceSector } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { InsuranceService } from '@case-clinical/web/insurance/shared'

export interface InsuranceCreateState {
  errors?: any
  loading?: boolean
  item?: Insurance,
 legalCases?: LegalCase[],
 insuranceTypes?: InsuranceType[],
 insuranceSectors?: InsuranceSector[]
  searchTerm?: string
}

@Injectable()
export class WebInsuranceCreateStore extends ComponentStore<InsuranceCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceService: InsuranceService
) {
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
        this.data.userSelectLegalCases({input: { name: term}}).pipe(
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



  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addInsuranceType = this.updater((state, insuranceType: InsuranceType) => ({
    ...state, insuranceTypes: state.insuranceTypes.concat(insuranceType)
  }))


  readonly addInsuranceSector = this.updater((state, insuranceSector: InsuranceSector) => ({
    ...state, insuranceSectors: state.insuranceSectors.concat(insuranceSector)
  }))

    

  readonly createInsuranceEffect = this.effect<UserCreateInsuranceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.insuranceService.createInsurance({...input}).pipe(
          tapResponse(
            (insurance: Insurance) => {
              this.patchState({ item: insurance, loading: false })
              return this.router.navigate(['..', insurance?.id], {relativeTo: this.route})
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
