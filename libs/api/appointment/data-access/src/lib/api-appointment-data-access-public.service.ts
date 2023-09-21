
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAppointmentInput } from './dto/user-list-appointment.input'

@Injectable()
export class ApiAppointmentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAppointments(input?: UserListAppointmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.appointment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            locationId: input.locationId,
miscellaneousId: input.miscellaneousId,
medicalReportId: input.medicalReportId,
billId: input.billId,
imagingId: input.imagingId,
patientId: input.patientId,
clinicalProviderId: input.clinicalProviderId,
legalCaseId: input.legalCaseId,
appointmentStatusId: input.appointmentStatusId,
assignedToId: input.assignedToId,
medicalRecordStatusId: input.medicalRecordStatusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {location: true, miscellaneous: true, medicalReport: true, bill: true, imaging: true, patient: true, clinicalProvider: true, legalCase: true, appointmentStatus: true, assignedTo: true, medicalRecordStatus: true}
    })
  }

  async publicSelectAppointments(input?: UserListAppointmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.appointment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            locationId: input.locationId,
miscellaneousId: input.miscellaneousId,
medicalReportId: input.medicalReportId,
billId: input.billId,
imagingId: input.imagingId,
patientId: input.patientId,
clinicalProviderId: input.clinicalProviderId,
legalCaseId: input.legalCaseId,
appointmentStatusId: input.appointmentStatusId,
assignedToId: input.assignedToId,
medicalRecordStatusId: input.medicalRecordStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountAppointments(input?: UserListAppointmentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.appointment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            locationId: input.locationId,
miscellaneousId: input.miscellaneousId,
medicalReportId: input.medicalReportId,
billId: input.billId,
imagingId: input.imagingId,
patientId: input.patientId,
clinicalProviderId: input.clinicalProviderId,
legalCaseId: input.legalCaseId,
appointmentStatusId: input.appointmentStatusId,
assignedToId: input.assignedToId,
medicalRecordStatusId: input.medicalRecordStatusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicAppointment(appointmentId) {

    return this.data.appointment.findUnique({ where: { id: appointmentId } , include: {location: true, miscellaneous: true, medicalReport: true, bill: true, imaging: true, patient: true, clinicalProvider: true, legalCase: true, appointmentStatus: true, assignedTo: true, medicalRecordStatus: true, caseProcedures: true, claimProcedures: true}  })
  }
}


