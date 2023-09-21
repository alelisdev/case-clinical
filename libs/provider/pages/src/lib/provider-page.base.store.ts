/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentStore } from '@ngrx/component-store';
import { Injectable, Injector } from "@angular/core";
import { ProviderPortalStore } from './provider-portal.store';
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';
import { Appointment } from '@case-clinical/web/core/data-access';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProviderBaseState {
}

@Injectable()
export abstract class ProviderBaseStore<Type extends ProviderBaseState> extends ComponentStore<Type> {
  private providerPortalStore: ProviderPortalStore

  public appointmentViewModalController?: FormlyModalController;
  private requestMoreVisitsModalController?: FormlyModalController;
  public uploadSubpoenaModalController?: FormlyModalController;
  public addAppointmentModalController?: FormlyModalController;
  public uploadMiscellaneousModalController?: FormlyModalController;

  constructor(
    injector: Injector,
  ) {
    super()
    this.providerPortalStore = injector.get(ProviderPortalStore);
    this.selectedProviderId$ = this.providerPortalStore.selectedProviderId$;
    this.selectedProviderLocationId$ = this.providerPortalStore.selectedProviderLocationId$;

    this.providerOptions$ = this.providerPortalStore.providerOptions$;
    this.providers$ = this.providerPortalStore.providers$;

    this.vendor$ = this.providerPortalStore.vendor$;

    this.setState(this.getInitialState())

    this.user$ = this.select(this.providerPortalStore.user$, (user:any) =>
    {
      let latitude = 0
      let longitude = 0
      if (user?.vendor?.latitude) latitude = user.vendor?.latitude
      if(user?.vendor?.longitude) longitude = user.vendor?.longitude
      return {
        ...user,
        latitude:latitude,
        longitude:longitude
      }
    });
  }

  abstract getInitialState(): Type;
  readonly selectedProviderId$;
  readonly selectedProviderLocationId$;

  readonly providerOptions$

  readonly user$;
  readonly vendor$;
  readonly providers$;

  // Notifies that provider id changed, this is called on the left sidebar of provider layout
  providerIdDidChange(providerId: string) {
    // Never update this function
    // Just override this function to implement page specific refresh according to the provider change
  }

  providerLocationIdDidChange(providerLocationId: string) {
    // Never update this function
    // Just override this function to implement page specific refresh according to the provider change
  }

  setSelectedProviderId(providerId: string) {
    this.providerPortalStore.setSelectedProviderId(providerId);
    this.providerIdDidChange(providerId);
  }

  setSelectedProviderLocationId(providerLocationId: string) {
    this.providerPortalStore.setSelectedProviderLocationId(providerLocationId);
    this.providerLocationIdDidChange(providerLocationId);
  }

  setAppointmentViewModalController(controller: FormlyModalController) {
    console.log('setAppointmentViewModalController')
    this.appointmentViewModalController = controller;
  }

  setRequestsMoreVisitsModalController(controller: FormlyModalController) {
    this.requestMoreVisitsModalController = controller;
  }

  openAppointmentViewModal(appointment: Appointment) {
    this.appointmentViewModalController?.open(appointment, {}, {})
  }

  openRequestsMoreVisitsModal(appointment: Appointment) {
    this.requestMoreVisitsModalController?.open(appointment, {}, {})
  }

  setUploadModalCtrlForSubpoena(controller: FormlyModalController) { 
    this.uploadSubpoenaModalController = controller;
  }

  setUploadModalCtrlForMiscellaneous(controller: FormlyModalController) { 
    this.uploadMiscellaneousModalController = controller;
  }

  setAddAppointmentModalController(controller: FormlyModalController) {
    this.addAppointmentModalController = controller;
  }

  openUploadModalCtrlForSubpoena() {
    this.uploadSubpoenaModalController?.open({}, {}, {})
  }

  openUploadModalCtrlForMiscellaneous() {
    this.uploadMiscellaneousModalController?.open({}, {}, {})
  }

  openAddAppointmentModal() {
    this.addAppointmentModalController?.open({}, {}, {})
  }
 
}
