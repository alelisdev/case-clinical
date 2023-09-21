
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateDurableMedicalEquipmentInput } from './dto/admin-create-durable-medical-equipment.input'
import { AdminListDurableMedicalEquipmentInput } from './dto/admin-list-durable-medical-equipment.input'
import { AdminListVendorInput } from '@case-clinical/api/vendor/data-access'
import { AdminUpdateDurableMedicalEquipmentInput } from './dto/admin-update-durable-medical-equipment.input'

@Injectable()
export class ApiDurableMedicalEquipmentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminDurableMedicalEquipments(adminId: string, input?: AdminListDurableMedicalEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.durableMedicalEquipment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {vendor: true}
    })
  }

  async adminCountDurableMedicalEquipments(adminId: string, input?: AdminListDurableMedicalEquipmentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.durableMedicalEquipment.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminDurableMedicalEquipment(adminId: string, durableMedicalEquipmentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.durableMedicalEquipment.findUnique({ where: { id: durableMedicalEquipmentId } , include: {vendor: true, priorAuthDmes: true} })
  }

  async checkDurableMedicalEquipmentExist(durableMedicalEquipmentName: string) {
    try {
      return this.data.durableMedicalEquipment.findMany({ where: { name: durableMedicalEquipmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateDurableMedicalEquipment(adminId: string, input: AdminCreateDurableMedicalEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const durableMedicalEquipmentData = await this.checkDurableMedicalEquipmentExist(input.name)

      if (durableMedicalEquipmentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.durableMedicalEquipment.create({
          data: { 
      
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 
itemCode: input.itemCode, 
size: input.size, 
brand: input.brand, 
itemURL: input.itemURL, 
estimatedCost: input.estimatedCost, 

    }
    , include: {vendor: true, priorAuthDmes: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateDurableMedicalEquipment(adminId: string, durableMedicalEquipmentId, input: AdminUpdateDurableMedicalEquipmentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.durableMedicalEquipment.update({
      where: { id: durableMedicalEquipmentId },
      data: {
  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 
itemCode: input.itemCode, 
size: input.size, 
brand: input.brand, 
itemURL: input.itemURL, 
estimatedCost: input.estimatedCost, 

}
, include: {vendor: true, priorAuthDmes: true} 
    })
  }

  async adminDeleteDurableMedicalEquipment(adminId: string, durableMedicalEquipmentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.durableMedicalEquipment.delete({ where: { id: durableMedicalEquipmentId } })
  }
}

