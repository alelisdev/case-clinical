
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateManufacturerInput } from './dto/user-create-manufacturer.input'
import { UserListManufacturerInput } from './dto/user-list-manufacturer.input'
import { UserUpdateManufacturerInput } from './dto/user-update-manufacturer.input'
import { UserUpdateManufacturersInput } from './dto/user-update-manufacturers.input'



@Injectable()
export class ApiManufacturerDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userManufacturers(userId: string, input?: UserListManufacturerInput) {
    let name = input?.name ? input.name : undefined

    return this.data.manufacturer.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectManufacturers(userId: string, input?: UserListManufacturerInput) {
    let name = input?.name ? input.name : undefined

    return this.data.manufacturer.findMany({
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

  async userCountManufacturers(userId: string, input?: UserListManufacturerInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.manufacturer.count(
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

  async userManufacturer(userId: string, manufacturerId) {

    return this.data.manufacturer.findUnique({ where: { id: manufacturerId } , include: {implants: {include: {implantCategory: true, salesRepresentative: true, manufacturer: true}}}  })
  }

  async checkManufacturerExist(manufacturerName: string) {
    try {
      return this.data.manufacturer.findMany({ where: { name: manufacturerName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateManufacturer(userId: string, input: UserCreateManufacturerInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const manufacturerData = await this.checkManufacturerExist(input.name)

        if (manufacturerData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Manufacturer', 'Create', input)

    let manufacturer = await this.data.manufacturer.create({
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
, include: {implants: {include: {implantCategory: true, salesRepresentative: true, manufacturer: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Manufacturer', 'Create', manufacturer)

    return manufacturer

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Manufacturer')
    }

  }


  
  

  async userUpdateManufacturer(userId: string, manufacturerId: string, input: UserUpdateManufacturerInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!manufacturerId) {
        throw new BadRequestException('Manufacturer Id is required')
      } else {

      const manufacturerData = await this.checkManufacturerExist(input.name)

      if (manufacturerData.length > 0) {
        if (manufacturerData[0].id != manufacturerId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Manufacturer', 'Update', input)

    let manufacturer = this.data.manufacturer.update({
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

    await this.data.logEvent(sendingUser, false, 'Manufacturer', 'Update', manufacturer)

    return manufacturer

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Manufacturer')
    }
  }

  async userUpdateManufacturers(userId: string, input: UserUpdateManufacturersInput): Promise<UpdateResult> {
    const total = input.manufacturers.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.manufacturers) {
      const inputData = input.manufacturers[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
primaryPhoneNumber: inputData.primaryPhoneNumber, 
primaryEmailAddress: inputData.primaryEmailAddress, 
primaryAddressLine1: inputData.primaryAddressLine1, 
primaryAddressLine2: inputData.primaryAddressLine2, 
primaryAddressCity: inputData.primaryAddressCity, 
primaryAddressStateOrProvince: inputData.primaryAddressStateOrProvince, 
primaryAddressPostalCode: inputData.primaryAddressPostalCode, 
notes: inputData.notes, 

      }

      const manufacturerData = await this.checkManufacturerExist(inputData.name)

      if (manufacturerData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.manufacturer.upsert({
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


  async userDeleteManufacturer(userId: string, manufacturerId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!manufacturerId) {
        throw new BadRequestException('Manufacturer Id is required')
      } else {

        const implantCount = await this.data.implant.count({ where: { manufacturerId: manufacturerId }})
        if(implantCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Implant')
        }

        await this.data.logEvent(sendingUser, true, 'Manufacturer', 'Delete', manufacturerId)

        let manufacturer = this.data.manufacturer.delete({
          where: { id: manufacturerId }
        })

        await this.data.logEvent(sendingUser, false, 'Manufacturer', 'Delete', manufacturer)

        return manufacturer

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Manufacturer')
    }
  }
}

