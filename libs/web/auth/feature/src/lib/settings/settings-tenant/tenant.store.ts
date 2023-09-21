import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { Price, PriceSubscription, Tenant } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { SettingsService } from '../business-logic/settings.service';
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface TenantState {
  loading: boolean,
  query: string,
  selectedTenant?: Tenant,
  tenants: any[],
}

@Injectable()
export class TenantStore extends ComponentStore<TenantState> {
  constructor(private formService: FormService, private loading: FuseLoadingService, private toast: WebUiToastService, private service: SettingsService) {
    super({
      query: "",
      loading: false,
      tenants: [],
      selectedTenant: {}
    })
  }

  loading$ = this.select(s => s.loading)
  tenants$ = this.select(s => s.tenants)
  selectedTenant$ = this.select(s => s.selectedTenant)

  vm$ = this.select(
    this.loading$,
    this.selectedTenant$,
    this.tenants$,
    (
      loading,
      selectedTenant,
      tenants,
    ) => ({
      loading,
      selectedTenant,
      tenants
    })
  )

  selectUser = this.updater((state, tenant: Tenant) => ({ ...state, selectedTenant: tenant }))

  loadTenantsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(() => this.service.loadTenants().pipe(
      tapResponse(
        (data) => {
          console.log(data)
            this.patchState({
              loading: false,
              tenants: data,
              selectedTenant: data[0]
            })
          },
          (error) => {
            this.patchState({
              loading: false
            })
          }
        )
      )
    )
  ))

  updateTenantEffect = this.effect<any>(input$ => input$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedTenant$, this.tenants$),
    switchMap(([{logo, name, email, phone, country}, selectedTenant, tenants]) => this.service.updateTenant(selectedTenant.id, logo, { name, email, phone, country }).pipe(
      tapResponse(
        (data) => {
          this.toast.success('Successfully updated tenant', { duration: 3000 })
          let updatedTenantIndex = tenants.findIndex((tenant) => tenant.id === selectedTenant.id)
          tenants[updatedTenantIndex] = data;
          this.patchState({
            loading: false,
            tenants,
            selectedTenant: data
          })
        },
          (error: any) => {
            this.formService.setErrors(error.Data)
            this.toast.error(error.Message, { duration: 3000 })
            this.patchState({
              loading: false
            })
          }
        )
      )
    )
  ))
}
