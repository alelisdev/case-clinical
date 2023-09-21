
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateManufacturerInput } from './dto/admin-create-manufacturer.input'
import { AdminListManufacturerInput } from './dto/admin-list-manufacturer.input'

import { AdminUpdateManufacturerInput } from './dto/admin-update-manufacturer.input'

@Injectable()
export class ApiManufacturerDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminManufacturers(adminId: string, input?: AdminListManufacturerInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.manufacturer.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountManufacturers(adminId: string, input?: AdminListManufacturerInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.manufacturer.count(
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

  
  

  async adminManufacturer(adminId: string, manufacturerId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.manufacturer.findUnique({ where: { id: manufacturerId } , include: {implants: true} })
  }

  async checkManufacturerExist(manufacturerName: string) {
    try {
      return this.data.manufacturer.findMany({ where: { name: manufacturerName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateManufacturer(adminId: string, input: AdminCreateManufacturerInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const manufacturerData = await this.checkManufacturerExist(input.name)

      if (manufacturerData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.manufacturer.create({
          data: { 
    name: input.name, 
primaryPhoneNumber: input.primaryPhoneNumber, 
primaryEmailAddress: input.primaryEmailAddress, 
primaryAddressLine1: input.primaryAddressLine1, 
primaryAddressLine2: input.primaryAddressLine2, 
primaryAddressCity: input.primaryAddressCity, 
primaryAddressStateOrProvince: input.primaryAddressStateOrProvince, 
primaryAddressPostalCode: input.primaryAddressPostalCode, 
notes: input.notes, 

    }
    , include: {implants: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateManufacturer(adminId: string, manufacturerId, input: AdminUpdateManufacturerInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.manufacturer.update({
      where: { id: manufacturerId },
      data: {
name: input.name, 
primaryPhoneNumber: input.primaryPhoneNumber, 
primaryEmailAddress: input.primaryEmailAddress, 
primaryAddressLine1: input.primaryAddressLine1, 
primaryAddressLine2: input.primaryAddressLine2, 
primaryAddressCity: input.primaryAddressCity, 
primaryAddressStateOrProvince: input.primaryAddressStateOrProvince, 
primaryAddressPostalCode: input.primaryAddressPostalCode, 
notes: input.notes, 

}
, include: {implants: true} 
    })
  }

  async adminDeleteManufacturer(adminId: string, manufacturerId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.manufacturer.delete({ where: { id: manufacturerId } })
  }
}

