
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateVendorTypeInput } from './dto/user-create-vendor-type.input'
import { UserListVendorTypeInput } from './dto/user-list-vendor-type.input'
import { UserUpdateVendorTypeInput } from './dto/user-update-vendor-type.input'
import { UserUpdateVendorTypesInput } from './dto/user-update-vendor-types.input'



@Injectable()
export class ApiVendorTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userVendorTypes(userId: string, input?: UserListVendorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectVendorTypes(userId: string, input?: UserListVendorTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.vendorType.findMany({
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

  async userCountVendorTypes(userId: string, input?: UserListVendorTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.vendorType.count(
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

  async userVendorType(userId: string, vendorTypeId) {

    return this.data.vendorType.findUnique({ where: { id: vendorTypeId } , include: {vendors: {include: {vendorType: true}}}  })
  }

  async checkVendorTypeExist(vendorTypeName: string) {
    try {
      return this.data.vendorType.findMany({ where: { name: vendorTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateVendorType(userId: string, input: UserCreateVendorTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const vendorTypeData = await this.checkVendorTypeExist(input.name)

        if (vendorTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'VendorType', 'Create', input)

    let vendorType = await this.data.vendorType.create({
      data: { 
name: input.name, 

}
, include: {vendors: true} 
    })

    await this.data.logEvent(sendingUser, false, 'VendorType', 'Create', vendorType)

    return vendorType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Vendor Type')
    }

  }


  
  

  async userUpdateVendorType(userId: string, vendorTypeId: string, input: UserUpdateVendorTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!vendorTypeId) {
        throw new BadRequestException('Vendor Type Id is required')
      } else {

      const vendorTypeData = await this.checkVendorTypeExist(input.name)

      if (vendorTypeData.length > 0) {
        if (vendorTypeData[0].id != vendorTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'VendorType', 'Update', input)

    let vendorType = this.data.vendorType.update({
      where: { id: vendorTypeId },
      data: {
name: input.name, 

}
, include: {vendors: true} 
    })

    await this.data.logEvent(sendingUser, false, 'VendorType', 'Update', vendorType)

    return vendorType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Vendor Type')
    }
  }

  async userUpdateVendorTypes(userId: string, input: UserUpdateVendorTypesInput): Promise<UpdateResult> {
    const total = input.vendorTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.vendorTypes) {
      const inputData = input.vendorTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const vendorTypeData = await this.checkVendorTypeExist(inputData.name)

      if (vendorTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.vendorType.upsert({
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


  async userDeleteVendorType(userId: string, vendorTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!vendorTypeId) {
        throw new BadRequestException('Vendor Type Id is required')
      } else {

        const vendorCount = await this.data.vendor.count({ where: { vendorTypeId: vendorTypeId }})
        if(vendorCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Vendor')
        }

        await this.data.logEvent(sendingUser, true, 'VendorType', 'Delete', vendorTypeId)

        let vendorType = this.data.vendorType.delete({
          where: { id: vendorTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'VendorType', 'Delete', vendorType)

        return vendorType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Vendor Type')
    }
  }
}

