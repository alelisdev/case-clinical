
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateServiceInput } from './dto/user-create-service.input'
import { UserListServiceInput } from './dto/user-list-service.input'
import { UserUpdateServiceInput } from './dto/user-update-service.input'
import { UserUpdateServicesInput } from './dto/user-update-services.input'



@Injectable()
export class ApiServiceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userServices(userId: string, input?: UserListServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.service.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectServices(userId: string, input?: UserListServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.service.findMany({
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

  async userCountServices(userId: string, input?: UserListServiceInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.service.count(
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

  async userService(userId: string, serviceId) {

    return this.data.service.findUnique({ where: { id: serviceId } , include: {clinicalProviderServices: true}  })
  }

  async checkServiceExist(serviceName: string) {
    try {
      return this.data.service.findMany({ where: { name: serviceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateService(userId: string, input: UserCreateServiceInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const serviceData = await this.checkServiceExist(input.name)

        if (serviceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Service', 'Create', input)

    let service = await this.data.service.create({
      data: { 
name: input.name, 

}
, include: {clinicalProviderServices: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Service', 'Create', service)

    return service

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Service')
    }

  }


  
  

  async userUpdateService(userId: string, serviceId: string, input: UserUpdateServiceInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!serviceId) {
        throw new BadRequestException('Service Id is required')
      } else {

      const serviceData = await this.checkServiceExist(input.name)

      if (serviceData.length > 0) {
        if (serviceData[0].id != serviceId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Service', 'Update', input)

    let service = this.data.service.update({
      where: { id: serviceId },
      data: {
name: input.name, 

}
, include: {clinicalProviderServices: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Service', 'Update', service)

    return service

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Service')
    }
  }

  async userUpdateServices(userId: string, input: UserUpdateServicesInput): Promise<UpdateResult> {
    const total = input.services.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.services) {
      const inputData = input.services[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const serviceData = await this.checkServiceExist(inputData.name)

      if (serviceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.service.upsert({
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


  async userDeleteService(userId: string, serviceId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!serviceId) {
        throw new BadRequestException('Service Id is required')
      } else {


        const clinicalProviderServiceCount = await this.data.clinicalProviderService.count({ where: { serviceId: serviceId }})
        if(clinicalProviderServiceCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Service')
        }


        await this.data.logEvent(sendingUser, true, 'Service', 'Delete', serviceId)

        let service = this.data.service.delete({
          where: { id: serviceId }
        })

        await this.data.logEvent(sendingUser, false, 'Service', 'Delete', service)

        return service

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Service')
    }
  }
}

