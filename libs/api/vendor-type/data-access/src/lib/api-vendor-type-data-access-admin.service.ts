
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateVendorTypeInput } from './dto/admin-create-vendor-type.input'
import { AdminListVendorTypeInput } from './dto/admin-list-vendor-type.input'

import { AdminUpdateVendorTypeInput } from './dto/admin-update-vendor-type.input'

@Injectable()
export class ApiVendorTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminVendorTypes(adminId: string, input?: AdminListVendorTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.vendorType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountVendorTypes(adminId: string, input?: AdminListVendorTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.vendorType.count(
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

  
  

  async adminVendorType(adminId: string, vendorTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.vendorType.findUnique({ where: { id: vendorTypeId } , include: {vendors: true} })
  }

  async checkVendorTypeExist(vendorTypeName: string) {
    try {
      return this.data.vendorType.findMany({ where: { name: vendorTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateVendorType(adminId: string, input: AdminCreateVendorTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const vendorTypeData = await this.checkVendorTypeExist(input.name)

      if (vendorTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.vendorType.create({
          data: { 
    name: input.name, 

    }
    , include: {vendors: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateVendorType(adminId: string, vendorTypeId, input: AdminUpdateVendorTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.vendorType.update({
      where: { id: vendorTypeId },
      data: {
name: input.name, 

}
, include: {vendors: true} 
    })
  }

  async adminDeleteVendorType(adminId: string, vendorTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.vendorType.delete({ where: { id: vendorTypeId } })
  }
}

