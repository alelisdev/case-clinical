
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateInsuranceInput, WebCoreDataAccessService, Insurance, LegalCase,InsuranceType,InsuranceSector } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { InsuranceService } from '@case-clinical/web/insurance/shared'

export interface InsuranceEditState {
  errors?: any
  loading?: boolean
  item?: Insurance,
 legalCases?: LegalCase[],
 insuranceTypes?: InsuranceType[],
 insuranceSectors?: InsuranceSector[]
  searchTerm?: string
}

@Injectable()
export class WebInsuranceEditStore extends ComponentStore<InsuranceEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceService: InsuranceService
) {
    super({ loading: false })
    
    this.loadInsuranceEffect(route.params.pipe(map((route) => route?.insuranceId)))
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

  
  readonly loadInsuranceEffect = this.effect<string>((insuranceId$) =>
     insuranceId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((insuranceId) =>
        this.data.userInsurance({insuranceId}).pipe(
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

  readonly updateInsuranceEffect = this.effect<UserUpdateInsuranceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.insuranceService.updateInsurance(input, item?.id).pipe(
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
