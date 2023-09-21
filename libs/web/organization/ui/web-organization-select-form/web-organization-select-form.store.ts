
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateOrganizationInput,
  UserUpdateOrganizationInput,
  Organization,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface OrganizationFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  organizations: Organization[]
}

@Injectable()
export class WebOrganizationSelectFormStore extends ComponentStore<OrganizationFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      organizations: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly organizations$ = this.select((s) => s.organizations)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.organizations$,
    (errors, loading, organizations) => ({
      errors,
      loading,
      organizations
    }),
    { debounce: true },
  )

  addNewOrganization = this.updater((state, organization: Organization) => ({ organizations: [...state.organizations, organization] }))

  updateOrganization = this.updater((state, organization: Organization) => {
    return {
      ...state,
      organizations: state.organizations.map((el) => {
        if (el.id === organization.id) {
          return organization
        } else {
          return el
        }
      }),
    }
  })

  readonly createOrganizationEffect = this.effect<{ input: UserCreateOrganizationInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateOrganization({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewOrganization(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
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

  readonly updateOrganizationEffect = this.effect<{ input: UserUpdateOrganizationInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateOrganization({ organizationId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateOrganization(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
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

  loadOrganizationsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userOrganizations({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                organizations: data.data.items,
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
}

