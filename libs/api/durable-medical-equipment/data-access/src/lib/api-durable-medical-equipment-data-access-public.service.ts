
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListDurableMedicalEquipmentInput } from './dto/user-list-durable-medical-equipment.input'

@Injectable()
export class ApiDurableMedicalEquipmentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicDurableMedicalEquipments(input?: UserListDurableMedicalEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.durableMedicalEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {vendor: true}
    })
  }

  async publicSelectDurableMedicalEquipments(input?: UserListDurableMedicalEquipmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.durableMedicalEquipment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountDurableMedicalEquipments(input?: UserListDurableMedicalEquipmentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.durableMedicalEquipment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            vendorId: input.vendorId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicDurableMedicalEquipment(durableMedicalEquipmentId) {

    return this.data.durableMedicalEquipment.findUnique({ where: { id: durableMedicalEquipmentId } , include: {vendor: true, priorAuthDmes: true}  })
  }
}


