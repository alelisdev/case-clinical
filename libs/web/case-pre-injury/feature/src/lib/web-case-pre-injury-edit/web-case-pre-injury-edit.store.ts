
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateCasePreInjuryInput, WebCoreDataAccessService, CasePreInjury, LegalCase } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CasePreInjuryService } from '@case-clinical/web/case-pre-injury/shared'

export interface CasePreInjuryEditState {
  errors?: any
  loading?: boolean
  item?: CasePreInjury,
 legalCases?: LegalCase[]
  searchTerm?: string
}

@Injectable()
export class WebCasePreInjuryEditStore extends ComponentStore<CasePreInjuryEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly casePreInjuryService: CasePreInjuryService
) {
    super({ loading: false })
    
    this.loadCasePreInjuryEffect(route.params.pipe(map((route) => route?.casePreInjuryId)))
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

  
  readonly loadCasePreInjuryEffect = this.effect<string>((casePreInjuryId$) =>
     casePreInjuryId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((casePreInjuryId) =>
        this.data.userCasePreInjury({casePreInjuryId}).pipe(
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

  readonly updateCasePreInjuryEffect = this.effect<UserUpdateCasePreInjuryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.casePreInjuryService.updateCasePreInjury(input, item?.id).pipe(
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
