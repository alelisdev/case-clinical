
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { AppointmentStatus, UserCreateAppointmentStatusInput, UserUpdateAppointmentStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { AppointmentStatusBusinessProviderService } from "./appointment-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class AppointmentStatusService extends ServiceBase {
 constructor(
  @Inject(AppointmentStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: AppointmentStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("AppointmentStatusService", loggingService, serviceContext);
 }

    createAppointmentStatus(input: UserCreateAppointmentStatusInput): Observable<AppointmentStatus> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createAppointmentStatus(filteredObj);
    }

    updateAppointmentStatus(input: UserUpdateAppointmentStatusInput, appointmentStatusId: string): Observable<AppointmentStatus> {
        return this.businessProvider.updateAppointmentStatus(input, appointmentStatusId);
    }

    importAppointmentStatuses(appointmentStatuses: UserUpdateAppointmentStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importAppointmentStatuses(appointmentStatuses);
    }

    validateAppointmentStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateAppointmentStatusExcelData(excelData );
    }
}

