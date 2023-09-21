
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLeadTreatmentInput } from './dto/user-list-lead-treatment.input'

@Injectable()
export class ApiLeadTreatmentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLeadTreatments(input?: UserListLeadTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadTreatment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
treatmentId: input.treatmentId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, treatment: true}
    })
  }

  async publicSelectLeadTreatments(input?: UserListLeadTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadTreatment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
treatmentId: input.treatmentId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountLeadTreatments(input?: UserListLeadTreatmentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.leadTreatment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input.leadId,
treatmentId: input.treatmentId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicLeadTreatment(leadTreatmentId) {

    return this.data.leadTreatment.findUnique({ where: { id: leadTreatmentId } , include: {lead: true, treatment: true}  })
  }
}


