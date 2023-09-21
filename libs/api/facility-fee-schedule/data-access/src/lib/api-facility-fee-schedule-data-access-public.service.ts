
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListFacilityFeeScheduleInput } from './dto/user-list-facility-fee-schedule.input'

@Injectable()
export class ApiFacilityFeeScheduleDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicFacilityFeeSchedules(input?: UserListFacilityFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.facilityFeeSchedule.findMany({
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

  async publicSelectFacilityFeeSchedules(input?: UserListFacilityFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.facilityFeeSchedule.findMany({
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

  async publicCountFacilityFeeSchedules(input?: UserListFacilityFeeScheduleInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.facilityFeeSchedule.count(
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

  async publicFacilityFeeSchedule(facilityFeeScheduleId) {

    return this.data.facilityFeeSchedule.findUnique({ where: { id: facilityFeeScheduleId } , include: {organization: true, specialty: true}  })
  }
}


