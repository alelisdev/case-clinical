
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListFeeScheduleInput } from './dto/user-list-fee-schedule.input'

@Injectable()
export class ApiFeeScheduleDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicFeeSchedules(input?: UserListFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.feeSchedule.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
specialtyId: input.specialtyId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {organization: true, specialty: true}
    })
  }

  async publicSelectFeeSchedules(input?: UserListFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.feeSchedule.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
specialtyId: input.specialtyId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountFeeSchedules(input?: UserListFeeScheduleInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.feeSchedule.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
specialtyId: input.specialtyId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicFeeSchedule(feeScheduleId) {

    return this.data.feeSchedule.findUnique({ where: { id: feeScheduleId } , include: {organization: true, specialty: true}  })
  }
}


