import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { EthnicityService } from './ethnicity.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom } from 'rxjs/operators'

import { UserCreateEthnicityInput, WebCoreDataAccessService, Ethnicity, UserUpdateEthnicityInput } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface EthnicityFeatureState {
  errors?: any
  loading?: boolean
  searchTerm?: string,
  ethnicities: Ethnicity[],

  item?: Ethnicity,
  done: boolean,
}

@Injectable()
export class WebEthnicityFeatureStore extends ComponentStore<EthnicityFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly ethnicityService: EthnicityService
  ) {
    super({
      loading: false,
      ethnicities: [],
      done: false,
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly done$ = this.select((s) => s.done)
  readonly ethnicities$ = this.select((s) => s.ethnicities)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({
      item,
      done,
    }),
    { debounce: true })

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$,
    (errors, loading, item,) => ({
      errors,
      loading,
      item,
    }),
    { debounce: true })

  initialize = this.updater((state) => ({ ...state, item: null, done: false }))

  addNewEthnicity = this.updater((state, ethnicity: Ethnicity) => ({ ...state, ethnicities: [...state.ethnicities, ethnicity] }))

  updateEthnicity = this.updater((state, ethnicity: Ethnicity) => {
    return {
      ...state,
      ethnicities: state.ethnicities.map((el) => {
        if (el.id === ethnicity.id) {
          return ethnicity
        } else {
          return el
        }
      }),
    }
  })

  readonly loadEthnicityEffect = this.effect<string>((ethnicityId$) =>
    ethnicityId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((ethnicityId) =>
        this.data.userEthnicity({ ethnicityId }).pipe(
          tapResponse(
            (res) => {
              this.patchState({
                item: res.data.item,
                errors: res.errors,
                loading: false,
              });
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

  loadEthnicitiesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userEthnicities({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                ethnicities: data.data.items,
              })
            },
            (error) => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )

  readonly updateEthnicityEffect = this.effect<UserUpdateEthnicityInput>((input$) =>
    input$.pipe(
      tap((input) => {
        console.log({ input })
        this.patchState({ loading: true })
      }),
      switchMap((input) =>
        this.ethnicityService.updateEthnicity(input, input.id).pipe(
          tapResponse(
            (ethnicity) => {
              this.updateEthnicity(ethnicity)
              this.toast.success('Changed Successfully')
              this.patchState({ done: true, item: ethnicity });
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

  readonly createEthnicityEffect = this.effect<UserCreateEthnicityInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.ethnicityService.createEthnicity({ ...input }).pipe(
          tapResponse(
            (ethnicity: Ethnicity) => {
              this.addNewEthnicity(ethnicity)
              this.toast.success('Created Successfully!');
              this.patchState({ item: ethnicity, loading: false, done: true })
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
