
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, ContactSetting, UserCreateContactSettingInput, Integration } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactSettingFormState {
  errors?: any
  loading?: boolean
  item?: ContactSetting,
 integrations?: Integration[]
  searchTerm?: string
}

@Injectable()
export class WebContactSettingFormStore extends ComponentStore<ContactSettingFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly integrations$ = this.select((s) => s.integrations || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.integrations$,
    (errors, loading, item, integrations ) => ({
    errors,
    loading,
    item,
integrations
  }),
{debounce: true})



  readonly filterIntegrations = (term) => 
        this.data.userSelectIntegrations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let integrations = res.data.items;
              this.patchState({integrations})
              return integrations
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



  readonly createContactSettingEffect = this.effect<UserCreateContactSettingInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateContactSetting({ input }).pipe(
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


  readonly addIntegration = this.updater((state, integration: Integration) => ({
    ...state, integrations: state.integrations.concat(integration)
  }))

}
