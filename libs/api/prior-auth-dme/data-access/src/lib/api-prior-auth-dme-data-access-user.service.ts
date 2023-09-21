
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorAuthDmeInput } from './dto/user-create-prior-auth-dme.input'
import { UserListPriorAuthDmeInput } from './dto/user-list-prior-auth-dme.input'
import { UserUpdatePriorAuthDmeInput } from './dto/user-update-prior-auth-dme.input'
import { UserUpdatePriorAuthDmesInput } from './dto/user-update-prior-auth-dmes.input'

import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { UserListDurableMedicalEquipmentInput } from '@case-clinical/api/durable-medical-equipment/data-access'

@Injectable()
export class ApiPriorAuthDmeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorAuthDmes(userId: string, input?: UserListPriorAuthDmeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthDme.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthId: input?.priorAuthId,
durableMedicalEquipmentId: input?.durableMedicalEquipmentId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {priorAuthorizationRequest: true, durableMedicalEquipment: true}
    })
  }

  async userSelectPriorAuthDmes(userId: string, input?: UserListPriorAuthDmeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthDme.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthId: input?.priorAuthId,
durableMedicalEquipmentId: input?.durableMedicalEquipmentId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPriorAuthDmes(userId: string, input?: UserListPriorAuthDmeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthDme.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            priorAuthId: input?.priorAuthId,
durableMedicalEquipmentId: input?.durableMedicalEquipmentId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPriorAuthDme(userId: string, priorAuthDmeId) {

    return this.data.priorAuthDme.findUnique({ where: { id: priorAuthDmeId } , include: {priorAuthorizationRequest: true, durableMedicalEquipment: true}  })
  }

  async checkPriorAuthDmeExist(priorAuthDmeName: string) {
    try {
      return this.data.priorAuthDme.findMany({ where: { name: priorAuthDmeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorAuthDme(userId: string, input: UserCreatePriorAuthDmeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorAuthDmeData = await this.checkPriorAuthDmeExist(input.name)

        if (priorAuthDmeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorAuthDme', 'Create', input)

    let priorAuthDme = await this.data.priorAuthDme.create({
      data: { 
  
                priorAuthorizationRequest: 
                input.priorAuthId != null
                ? {
                        connect:  { 
                            id: input.priorAuthId
                        }
                    }: undefined,  
                durableMedicalEquipment: 
                input.durableMedicalEquipmentId != null
                ? {
                        connect:  { 
                            id: input.durableMedicalEquipmentId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {priorAuthorizationRequest: true, durableMedicalEquipment: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthDme', 'Create', priorAuthDme)

    return priorAuthDme

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Auth Dme')
    }

  }


  
  

  async userUpdatePriorAuthDme(userId: string, priorAuthDmeId: string, input: UserUpdatePriorAuthDmeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthDmeId) {
        throw new BadRequestException('Prior Auth Dme Id is required')
      } else {

      const priorAuthDmeData = await this.checkPriorAuthDmeExist(input.name)

      if (priorAuthDmeData.length > 0) {
        if (priorAuthDmeData[0].id != priorAuthDmeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorAuthDme', 'Update', input)

    let priorAuthDme = this.data.priorAuthDme.update({
      where: { id: priorAuthDmeId },
      data: {
  
                priorAuthorizationRequest: 
                input.priorAuthId != null
                ? {
                        connect:  { 
                            id: input.priorAuthId
                        }
                    }: undefined,  
                durableMedicalEquipment: 
                input.durableMedicalEquipmentId != null
                ? {
                        connect:  { 
                            id: input.durableMedicalEquipmentId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {priorAuthorizationRequest: true, durableMedicalEquipment: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthDme', 'Update', priorAuthDme)

    return priorAuthDme

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Auth Dme')
    }
  }

  async userUpdatePriorAuthDmes(userId: string, input: UserUpdatePriorAuthDmesInput): Promise<UpdateResult> {
    const total = input.priorAuthDmes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorAuthDmes) {
      const inputData = input.priorAuthDmes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
estimatedCost: inputData.estimatedCost, 
priorAuthId: inputData.priorAuthId, 
durableMedicalEquipmentId: inputData.durableMedicalEquipmentId, 

      }

      const priorAuthDmeData = await this.checkPriorAuthDmeExist(inputData.name)

      if (priorAuthDmeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorAuthDme.upsert({
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


  async userDeletePriorAuthDme(userId: string, priorAuthDmeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorAuthDmeId) {
        throw new BadRequestException('Prior Auth Dme Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PriorAuthDme', 'Delete', priorAuthDmeId)

        let priorAuthDme = this.data.priorAuthDme.delete({
          where: { id: priorAuthDmeId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorAuthDme', 'Delete', priorAuthDme)

        return priorAuthDme

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Auth Dme')
    }
  }
}

