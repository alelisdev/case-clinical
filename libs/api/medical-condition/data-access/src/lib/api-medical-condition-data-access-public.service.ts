
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListMedicalConditionInput } from './dto/user-list-medical-condition.input'

@Injectable()
export class ApiMedicalConditionDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicMedicalConditions(input?: UserListMedicalConditionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalCondition.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectMedicalConditions(input?: UserListMedicalConditionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalCondition.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountMedicalConditions(input?: UserListMedicalConditionInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalCondition.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicMedicalCondition(medicalConditionId) {

    return this.data.medicalCondition.findUnique({ where: { id: medicalConditionId }  })
  }
}


