
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Appointment, UserCreateAppointmentInput, UserUpdateAppointmentInput, UpdateResult, Location, Patient, ClinicalProvider, LegalCase, AppointmentStatus } from "@case-clinical/shared/util/sdk";
import { AppointmentBusinessProviderService } from "./appointment.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAppointment(filteredObj);
    }

    updateAppointment(input: UserUpdateAppointmentInput, appointmentId: string): Observable<Appointment> {
        return this.businessProvider.updateAppointment(input, appointmentId);
    }

    checkInAppointment(appointment: Appointment): Observable<Appointment> {
        return this.businessProvider.checkInAppointment(appointment);
    }

    requestRescheduleAppointment(appointment: Appointment): Observable<Appointment> {
        return this.businessProvider.requestRescheduleAppointment(appointment);
    }
    rescheduleAppointment(appointment: Appointment, rescheduleDate: Date): Observable<Appointment> {
        return this.businessProvider.rescheduleAppointment(appointment, rescheduleDate);
    }

    confirmAppointment(appointment: Appointment): Observable<Appointment> {
        return this.businessProvider.confirmAppointment(appointment);
    }

    cancelAppointment(appointment: Appointment): Observable<Appointment> {
        return this.businessProvider.cancelAppointment(appointment);
    }

    hideAppointment(appointment: Appointment): Observable<Appointment> {
        return this.businessProvider.hideAppointment(appointment);
    }

    importAppointments(appointments: UserUpdateAppointmentInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAppointments(appointments);
    }

    validateAppointmentExcelData(excelData: any[], locations: Location[], patients: Patient[], clinicalProviders: ClinicalProvider[], legalCases: LegalCase[], appointmentStatuses: AppointmentStatus[]) {
      return this.businessProvider.validateAppointmentExcelData(excelData, locations, patients, clinicalProviders, legalCases, appointmentStatuses);
    }
}

