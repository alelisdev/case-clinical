
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAppointmentInput } from './dto/admin-create-appointment.input'
import { AdminListAppointmentInput } from './dto/admin-list-appointment.input'
import { AdminListLocationInput } from '@case-clinical/api/location/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListAppointmentStatusInput } from '@case-clinical/api/appointment-status/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminListMedicalRecordStatusInput } from '@case-clinical/api/medical-record-status/data-access'
import { AdminUpdateAppointmentInput } from './dto/admin-update-appointment.input'

@Injectable()
export class ApiAppointmentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAppointments(adminId: string, input?: AdminListAppointmentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.appointment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {location: true, miscellaneous: true, medicalReport: true, bill: true, imaging: true, patient: true, clinicalProvider: true, legalCase: true, appointmentStatus: true, assignedTo: true, medicalRecordStatus: true}
    })
  }

  async adminCountAppointments(adminId: string, input?: AdminListAppointmentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.appointment.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminAppointment(adminId: string, appointmentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.appointment.findUnique({ where: { id: appointmentId } , include: {location: true, miscellaneous: true, medicalReport: true, bill: true, imaging: true, patient: true, clinicalProvider: true, legalCase: true, appointmentStatus: true, assignedTo: true, medicalRecordStatus: true, caseProcedures: true, claimProcedures: true} })
  }

  async checkAppointmentExist(appointmentName: string) {
    try {
      return this.data.appointment.findMany({ where: { name: appointmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAppointment(adminId: string, input: AdminCreateAppointmentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const appointmentData = await this.checkAppointmentExist(input.name)

      if (appointmentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.appointment.create({
          data: { 
      
                location: 
                input.locationId != null
                ? {
                        connect:  { 
                            id: input.locationId
                        }
                    }: undefined,  
                miscellaneous: 
                input.miscellaneousId != null
                ? {
                        connect:  { 
                            id: input.miscellaneousId
                        }
                    }: undefined,  
                medicalReport: 
                input.medicalReportId != null
                ? {
                        connect:  { 
                            id: input.medicalReportId
                        }
                    }: undefined,  
                bill: 
                input.billId != null
                ? {
                        connect:  { 
                            id: input.billId
                        }
                    }: undefined,  
                imaging: 
                input.imagingId != null
                ? {
                        connect:  { 
                            id: input.imagingId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                appointmentStatus: 
                input.appointmentStatusId != null
                ? {
                        connect:  { 
                            id: input.appointmentStatusId
                        }
                    }: undefined,  
                assignedTo: 
                input.assignedToId != null
                ? {
                        connect:  { 
                            id: input.assignedToId
                        }
                    }: undefined,  
                medicalRecordStatus: 
                input.medicalRecordStatusId != null
                ? {
                        connect:  { 
                            id: input.medicalRecordStatusId
                        }
                    }: undefined,name: input.name, 
appointmentDateAndTime: input.appointmentDateAndTime, 
checkedIn: input.checkedIn, 
checkedInDateTime: input.checkedInDateTime, 
finalVisitApproved: input.finalVisitApproved, 
duration: input.duration, 
notes: input.notes, 
isFirstInstance: input.isFirstInstance, 
description: input.description, 
start: input.start, 
end: input.end, 
allDay: input.allDay, 
recurrence: input.recurrence, 

    }
    , include: {location: true, miscellaneous: true, medicalReport: true, bill: true, imaging: true, patient: true, clinicalProvider: true, legalCase: true, appointmentStatus: true, assignedTo: true, medicalRecordStatus: true, caseProcedures: true, claimProcedures: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAppointment(adminId: string, appointmentId, input: AdminUpdateAppointmentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.appointment.update({
      where: { id: appointmentId },
      data: {
  
                location: 
                input.locationId != null
                ? {
                        connect:  { 
                            id: input.locationId
                        }
                    }: undefined,  
                miscellaneous: 
                input.miscellaneousId != null
                ? {
                        connect:  { 
                            id: input.miscellaneousId
                        }
                    }: undefined,  
                medicalReport: 
                input.medicalReportId != null
                ? {
                        connect:  { 
                            id: input.medicalReportId
                        }
                    }: undefined,  
                bill: 
                input.billId != null
                ? {
                        connect:  { 
                            id: input.billId
                        }
                    }: undefined,  
                imaging: 
                input.imagingId != null
                ? {
                        connect:  { 
                            id: input.imagingId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                appointmentStatus: 
                input.appointmentStatusId != null
                ? {
                        connect:  { 
                            id: input.appointmentStatusId
                        }
                    }: undefined,  
                assignedTo: 
                input.assignedToId != null
                ? {
                        connect:  { 
                            id: input.assignedToId
                        }
                    }: undefined,  
                medicalRecordStatus: 
                input.medicalRecordStatusId != null
                ? {
                        connect:  { 
                            id: input.medicalRecordStatusId
                        }
                    }: undefined,name: input.name, 
appointmentDateAndTime: input.appointmentDateAndTime, 
checkedIn: input.checkedIn, 
checkedInDateTime: input.checkedInDateTime, 
finalVisitApproved: input.finalVisitApproved, 
duration: input.duration, 
notes: input.notes, 
isFirstInstance: input.isFirstInstance, 
description: input.description, 
start: input.start, 
end: input.end, 
allDay: input.allDay, 
recurrence: input.recurrence, 

}
, include: {location: true, miscellaneous: true, medicalReport: true, bill: true, imaging: true, patient: true, clinicalProvider: true, legalCase: true, appointmentStatus: true, assignedTo: true, medicalRecordStatus: true, caseProcedures: true, claimProcedures: true} 
    })
  }

  async adminDeleteAppointment(adminId: string, appointmentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.appointment.delete({ where: { id: appointmentId } })
  }
}

