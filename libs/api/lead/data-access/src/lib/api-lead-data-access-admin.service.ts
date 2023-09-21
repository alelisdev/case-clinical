
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLeadInput } from './dto/admin-create-lead.input'
import { AdminListLeadInput } from './dto/admin-list-lead.input'
import { AdminListAccidentTypeInput } from '@case-clinical/api/accident-type/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminListLeadStatusInput } from '@case-clinical/api/lead-status/data-access'
import { AdminListLeadSourceInput } from '@case-clinical/api/lead-source/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateLeadInput } from './dto/admin-update-lead.input'

@Injectable()
export class ApiLeadDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLeads(adminId: string, input?: AdminListLeadInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.lead.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {accidentType: true, driversLicense: true, policeReportAttachment: true, phoneRecording: true, status: true, sourceOfLead: true, submittedBy: true}
    })
  }

  async adminCountLeads(adminId: string, input?: AdminListLeadInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.lead.count(
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

  
  

  async adminLead(adminId: string, leadId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.lead.findUnique({ where: { id: leadId } , include: {accidentType: true, driversLicense: true, policeReportAttachment: true, phoneRecording: true, status: true, sourceOfLead: true, submittedBy: true, bodyPartsInjured: true, insurances: true, leadActions: true, injuries: true, treatments: true} })
  }

  async checkLeadExist(leadName: string) {
    try {
      return this.data.lead.findMany({ where: { name: leadName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLead(adminId: string, input: AdminCreateLeadInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const leadData = await this.checkLeadExist(input.name)

      if (leadData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.lead.create({
          data: { 
      
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                driversLicense: 
                input.driversLicenseId != null
                ? {
                        connect:  { 
                            id: input.driversLicenseId
                        }
                    }: undefined,  
                policeReportAttachment: 
                input.policeReportAttachmentId != null
                ? {
                        connect:  { 
                            id: input.policeReportAttachmentId
                        }
                    }: undefined,  
                phoneRecording: 
                input.phoneRecordingId != null
                ? {
                        connect:  { 
                            id: input.phoneRecordingId
                        }
                    }: undefined,  
                status: 
                input.leadStatusId != null
                ? {
                        connect:  { 
                            id: input.leadStatusId
                        }
                    }: undefined,  
                sourceOfLead: 
                input.leadSourceId != null
                ? {
                        connect:  { 
                            id: input.leadSourceId
                        }
                    }: undefined,  
                submittedBy: 
                input.submittedById != null
                ? {
                        connect:  { 
                            id: input.submittedById
                        }
                    }: undefined,name: input.name, 
firstName: input.firstName, 
middleName: input.middleName, 
lastName: input.lastName, 
address: input.address, 
city: input.city, 
state: input.state, 
postalCode: input.postalCode, 
dateOfBirth: input.dateOfBirth, 
dateOfLoss: input.dateOfLoss, 
dateOfRetention: input.dateOfRetention, 
phoneNumber: input.phoneNumber, 
emailAddress: input.emailAddress, 
priorRepresentation: input.priorRepresentation, 
driversLicenseNumber: input.driversLicenseNumber, 
driversLicenseState: input.driversLicenseState, 
severeInjury: input.severeInjury, 
allowedToContactEmergencyContact: input.allowedToContactEmergencyContact, 
policeReport: input.policeReport, 

    }
    , include: {accidentType: true, driversLicense: true, policeReportAttachment: true, phoneRecording: true, status: true, sourceOfLead: true, submittedBy: true, bodyPartsInjured: true, insurances: true, leadActions: true, injuries: true, treatments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateLead(adminId: string, leadId, input: AdminUpdateLeadInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.lead.update({
      where: { id: leadId },
      data: {
  
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                driversLicense: 
                input.driversLicenseId != null
                ? {
                        connect:  { 
                            id: input.driversLicenseId
                        }
                    }: undefined,  
                policeReportAttachment: 
                input.policeReportAttachmentId != null
                ? {
                        connect:  { 
                            id: input.policeReportAttachmentId
                        }
                    }: undefined,  
                phoneRecording: 
                input.phoneRecordingId != null
                ? {
                        connect:  { 
                            id: input.phoneRecordingId
                        }
                    }: undefined,  
                status: 
                input.leadStatusId != null
                ? {
                        connect:  { 
                            id: input.leadStatusId
                        }
                    }: undefined,  
                sourceOfLead: 
                input.leadSourceId != null
                ? {
                        connect:  { 
                            id: input.leadSourceId
                        }
                    }: undefined,  
                submittedBy: 
                input.submittedById != null
                ? {
                        connect:  { 
                            id: input.submittedById
                        }
                    }: undefined,name: input.name, 
firstName: input.firstName, 
middleName: input.middleName, 
lastName: input.lastName, 
address: input.address, 
city: input.city, 
state: input.state, 
postalCode: input.postalCode, 
dateOfBirth: input.dateOfBirth, 
dateOfLoss: input.dateOfLoss, 
dateOfRetention: input.dateOfRetention, 
phoneNumber: input.phoneNumber, 
emailAddress: input.emailAddress, 
priorRepresentation: input.priorRepresentation, 
driversLicenseNumber: input.driversLicenseNumber, 
driversLicenseState: input.driversLicenseState, 
severeInjury: input.severeInjury, 
allowedToContactEmergencyContact: input.allowedToContactEmergencyContact, 
policeReport: input.policeReport, 

}
, include: {accidentType: true, driversLicense: true, policeReportAttachment: true, phoneRecording: true, status: true, sourceOfLead: true, submittedBy: true, bodyPartsInjured: true, insurances: true, leadActions: true, injuries: true, treatments: true} 
    })
  }

  async adminDeleteLead(adminId: string, leadId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.lead.delete({ where: { id: leadId } })
  }
}

