
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorAuthDmeInput } from './dto/user-list-prior-auth-dme.input'

@Injectable()
export class ApiPriorAuthDmeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorAuthDmes(input?: UserListPriorAuthDmeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthDme.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthId: input.priorAuthId,
durableMedicalEquipmentId: input.durableMedicalEquipmentId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {priorAuthorizationRequest: true, durableMedicalEquipment: true}
    })
  }

  async publicSelectPriorAuthDmes(input?: UserListPriorAuthDmeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthDme.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthId: input.priorAuthId,
durableMedicalEquipmentId: input.durableMedicalEquipmentId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPriorAuthDmes(input?: UserListPriorAuthDmeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthDme.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            priorAuthId: input.priorAuthId,
durableMedicalEquipmentId: input.durableMedicalEquipmentId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPriorAuthDme(priorAuthDmeId) {

    return this.data.priorAuthDme.findUnique({ where: { id: priorAuthDmeId } , include: {priorAuthorizationRequest: true, durableMedicalEquipment: true}  })
  }
}


