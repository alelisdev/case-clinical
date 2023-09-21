
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListEducationInput } from './dto/user-list-education.input'

@Injectable()
export class ApiEducationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicEducations(input?: UserListEducationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.education.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectEducations(input?: UserListEducationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.education.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountEducations(input?: UserListEducationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.education.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicEducation(educationId) {

    return this.data.education.findUnique({ where: { id: educationId } , include: {clinicalProvider: true}  })
  }
}


