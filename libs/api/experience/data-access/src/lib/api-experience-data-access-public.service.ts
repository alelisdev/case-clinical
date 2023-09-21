
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListExperienceInput } from './dto/user-list-experience.input'

@Injectable()
export class ApiExperienceDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicExperiences(input?: UserListExperienceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.experience.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectExperiences(input?: UserListExperienceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.experience.findMany({
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

  async publicCountExperiences(input?: UserListExperienceInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.experience.count(
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

  async publicExperience(experienceId) {

    return this.data.experience.findUnique({ where: { id: experienceId } , include: {clinicalProvider: true}  })
  }
}


