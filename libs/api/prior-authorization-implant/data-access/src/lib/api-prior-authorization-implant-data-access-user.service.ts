
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorAuthorizationImplantInput } from './dto/user-create-prior-authorization-implant.input'
import { UserListPriorAuthorizationImplantInput } from './dto/user-list-prior-authorization-implant.input'
import { UserUpdatePriorAuthorizationImplantInput } from './dto/user-update-prior-authorization-implant.input'
import { UserUpdatePriorAuthorizationImplantsInput } from './dto/user-update-prior-authorization-implants.input'

import { UserListImplantInput } from '@case-clinical/api/implant/data-access'
import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'

@Injectable()
export class ApiPriorAuthorizationImplantDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorAuthorizationImplants(userId: string, input?: UserListPriorAuthorizationImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationImplant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantId: input?.implantId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {implant: true, priorAuthorizationRequest: true}
    })
  }

  async userSelectPriorAuthorizationImplants(userId: string, input?: UserListPriorAuthorizationImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationImplant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantId: input?.implantId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPriorAuthorizationImplants(userId: string, input?: UserListPriorAuthorizationImplantInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationImplant.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            implantId: input?.implantId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPriorAuthorizationImplant(userId: string, priorAuthorizationImplantId) {

    return this.data.priorAuthorizationImplant.findUnique({ where: { id: priorAuthorizationImplantId } , include: {implant: true, priorAuthorizationRequest: true}  })
  }

  async checkPriorAuthorizationImplantExist(priorAuthorizationImplantName: string) {
    try {
      return this.data.priorAuthorizationImplant.findMany({ where: { name: priorAuthorizationImplantName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorAuthorizationImplant(userId: string, input: UserCreatePriorAuthorizationImplantInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorAuthorizationImplantData = await this.checkPriorAuthorizationImplantExist(input.name)

        if (priorAuthorizationImplantData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationImplant', 'Create', input)

    let priorAuthorizationImplant = await this.data.priorAuthorizationImplant.create({
      data: { 
  
                implant: 
                input.implantId != null
                ? {
                        connect:  { 
                            id: input.implantId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {implant: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationImplant', 'Create', priorAuthorizationImplant)

    return priorAuthorizationImplant

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Authorization Implant')
    }

  }


  
  

  async userUpdatePriorAuthorizationImplant(userId: string, priorAuthorizationImplantId: string, input: UserUpdatePriorAuthorizationImplantInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthorizationImplantId) {
        throw new BadRequestException('Prior Authorization Implant Id is required')
      } else {

      const priorAuthorizationImplantData = await this.checkPriorAuthorizationImplantExist(input.name)

      if (priorAuthorizationImplantData.length > 0) {
        if (priorAuthorizationImplantData[0].id != priorAuthorizationImplantId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationImplant', 'Update', input)

    let priorAuthorizationImplant = this.data.priorAuthorizationImplant.update({
      where: { id: priorAuthorizationImplantId },
      data: {
  
                implant: 
                input.implantId != null
                ? {
                        connect:  { 
                            id: input.implantId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {implant: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationImplant', 'Update', priorAuthorizationImplant)

    return priorAuthorizationImplant

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Authorization Implant')
    }
  }

  async userUpdatePriorAuthorizationImplants(userId: string, input: UserUpdatePriorAuthorizationImplantsInput): Promise<UpdateResult> {
    const total = input.priorAuthorizationImplants.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorAuthorizationImplants) {
      const inputData = input.priorAuthorizationImplants[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
estimatedCost: inputData.estimatedCost, 
implantId: inputData.implantId, 
priorAuthorizationRequestId: inputData.priorAuthorizationRequestId, 

      }

      const priorAuthorizationImplantData = await this.checkPriorAuthorizationImplantExist(inputData.name)

      if (priorAuthorizationImplantData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorAuthorizationImplant.upsert({
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


  async userDeletePriorAuthorizationImplant(userId: string, priorAuthorizationImplantId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorAuthorizationImplantId) {
        throw new BadRequestException('Prior Authorization Implant Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PriorAuthorizationImplant', 'Delete', priorAuthorizationImplantId)

        let priorAuthorizationImplant = this.data.priorAuthorizationImplant.delete({
          where: { id: priorAuthorizationImplantId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorAuthorizationImplant', 'Delete', priorAuthorizationImplant)

        return priorAuthorizationImplant

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Authorization Implant')
    }
  }
}

