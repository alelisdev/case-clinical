
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateImplantInput } from './dto/user-create-implant.input'
import { UserListImplantInput } from './dto/user-list-implant.input'
import { UserUpdateImplantInput } from './dto/user-update-implant.input'
import { UserUpdateImplantsInput } from './dto/user-update-implants.input'

import { UserListImplantCategoryInput } from '@case-clinical/api/implant-category/data-access'
import { UserListContactInput } from '@case-clinical/api/contact/data-access'
import { UserListManufacturerInput } from '@case-clinical/api/manufacturer/data-access'

@Injectable()
export class ApiImplantDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userImplants(userId: string, input?: UserListImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantCategoryId: input?.implantCategoryId,
salesRepresentativeId: input?.salesRepresentativeId,
manufacturerId: input?.manufacturerId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {implantCategory: true, salesRepresentative: true, manufacturer: true}
    })
  }

  async userSelectImplants(userId: string, input?: UserListImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantCategoryId: input?.implantCategoryId,
salesRepresentativeId: input?.salesRepresentativeId,
manufacturerId: input?.manufacturerId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountImplants(userId: string, input?: UserListImplantInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.implant.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            implantCategoryId: input?.implantCategoryId,
salesRepresentativeId: input?.salesRepresentativeId,
manufacturerId: input?.manufacturerId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userImplant(userId: string, implantId) {

    return this.data.implant.findUnique({ where: { id: implantId } , include: {implantCategory: true, salesRepresentative: true, manufacturer: true, priorAuthorizationImplants: {include: {implant: true, priorAuthorizationRequest: true}}}  })
  }

  async checkImplantExist(implantName: string) {
    try {
      return this.data.implant.findMany({ where: { name: implantName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateImplant(userId: string, input: UserCreateImplantInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const implantData = await this.checkImplantExist(input.name)

        if (implantData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Implant', 'Create', input)

    let implant = await this.data.implant.create({
      data: { 
  
                implantCategory: 
                input.implantCategoryId != null
                ? {
                        connect:  { 
                            id: input.implantCategoryId
                        }
                    }: undefined,  
                salesRepresentative: 
                input.salesRepresentativeId != null
                ? {
                        connect:  { 
                            id: input.salesRepresentativeId
                        }
                    }: undefined,  
                manufacturer: 
                input.manufacturerId != null
                ? {
                        connect:  { 
                            id: input.manufacturerId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 
photoUrl: input.photoUrl, 
sku: input.sku, 

}
, include: {implantCategory: true, salesRepresentative: true, manufacturer: true, priorAuthorizationImplants: {include: {implant: true, priorAuthorizationRequest: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Implant', 'Create', implant)

    return implant

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Implant')
    }

  }


  
  

  async userUpdateImplant(userId: string, implantId: string, input: UserUpdateImplantInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!implantId) {
        throw new BadRequestException('Implant Id is required')
      } else {

      const implantData = await this.checkImplantExist(input.name)

      if (implantData.length > 0) {
        if (implantData[0].id != implantId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Implant', 'Update', input)

    let implant = this.data.implant.update({
      where: { id: implantId },
      data: {
  
                implantCategory: 
                input.implantCategoryId != null
                ? {
                        connect:  { 
                            id: input.implantCategoryId
                        }
                    }: undefined,  
                salesRepresentative: 
                input.salesRepresentativeId != null
                ? {
                        connect:  { 
                            id: input.salesRepresentativeId
                        }
                    }: undefined,  
                manufacturer: 
                input.manufacturerId != null
                ? {
                        connect:  { 
                            id: input.manufacturerId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 
photoUrl: input.photoUrl, 
sku: input.sku, 

}
, include: {implantCategory: true, salesRepresentative: true, manufacturer: true, priorAuthorizationImplants: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Implant', 'Update', implant)

    return implant

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Implant')
    }
  }

  async userUpdateImplants(userId: string, input: UserUpdateImplantsInput): Promise<UpdateResult> {
    const total = input.implants.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.implants) {
      const inputData = input.implants[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
estimatedCost: inputData.estimatedCost, 
implantCategoryId: inputData.implantCategoryId, 
manufacturerId: inputData.manufacturerId, 
photoUrl: inputData.photoUrl, 
salesRepresentativeId: inputData.salesRepresentativeId, 
sku: inputData.sku, 

      }

      const implantData = await this.checkImplantExist(inputData.name)

      if (implantData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.implant.upsert({
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


  async userDeleteImplant(userId: string, implantId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!implantId) {
        throw new BadRequestException('Implant Id is required')
      } else {

        const priorAuthorizationImplantCount = await this.data.priorAuthorizationImplant.count({ where: { implantId: implantId }})
        if(priorAuthorizationImplantCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Implant')
        }

        await this.data.logEvent(sendingUser, true, 'Implant', 'Delete', implantId)

        let implant = this.data.implant.delete({
          where: { id: implantId }
        })

        await this.data.logEvent(sendingUser, false, 'Implant', 'Delete', implant)

        return implant

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Implant')
    }
  }
}

