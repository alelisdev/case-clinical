
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClinicalProviderServiceInput } from './dto/user-create-clinical-provider-service.input'
import { UserListClinicalProviderServiceInput } from './dto/user-list-clinical-provider-service.input'
import { UserUpdateClinicalProviderServiceInput } from './dto/user-update-clinical-provider-service.input'
import { UserUpdateClinicalProviderServicesInput } from './dto/user-update-clinical-provider-services.input'

import { UserListServiceInput } from '@case-clinical/api/service/data-access'
import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiClinicalProviderServiceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClinicalProviderServices(userId: string, input?: UserListClinicalProviderServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderService.findMany({
      where: {
            AND: [{
            name: { contains: name },
            serviceId: input?.serviceId,
clinicalProviderId: input?.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {service: true, clinicalProvider: true}
    })
  }

  async userSelectClinicalProviderServices(userId: string, input?: UserListClinicalProviderServiceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderService.findMany({
      where: {
            AND: [{
            name: { contains: name },
            serviceId: input?.serviceId,
clinicalProviderId: input?.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClinicalProviderServices(userId: string, input?: UserListClinicalProviderServiceInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderService.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            serviceId: input?.serviceId,
clinicalProviderId: input?.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClinicalProviderService(userId: string, clinicalProviderServiceId) {

    return this.data.clinicalProviderService.findUnique({ where: { id: clinicalProviderServiceId } , include: {service: true, clinicalProvider: true}  })
  }

  async checkClinicalProviderServiceExist(clinicalProviderServiceName: string) {
    try {
      return this.data.clinicalProviderService.findMany({ where: { name: clinicalProviderServiceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClinicalProviderService(userId: string, input: UserCreateClinicalProviderServiceInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const clinicalProviderServiceData = await this.checkClinicalProviderServiceExist(input.name)

        if (clinicalProviderServiceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderService', 'Create', input)

    let clinicalProviderService = await this.data.clinicalProviderService.create({
      data: { 
  
                service: 
                input.serviceId != null
                ? {
                        connect:  { 
                            id: input.serviceId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

}
, include: {service: true, clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderService', 'Create', clinicalProviderService)

    return clinicalProviderService

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Clinical Provider Service')
    }

  }


  
  

  async userUpdateClinicalProviderService(userId: string, clinicalProviderServiceId: string, input: UserUpdateClinicalProviderServiceInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!clinicalProviderServiceId) {
        throw new BadRequestException('Clinical Provider Service Id is required')
      } else {

      const clinicalProviderServiceData = await this.checkClinicalProviderServiceExist(input.name)

      if (clinicalProviderServiceData.length > 0) {
        if (clinicalProviderServiceData[0].id != clinicalProviderServiceId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderService', 'Update', input)

    let clinicalProviderService = this.data.clinicalProviderService.update({
      where: { id: clinicalProviderServiceId },
      data: {
  
                service: 
                input.serviceId != null
                ? {
                        connect:  { 
                            id: input.serviceId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

}
, include: {service: true, clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderService', 'Update', clinicalProviderService)

    return clinicalProviderService

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Clinical Provider Service')
    }
  }

  async userUpdateClinicalProviderServices(userId: string, input: UserUpdateClinicalProviderServicesInput): Promise<UpdateResult> {
    const total = input.clinicalProviderServices.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.clinicalProviderServices) {
      const inputData = input.clinicalProviderServices[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
serviceId: inputData.serviceId, 
clinicalProviderId: inputData.clinicalProviderId, 

      }

      const clinicalProviderServiceData = await this.checkClinicalProviderServiceExist(inputData.name)

      if (clinicalProviderServiceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.clinicalProviderService.upsert({
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


  async userDeleteClinicalProviderService(userId: string, clinicalProviderServiceId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!clinicalProviderServiceId) {
        throw new BadRequestException('Clinical Provider Service Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'ClinicalProviderService', 'Delete', clinicalProviderServiceId)

        let clinicalProviderService = this.data.clinicalProviderService.delete({
          where: { id: clinicalProviderServiceId }
        })

        await this.data.logEvent(sendingUser, false, 'ClinicalProviderService', 'Delete', clinicalProviderService)

        return clinicalProviderService

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Clinical Provider Service')
    }
  }
}

