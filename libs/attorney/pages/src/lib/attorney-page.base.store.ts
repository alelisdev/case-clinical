/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentStore } from '@ngrx/component-store';
import { Injectable, Injector } from "@angular/core";
import { AttorneyPortalStore } from './attorney-portal.store';
import { of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AttorneyBaseState {
}

@Injectable()
export abstract class AttorneyBaseStore<Type extends AttorneyBaseState> extends ComponentStore<Type> {
  private attorneyPortalStore: AttorneyPortalStore

  constructor(
    injector: Injector,
  ) {
    super()
    this.attorneyPortalStore = injector.get(AttorneyPortalStore);
    this.selectedAttorneyId$ = this.attorneyPortalStore.selectedAttorneyId$;
    this.attorneyOptions$ = this.attorneyPortalStore.attorneyOptions$;
    this.firmId$ = this.attorneyPortalStore.firmId$;
    this.attorneyId$ = this.attorneyPortalStore.attorneyId;
    this.setState(this.getInitialState())

    this.user$ = this.select(this.attorneyPortalStore.user$, (user:any) =>
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
  readonly selectedAttorneyId$;
  readonly attorneyOptions$;
  readonly firmId$;
  readonly user$;
  readonly attorneyId$;

  // Notifies that attorney id changed, this is called on the left sidebar of attorney layout
  attorneyIdDidChange(attorneyId: string) {
    // Never update this function
    // Just override this function to implement page specific refresh according to the attorney change
  }

  setSelectedAttorneyId(attorneyId: string) {
    this.attorneyPortalStore.setSelectedAttorneyId(attorneyId);
    this.attorneyIdDidChange(attorneyId);
  }
}
