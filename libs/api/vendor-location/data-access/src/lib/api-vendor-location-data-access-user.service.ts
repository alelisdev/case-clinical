
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateVendorLocationInput } from './dto/user-create-vendor-location.input'
import { UserListVendorLocationInput } from './dto/user-list-vendor-location.input'
import { UserUpdateVendorLocationInput } from './dto/user-update-vendor-location.input'
import { UserUpdateVendorLocationsInput } from './dto/user-update-vendor-locations.input'

import { UserListLocationInput } from '@case-clinical/api/location/data-access'
import { UserListVendorInput } from '@case-clinical/api/vendor/data-access'

@Injectable()
export class ApiVendorLocationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userVendorLocations(userId: string, input?: UserListVendorLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
vendorId: input?.vendorId ? input.vendorId:undefined,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {locations: true, vendor: true}
    })
  }

  async userSelectVendorLocations(userId: string, input?: UserListVendorLocationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorLocation.findMany({
      where: {
            AND: [{
            name: { contains: name },
vendorId: input?.vendorId ? input.vendorId:undefined}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountVendorLocations(userId: string, input?: UserListVendorLocationInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.vendorLocation.count(
    {
      where: {
            AND: [{
            name: { contains: name },
vendorId: input?.vendorId ? input.vendorId:undefined,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userVendorLocation(userId: string, vendorLocationId) {

    return this.data.vendorLocation.findUnique({ where: { id: vendorLocationId } , include: {locations: { include: { vendorLocation: true, placeOfService: true } }, vendor: true}  })
  }

  async checkVendorLocationExist(vendorLocationName: string) {
    try {
      return this.data.vendorLocation.findMany({ where: { name: vendorLocationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateVendorLocation(userId: string, input: UserCreateVendorLocationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const vendorLocationData = await this.checkVendorLocationExist(input.name)

        if (vendorLocationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'VendorLocation', 'Create', input)

    let vendorLocation = await this.data.vendorLocation.create({
      data: {
                vendor:
                input.vendorId != null
                ? {
                        connect:  {
                            id: input.vendorId
                        }
                    }: undefined,name: input.name,

}
, include: {locations:true, vendor: true}
    })

    await this.data.logEvent(sendingUser, false, 'VendorLocation', 'Create', vendorLocation)

    return vendorLocation

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Vendor Location')
    }

  }





  async userUpdateVendorLocation(userId: string, vendorLocationId: string, input: UserUpdateVendorLocationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!vendorLocationId) {
        throw new BadRequestException('Vendor Location Id is required')
      } else {

      const vendorLocationData = await this.checkVendorLocationExist(input.name)

      if (vendorLocationData.length > 0) {
        if (vendorLocationData[0].id != vendorLocationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'VendorLocation', 'Update', input)

    let vendorLocation = this.data.vendorLocation.update({
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
, include: {locations:true, vendor: true}
    })

    await this.data.logEvent(sendingUser, false, 'VendorLocation', 'Update', vendorLocation)

    return vendorLocation

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Vendor Location')
    }
  }

  async userUpdateVendorLocations(userId: string, input: UserUpdateVendorLocationsInput): Promise<UpdateResult> {
    const total = input.vendorLocations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.vendorLocations) {
      const inputData = input.vendorLocations[key]

      const data = {
        id: inputData.id,
name: inputData.name,
vendorId: inputData.vendorId,

      }

      const vendorLocationData = await this.checkVendorLocationExist(inputData.name)

      if (vendorLocationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.vendorLocation.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteVendorLocation(userId: string, vendorLocationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!vendorLocationId) {
        throw new BadRequestException('Vendor Location Id is required')
      } else {
        await this.data.logEvent(sendingUser, true, 'VendorLocation', 'Delete', vendorLocationId)

        return vendorLocationId

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Vendor Location')
    }
  }
}

