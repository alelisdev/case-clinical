
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLeadInput } from './dto/user-create-lead.input'
import { UserListLeadInput } from './dto/user-list-lead.input'
import { UserUpdateLeadInput } from './dto/user-update-lead.input'
import { UserUpdateLeadsInput } from './dto/user-update-leads.input'

import { UserListAccidentTypeInput } from '@case-clinical/api/accident-type/data-access'
import { UserListDocumentInput } from '@case-clinical/api/document/data-access'
import { UserListLeadStatusInput } from '@case-clinical/api/lead-status/data-access'
import { UserListLeadSourceInput } from '@case-clinical/api/lead-source/data-access'
import { UserListUserInput } from '@case-clinical/api/user/data-access'

@Injectable()
export class ApiLeadDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLeads(userId: string, input?: UserListLeadInput) {
    let name = input?.name ? input.name : undefined

    return this.data.lead.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
driversLicenseId: input.driversLicenseId,
policeReportAttachmentId: input.policeReportAttachmentId,
phoneRecordingId: input.phoneRecordingId,
leadStatusId: input.leadStatusId,
leadSourceId: input.leadSourceId,
submittedById: input.submittedById,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {accidentType: true, driversLicense: true, policeReportAttachment: true, phoneRecording: true, status: true, sourceOfLead: true, submittedBy: true}
    })
  }

  async userSelectLeads(userId: string, input?: UserListLeadInput) {
    let name = input?.name ? input.name : undefined

    return this.data.lead.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
driversLicenseId: input.driversLicenseId,
policeReportAttachmentId: input.policeReportAttachmentId,
phoneRecordingId: input.phoneRecordingId,
leadStatusId: input.leadStatusId,
leadSourceId: input.leadSourceId,
submittedById: input.submittedById,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountLeads(userId: string, input?: UserListLeadInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.lead.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
driversLicenseId: input.driversLicenseId,
policeReportAttachmentId: input.policeReportAttachmentId,
phoneRecordingId: input.phoneRecordingId,
leadStatusId: input.leadStatusId,
leadSourceId: input.leadSourceId,
submittedById: input.submittedById,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userLead(userId: string, leadId) {
    return this.data.lead.findUnique({ where: { id: leadId } , 
      include: {accidentType: true, driversLicense: true, policeReportAttachment: true, phoneRecording: true, 
        status: true, sourceOfLead: true, submittedBy: true, bodyPartsInjured: true, insurances: true, 
        leadActions: true, injuries: true, treatments: true,
        legalCase: true}  })
        }

  async checkLeadExist(leadName: string) {
    try {
      return this.data.lead.findMany({ where: { name: leadName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLead(userId: string, input: UserCreateLeadInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const leadData = await this.checkLeadExist(input.name)

        if (leadData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }


    if(input.driversLicense){
      let driversLicenseId = (await this.data.userCreateDocument(userId, input.driversLicense)).id
      if(driversLicenseId){
        input.driversLicenseId = driversLicenseId
     }
    }


    if(input.policeReportAttachment){
      let policeReportAttachmentId = (await this.data.userCreateDocument(userId, input.policeReportAttachment)).id
      if(policeReportAttachmentId){
        input.policeReportAttachmentId = policeReportAttachmentId
     }
    }


    if(input.phoneRecording){
      let phoneRecordingId = (await this.data.userCreateDocument(userId, input.phoneRecording)).id
      if(phoneRecordingId){
        input.phoneRecordingId = phoneRecordingId
     }
    }


    await this.data.logEvent(sendingUser, true, 'Lead', 'Create', input)

    let lead = await this.data.lead.create({
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

    await this.data.logEvent(sendingUser, false, 'Lead', 'Create', lead)

    return lead

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Lead')
    }

  }


  
  

  async userUpdateLead(userId: string, leadId: string, input: UserUpdateLeadInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!leadId) {
        throw new BadRequestException('Lead Id is required')
      } else {

      const leadData = await this.checkLeadExist(input.name)

      if (leadData.length > 0) {
        if (leadData[0].id != leadId) {
          throw new ConflictException("Record must be unique.")
        }
      }


    if(input.driversLicense){
      let driversLicenseId = (await this.data.userCreateDocument(userId, input.driversLicense)).id
      if(driversLicenseId){
        input.driversLicenseId = driversLicenseId
     }
    }


    if(input.policeReportAttachment){
      let policeReportAttachmentId = (await this.data.userCreateDocument(userId, input.policeReportAttachment)).id
      if(policeReportAttachmentId){
        input.policeReportAttachmentId = policeReportAttachmentId
     }
    }


    if(input.phoneRecording){
      let phoneRecordingId = (await this.data.userCreateDocument(userId, input.phoneRecording)).id
      if(phoneRecordingId){
        input.phoneRecordingId = phoneRecordingId
     }
    }


    await this.data.logEvent(sendingUser, true, 'Lead', 'Update', input)

    let lead = this.data.lead.update({
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

    await this.data.logEvent(sendingUser, false, 'Lead', 'Update', lead)

    return lead

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Lead')
    }
  }

  async userUpdateLeads(userId: string, input: UserUpdateLeadsInput): Promise<UpdateResult> {
    const total = input.leads.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.leads) {
      const inputData = input.leads[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
firstName: inputData.firstName, 
middleName: inputData.middleName, 
lastName: inputData.lastName, 
address: inputData.address, 
city: inputData.city, 
state: inputData.state, 
postalCode: inputData.postalCode, 
dateOfBirth: inputData.dateOfBirth, 
dateOfLoss: inputData.dateOfLoss, 
dateOfRetention: inputData.dateOfRetention, 
phoneNumber: inputData.phoneNumber, 
emailAddress: inputData.emailAddress, 
priorRepresentation: inputData.priorRepresentation, 
accidentTypeId: inputData.accidentTypeId, 
driversLicenseId: inputData.driversLicenseId, 
driversLicenseNumber: inputData.driversLicenseNumber, 
driversLicenseState: inputData.driversLicenseState, 
severeInjury: inputData.severeInjury, 
emergencyContactId: inputData.emergencyContactId, 
allowedToContactEmergencyContact: inputData.allowedToContactEmergencyContact, 
policeReport: inputData.policeReport, 
policeReportAttachmentId: inputData.policeReportAttachmentId, 
phoneRecordingId: inputData.phoneRecordingId, 
leadStatusId: inputData.leadStatusId, 
leadSpecialistId: inputData.leadSpecialistId, 
leadSourceId: inputData.leadSourceId, 
submittedById: inputData.submittedById, 
legalCaseId: inputData.legalCaseId, 

      }

      const leadData = await this.checkLeadExist(inputData.name)

      if (leadData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.lead.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteLead(userId: string, leadId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!leadId) {
        throw new BadRequestException('Lead Id is required')
      } else {


        const bodyPartLeadCount = await this.data.bodyPartLead.count({ where: { leadId: leadId }})
        if(bodyPartLeadCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Body Part Lead')
        }


        const insuranceCount = await this.data.insurance.count({ where: { leadId: leadId }})
        if(insuranceCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Insurance')
        }


        const leadActionCount = await this.data.leadAction.count({ where: { leadId: leadId }})
        if(leadActionCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Lead Action')
        }


        const leadInjuryCount = await this.data.leadInjury.count({ where: { leadId: leadId }})
        if(leadInjuryCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Lead Injury')
        }


        const leadTreatmentCount = await this.data.leadTreatment.count({ where: { leadId: leadId }})
        if(leadTreatmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Lead Treatment')
        }


        await this.data.logEvent(sendingUser, true, 'Lead', 'Delete', leadId)

        let lead = this.data.lead.delete({
          where: { id: leadId }
        })

        await this.data.logEvent(sendingUser, false, 'Lead', 'Delete', lead)

        return lead

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Lead')
    }
  }
}

