
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateVendorLocationInput } from './dto/admin-create-vendor-location.input'
import { AdminListVendorLocationInput } from './dto/admin-list-vendor-location.input'
import { AdminListLocationInput } from '@case-clinical/api/location/data-access'
import { AdminListVendorInput } from '@case-clinical/api/vendor/data-access'
import { AdminUpdateVendorLocationInput } from './dto/admin-update-vendor-location.input'

@Injectable()
export class ApiVendorLocationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminVendorLocations(adminId: string, input?: AdminListVendorLocationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.vendorLocation.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {locations: true, vendor: true}
    })
  }

  async adminCountVendorLocations(adminId: string, input?: AdminListVendorLocationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.vendorLocation.count(
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

  
  

  async adminVendorLocation(adminId: string, vendorLocationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.vendorLocation.findUnique({ where: { id: vendorLocationId } , include: {locations: true, vendor: true} })
  }

  async checkVendorLocationExist(vendorLocationName: string) {
    try {
      return this.data.vendorLocation.findMany({ where: { name: vendorLocationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateVendorLocation(adminId: string, input: AdminCreateVendorLocationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const vendorLocationData = await this.checkVendorLocationExist(input.name)

      if (vendorLocationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.vendorLocation.create({
          data: { 
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {locations: true, vendor: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateVendorLocation(adminId: string, vendorLocationId, input: AdminUpdateVendorLocationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.vendorLocation.update({
      where: { id: vendorLocationId },
      data: {
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 

}
, include: {locations: true, vendor: true} 
    })
  }

  async adminDeleteVendorLocation(adminId: string, vendorLocationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.vendorLocation.delete({ where: { id: vendorLocationId } })
  }
}

