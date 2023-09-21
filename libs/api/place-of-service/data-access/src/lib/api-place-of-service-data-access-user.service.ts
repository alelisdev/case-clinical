
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePlaceOfServiceInput } from './dto/user-create-place-of-service.input'
import { UserListPlaceOfServiceInput } from './dto/user-list-place-of-service.input'
import { UserUpdatePlaceOfServiceInput } from './dto/user-update-place-of-service.input'
import { UserUpdatePlaceOfServicesInput } from './dto/user-update-place-of-services.input'

import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'

@Injectable()
export class ApiPlaceOfServiceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPlaceOfServices(userId: string, input?: UserListPlaceOfServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.placeOfService.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPlaceOfServices(userId: string, input?: UserListPlaceOfServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.placeOfService.findMany({
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

  async userCountPlaceOfServices(userId: string, input?: UserListPlaceOfServiceInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.placeOfService.count(
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

  async userPlaceOfService(userId: string, placeOfServiceId) {

    return this.data.placeOfService.findUnique({ where: { id: placeOfServiceId } , include: {claimProcedures: {include: {placeOfService: true, claimStatus: true, claim: true, appointment: true}}, locations: true}  })
  }

  async checkPlaceOfServiceExist(placeOfServiceName: string) {
    try {
      return this.data.placeOfService.findMany({ where: { name: placeOfServiceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePlaceOfService(userId: string, input: UserCreatePlaceOfServiceInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const placeOfServiceData = await this.checkPlaceOfServiceExist(input.name)

        if (placeOfServiceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PlaceOfService', 'Create', input)

    let placeOfService = await this.data.placeOfService.create({
      data: { 
name: input.name, 
isFacility: input.isFacility, 

}
, include: {claimProcedures: true, locations: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PlaceOfService', 'Create', placeOfService)

    return placeOfService

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Place of Service')
    }

  }


  
  

  async userUpdatePlaceOfService(userId: string, placeOfServiceId: string, input: UserUpdatePlaceOfServiceInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!placeOfServiceId) {
        throw new BadRequestException('Place of Service Id is required')
      } else {

      const placeOfServiceData = await this.checkPlaceOfServiceExist(input.name)

      if (placeOfServiceData.length > 0) {
        if (placeOfServiceData[0].id != placeOfServiceId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PlaceOfService', 'Update', input)

    let placeOfService = this.data.placeOfService.update({
      where: { id: placeOfServiceId },
      data: {
name: input.name, 
isFacility: input.isFacility, 

}
, include: {claimProcedures: true, locations: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PlaceOfService', 'Update', placeOfService)

    return placeOfService

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Place of Service')
    }
  }

  async userUpdatePlaceOfServices(userId: string, input: UserUpdatePlaceOfServicesInput): Promise<UpdateResult> {
    const total = input.placeOfServices.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.placeOfServices) {
      const inputData = input.placeOfServices[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
isFacility: inputData.isFacility, 

      }

      const placeOfServiceData = await this.checkPlaceOfServiceExist(inputData.name)

      if (placeOfServiceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.placeOfService.upsert({
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


  async userDeletePlaceOfService(userId: string, placeOfServiceId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!placeOfServiceId) {
        throw new BadRequestException('Place of Service Id is required')
      } else {

        const claimProcedureCount = await this.data.claimProcedure.count({ where: { placeOfServiceId: placeOfServiceId }})
        if(claimProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Claim Procedure')
        }

        const locationCount = await this.data.location.count({ where: { placeOfServiceId: placeOfServiceId }})
        if(locationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Location')
        }

        await this.data.logEvent(sendingUser, true, 'PlaceOfService', 'Delete', placeOfServiceId)

        let placeOfService = this.data.placeOfService.delete({
          where: { id: placeOfServiceId }
        })

        await this.data.logEvent(sendingUser, false, 'PlaceOfService', 'Delete', placeOfService)

        return placeOfService

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Place of Service')
    }
  }
}

