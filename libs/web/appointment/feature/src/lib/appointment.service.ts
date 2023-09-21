
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Appointment, UserCreateAppointmentInput, UserUpdateAppointmentInput } from "@case-clinical/shared/util/sdk";
import { AppointmentBusinessProviderService } from "./business/appointment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AppointmentService extends ServiceBase {
 constructor(
  @Inject(AppointmentBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AppointmentBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AppointmentService", loggingService, serviceContext);
 }

    createAppointment(input: UserCreateAppointmentInput): Observable<Appointment> {
        return this.businessProvider.createAppointment(input);
    }

    updateAppointment(input: UserUpdateAppointmentInput, appointmentId: string): Observable<Appointment> {
        return this.businessProvider.updateAppointment(input, appointmentId);
    }

    importAppointments(appointments: UserUpdateAppointmentInput[]): Observable<boolean> {
        return this.businessProvider.importAppointments(appointments);
    }
}

