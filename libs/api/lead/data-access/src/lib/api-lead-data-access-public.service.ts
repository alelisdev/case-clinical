
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLeadInput } from './dto/user-list-lead.input'

@Injectable()
export class ApiLeadDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLeads(input?: UserListLeadInput) {
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

  async publicSelectLeads(input?: UserListLeadInput) {
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

  async publicCountLeads(input?: UserListLeadInput): Promise<CorePaging> {

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

  async publicLead(leadId) {

    return this.data.lead.findUnique({ where: { id: leadId } , include: {accidentType: true, driversLicense: true, policeReportAttachment: true, phoneRecording: true, status: true, sourceOfLead: true, submittedBy: true, bodyPartsInjured: true, insurances: true, leadActions: true, injuries: true, treatments: true}  })
  }
}


