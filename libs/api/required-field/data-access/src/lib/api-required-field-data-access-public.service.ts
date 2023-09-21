
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRequiredFieldInput } from './dto/user-list-required-field.input'

@Injectable()
export class ApiRequiredFieldDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRequiredFields(input?: UserListRequiredFieldInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requiredField.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
medLevelId: input.medLevelId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {accidentType: true, medLevel: true}
    })
  }

  async publicSelectRequiredFields(input?: UserListRequiredFieldInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requiredField.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
medLevelId: input.medLevelId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRequiredFields(input?: UserListRequiredFieldInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.requiredField.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
medLevelId: input.medLevelId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRequiredField(requiredFieldId) {

    return this.data.requiredField.findUnique({ where: { id: requiredFieldId } , include: {accidentType: true, medLevel: true}  })
  }
}


