import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormService } from '@case-clinical/web/ui/form';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { DatePipe } from '@angular/common';
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared';
import { AccountUpdatePasswordInput, Appointment } from '@case-clinical/shared/util/sdk';
import { ActivatedRoute, Router } from '@angular/router'
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import * as moment from 'moment';
export interface State  extends PatientBaseState{
    loading: boolean,
    query: string,
}

@Injectable()
export class ChangePasswordStore extends PatientBaseStore<State> {
    locationAvalabilityId = "";
    constructor(
        private router:Router,
        private formService: FormService,
        private loading: FuseLoadingService,
        private toast: WebUiToastService,
        private readonly route: ActivatedRoute,
        private datePipe: DatePipe,
        private data: WebCoreDataAccessService,
        injector: Injector
        ) {
        super(injector)
    }

    loading$ = this.select(s => s.loading)


    updatePasswordEffect = this.effect<any>(formData$ => formData$.pipe(
        tap((formData) => { this.patchState({ loading: true }) }),
        switchMap((formData) => {
            const sendData:AccountUpdatePasswordInput = {
                currentPassword: formData?.oldPassword,
                password: formData?.newPassword,
                verified: formData?.passConfirm,
            };
          return this.data.accountUpdatePassword({input: sendData}).pipe(
            tapResponse(
              (data) => {
                this.toast.success('Successfully updated Password', { duration: 3000 })
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                this.toast.error("Failed to update Password", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        }
        )
      ));

    vm$ = this.select(
        this.loading$,
        this.user$,
        this.membership$,
        (
            loading,
            user,
            membership,
        ) =>{
            return  {
                loading,
                user,
                membership,
            }
        }
    );

    override getInitialState(): State {
        return {
          query:"",
          loading:false
        }
      }


}
