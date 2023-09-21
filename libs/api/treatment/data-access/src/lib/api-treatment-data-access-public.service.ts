
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTreatmentInput } from './dto/user-list-treatment.input'

@Injectable()
export class ApiTreatmentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTreatments(input?: UserListTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.treatment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectTreatments(input?: UserListTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.treatment.findMany({
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

  async publicCountTreatments(input?: UserListTreatmentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.treatment.count(
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

  async publicTreatment(treatmentId) {

    return this.data.treatment.findUnique({ where: { id: treatmentId } , include: {leads: true}  })
  }
}


