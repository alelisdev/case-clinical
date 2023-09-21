import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormService } from '@case-clinical/web/ui/form';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { DatePipe } from '@angular/common';
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared';
import { Appointment } from '@case-clinical/shared/util/sdk';
import { ActivatedRoute, Router } from '@angular/router'
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import * as moment from 'moment';
export interface State  extends PatientBaseState{
    loading: boolean,
    query: string,
}

@Injectable()
export class CheckOutStore extends PatientBaseStore<State> {
    private subscriber:any;
    locationAvalabilityId = "";
    constructor(
        private router:Router,
        private readonly route: ActivatedRoute,
        private appointmentFeatureStore: WebAppointmentFeatureStore,
        private clinicalProviderLocationAvailabilityStore:WebClinicalProviderLocationAvailabilityFeatureStore,
        private clinicalProviderStore: WebClinicalProviderFeatureStore,
        injector: Injector
        ) {
        super(injector)
        if(this.route.snapshot.paramMap.has("locationAvalabilityId"))
        {
            this.locationAvalabilityId = this.route.snapshot.paramMap.get("locationAvalabilityId") ?? '';
            this.clinicalProviderLocationAvailabilityStore.loadClinicalProviderLocationAvailabilityEffect(this.locationAvalabilityId);
        }

        this.bookingItem$.subscribe((bookItem)=>{
            console.log(bookItem);
            this.clinicalProviderLocationAvailabilityStore.loadClinicalProviderLocationAvailabilityEffect(bookItem.id);
        });

        this.patientPortalStore.clinicalProviderId$.subscribe((id) => {
            this.clinicalProviderStore.setClinicalProviderId(id??"");
            this.clinicalProviderStore.loadClinicalProviderEffect(id??"");
        });
    }

    loading$ = this.select(s => s.loading)
    providerLocationAvailability$ = this.clinicalProviderLocationAvailabilityStore.item$;
    doctor$ = this.clinicalProviderStore.item$;

    vm$ = this.select(
        this.loading$,
        this.providerLocationAvailability$,
        this.user$,
        this.bookingItem$,
        this.doctor$,
        this.membership$,
        (
            loading,
            providerLocationAvailabilityItem,
            user,
            bookingItem: any,
            doctor,
            membership,
        ) =>{
            const { id, name, profilePictureId } = providerLocationAvailabilityItem?.clinicalProviderLocation?.clinicalProvider ?? {};
            const hours = this.calculateTimeDifference(providerLocationAvailabilityItem?.startTime ?? "00:00", providerLocationAvailabilityItem?.endTime ?? "00:00" );
            const totalFee = hours * (doctor?.hourlyRate ?? 0);
            return  {
                loading,
                membership,
                providerLocationAvailabilityItem,
                user,
                dateAndTime: moment(bookingItem.eventStartTime).toDate(),
                date: moment(bookingItem.eventStartTime).format("MM/DD/yyyy"),
                time: `${providerLocationAvailabilityItem?.startTime} - ${providerLocationAvailabilityItem?.endTime}`,
                // consultingFee: 14,
                hours: hours,
                location: providerLocationAvailabilityItem?.clinicalProviderLocation?.location?.name,
                totalFee: totalFee,
                doctorName: name,
                doctorId: id,
                doctorRating: doctor?.rating,
                doctorhourlyRate: doctor?.hourlyRate,
                profilePictureId:profilePictureId
            }
        }
    );

    confirmAndPay(appointmentdata:any){
        if (!this.subscriber) {
            const newAppointment:Appointment = appointmentdata as Appointment;
            this.appointmentFeatureStore.createAppointmentEffect(newAppointment);
            this.subscriber = this.appointmentFeatureStore.actionResult$.subscribe(({ done, item }) => {
                if (done) {
                    this.router.navigate([`/booking/success/${item?.id}`]);
                    this.subscriber.unsubscribe();
                    this.subscriber = null;
                }
            });
        }
    }

    override getInitialState(): State {
        return {
          query:"",
          loading:false
        }
      }

    calculateTimeDifference(start: string, end: string) {
    // Convert time strings to Date objects
        let startStr = start;
        let endStr = end;
        let  index = startStr.indexOf(":");
        if(startStr.substring(0,index).length == 1)
            startStr = "0" + startStr; 

        index = endStr.indexOf(":");
        if(endStr.substring(0,index).length == 1)
             endStr = "0" + endStr; 
        const startDate = new Date(`1970-01-01T${startStr}`); // Add T between date and time
        const endDate = new Date(`1970-01-01T${endStr}`); // Add T between date and time
        
        // Get timestamps in milliseconds
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        
        // Calculate the difference in hours
        const differenceInHours = (endTime - startTime) * 1.0 / (1000 * 60 * 60);
        
        return differenceInHours;
    }

}
