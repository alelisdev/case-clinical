
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateCasePreInjuryInput, WebCoreDataAccessService, CasePreInjury, LegalCase } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CasePreInjuryService } from '@case-clinical/web/case-pre-injury/shared'

export interface CasePreInjuryCreateState {
  errors?: any
  loading?: boolean
  item?: CasePreInjury,
 legalCases?: LegalCase[]
  searchTerm?: string
}

@Injectable()
export class WebCasePreInjuryCreateStore extends ComponentStore<CasePreInjuryCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly casePreInjuryService: CasePreInjuryService
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

    

  readonly createCasePreInjuryEffect = this.effect<UserCreateCasePreInjuryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.casePreInjuryService.createCasePreInjury({...input}).pipe(
          tapResponse(
            (casePreInjury: CasePreInjury) => {
              this.patchState({ item: casePreInjury, loading: false })
              return this.router.navigate(['..', casePreInjury?.id], {relativeTo: this.route})
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
