
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListEquipmentInput } from './dto/user-list-equipment.input'

@Injectable()
export class ApiEquipmentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicEquipments(input?: UserListEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.equipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectEquipments(input?: UserListEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.equipment.findMany({
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

  async publicCountEquipments(input?: UserListEquipmentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.equipment.count(
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

  async publicEquipment(equipmentId) {

    return this.data.equipment.findUnique({ where: { id: equipmentId } , include: {priorAuthorizationEquipments: true}  })
  }
}


