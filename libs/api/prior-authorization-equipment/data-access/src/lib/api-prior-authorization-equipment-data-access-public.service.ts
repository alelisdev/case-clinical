
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorAuthorizationEquipmentInput } from './dto/user-list-prior-authorization-equipment.input'

@Injectable()
export class ApiPriorAuthorizationEquipmentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorAuthorizationEquipments(input?: UserListPriorAuthorizationEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            equipmentId: input.equipmentId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {equipment: true, priorAuthorizationRequest: true}
    })
  }

  async publicSelectPriorAuthorizationEquipments(input?: UserListPriorAuthorizationEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            equipmentId: input.equipmentId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPriorAuthorizationEquipments(input?: UserListPriorAuthorizationEquipmentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationEquipment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            equipmentId: input.equipmentId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPriorAuthorizationEquipment(priorAuthorizationEquipmentId) {

    return this.data.priorAuthorizationEquipment.findUnique({ where: { id: priorAuthorizationEquipmentId } , include: {equipment: true, priorAuthorizationRequest: true}  })
  }
}


