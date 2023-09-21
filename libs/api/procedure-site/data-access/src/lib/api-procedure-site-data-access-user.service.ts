
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureSiteInput } from './dto/user-create-procedure-site.input'
import { UserListProcedureSiteInput } from './dto/user-list-procedure-site.input'
import { UserUpdateProcedureSiteInput } from './dto/user-update-procedure-site.input'
import { UserUpdateProcedureSitesInput } from './dto/user-update-procedure-sites.input'



@Injectable()
export class ApiProcedureSiteDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureSites(userId: string, input?: UserListProcedureSiteInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureSite.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectProcedureSites(userId: string, input?: UserListProcedureSiteInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureSite.findMany({
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

  async userCountProcedureSites(userId: string, input?: UserListProcedureSiteInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureSite.count(
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

  async userProcedureSite(userId: string, procedureSiteId) {

    return this.data.procedureSite.findUnique({ where: { id: procedureSiteId } , include: {priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true,  patient: true, caseProcedure: true}}}  })
  }

  async checkProcedureSiteExist(procedureSiteName: string) {
    try {
      return this.data.procedureSite.findMany({ where: { name: procedureSiteName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureSite(userId: string, input: UserCreateProcedureSiteInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureSiteData = await this.checkProcedureSiteExist(input.name)

        if (procedureSiteData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureSite', 'Create', input)

    let procedureSite = await this.data.procedureSite.create({
      data: { 
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureSite', 'Create', procedureSite)

    return procedureSite

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure Site')
    }

  }


  
  

  async userUpdateProcedureSite(userId: string, procedureSiteId: string, input: UserUpdateProcedureSiteInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureSiteId) {
        throw new BadRequestException('Procedure Site Id is required')
      } else {

      const procedureSiteData = await this.checkProcedureSiteExist(input.name)

      if (procedureSiteData.length > 0) {
        if (procedureSiteData[0].id != procedureSiteId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ProcedureSite', 'Update', input)

    let procedureSite = this.data.procedureSite.update({
      where: { id: procedureSiteId },
      data: {
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureSite', 'Update', procedureSite)

    return procedureSite

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure Site')
    }
  }

  async userUpdateProcedureSites(userId: string, input: UserUpdateProcedureSitesInput): Promise<UpdateResult> {
    const total = input.procedureSites.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedureSites) {
      const inputData = input.procedureSites[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
code: inputData.code, 

      }

      const procedureSiteData = await this.checkProcedureSiteExist(inputData.name)

      if (procedureSiteData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureSite.upsert({
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


  async userDeleteProcedureSite(userId: string, procedureSiteId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!procedureSiteId) {
        throw new BadRequestException('Procedure Site Id is required')
      } else {

        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { procedureSiteId: procedureSiteId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }

        await this.data.logEvent(sendingUser, true, 'ProcedureSite', 'Delete', procedureSiteId)

        let procedureSite = this.data.procedureSite.delete({
          where: { id: procedureSiteId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureSite', 'Delete', procedureSite)

        return procedureSite

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Procedure Site')
    }
  }
}

