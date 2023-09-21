
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateCasePreAccidentInput, WebCoreDataAccessService, CasePreAccident, LegalCase } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CasePreAccidentService } from '@case-clinical/web/case-pre-accident/shared'

export interface CasePreAccidentCreateState {
  errors?: any
  loading?: boolean
  item?: CasePreAccident,
 legalCases?: LegalCase[]
  searchTerm?: string
}

@Injectable()
export class WebCasePreAccidentCreateStore extends ComponentStore<CasePreAccidentCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly casePreAccidentService: CasePreAccidentService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.legalCases$,
    (errors, loading, item, legalCases ) => ({
    errors,
    loading,
    item,
legalCases
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



  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))

    

  readonly createCasePreAccidentEffect = this.effect<UserCreateCasePreAccidentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.casePreAccidentService.createCasePreAccident({...input}).pipe(
          tapResponse(
            (casePreAccident: CasePreAccident) => {
              this.patchState({ item: casePreAccident, loading: false })
              return this.router.navigate(['..', casePreAccident?.id], {relativeTo: this.route})
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
