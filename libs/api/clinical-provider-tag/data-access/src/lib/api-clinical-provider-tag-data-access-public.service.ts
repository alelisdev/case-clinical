
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClinicalProviderTagInput } from './dto/user-list-clinical-provider-tag.input'

@Injectable()
export class ApiClinicalProviderTagDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClinicalProviderTags(input?: UserListClinicalProviderTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
tagId: input.tagId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, tag: true}
    })
  }

  async publicSelectClinicalProviderTags(input?: UserListClinicalProviderTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
tagId: input.tagId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClinicalProviderTags(input?: UserListClinicalProviderTagInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderTag.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,
tagId: input.tagId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClinicalProviderTag(clinicalProviderTagId) {

    return this.data.clinicalProviderTag.findUnique({ where: { id: clinicalProviderTagId } , include: {clinicalProvider: true, tag: true}  })
  }
}


