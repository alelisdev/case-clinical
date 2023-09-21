
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateVisitKindInput } from './dto/user-create-visit-kind.input'
import { UserListVisitKindInput } from './dto/user-list-visit-kind.input'
import { UserUpdateVisitKindInput } from './dto/user-update-visit-kind.input'
import { UserUpdateVisitKindsInput } from './dto/user-update-visit-kinds.input'



@Injectable()
export class ApiVisitKindDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userVisitKinds(userId: string, input?: UserListVisitKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.visitKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectVisitKinds(userId: string, input?: UserListVisitKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.visitKind.findMany({
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

  async userCountVisitKinds(userId: string, input?: UserListVisitKindInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.visitKind.count(
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

  async userVisitKind(userId: string, visitKindId) {

    return this.data.visitKind.findUnique({ where: { id: visitKindId } , include: {priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, 
      prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true}}}  })
  }

  async checkVisitKindExist(visitKindName: string) {
    try {
      return this.data.visitKind.findMany({ where: { name: visitKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateVisitKind(userId: string, input: UserCreateVisitKindInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const visitKindData = await this.checkVisitKindExist(input.name)

        if (visitKindData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'VisitKind', 'Create', input)

    let visitKind = await this.data.visitKind.create({
      data: { 
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'VisitKind', 'Create', visitKind)

    return visitKind

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Visit Kind')
    }

  }


  
  

  async userUpdateVisitKind(userId: string, visitKindId: string, input: UserUpdateVisitKindInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!visitKindId) {
        throw new BadRequestException('Visit Kind Id is required')
      } else {

      const visitKindData = await this.checkVisitKindExist(input.name)

      if (visitKindData.length > 0) {
        if (visitKindData[0].id != visitKindId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'VisitKind', 'Update', input)

    let visitKind = this.data.visitKind.update({
      where: { id: visitKindId },
      data: {
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'VisitKind', 'Update', visitKind)

    return visitKind

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Visit Kind')
    }
  }

  async userUpdateVisitKinds(userId: string, input: UserUpdateVisitKindsInput): Promise<UpdateResult> {
    const total = input.visitKinds.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.visitKinds) {
      const inputData = input.visitKinds[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
code: inputData.code, 

      }

      const visitKindData = await this.checkVisitKindExist(inputData.name)

      if (visitKindData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.visitKind.upsert({
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


  async userDeleteVisitKind(userId: string, visitKindId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!visitKindId) {
        throw new BadRequestException('Visit Kind Id is required')
      } else {

        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { visitKindId: visitKindId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }

        await this.data.logEvent(sendingUser, true, 'VisitKind', 'Delete', visitKindId)

        let visitKind = this.data.visitKind.delete({
          where: { id: visitKindId }
        })

        await this.data.logEvent(sendingUser, false, 'VisitKind', 'Delete', visitKind)

        return visitKind

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Visit Kind')
    }
  }
}

