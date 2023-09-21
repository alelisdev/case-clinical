
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateInjuryInput } from './dto/user-create-injury.input'
import { UserListInjuryInput } from './dto/user-list-injury.input'
import { UserUpdateInjuryInput } from './dto/user-update-injury.input'
import { UserUpdateInjuriesInput } from './dto/user-update-injuries.input'



@Injectable()
export class ApiInjuryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userInjuries(userId: string, input?: UserListInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.injury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectInjuries(userId: string, input?: UserListInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.injury.findMany({
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

  async userCountInjuries(userId: string, input?: UserListInjuryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.injury.count(
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

  async userInjury(userId: string, injuryId) {

    return this.data.injury.findUnique({ where: { id: injuryId } , include: {leads: true}  })
  }

  async checkInjuryExist(injuryName: string) {
    try {
      return this.data.injury.findMany({ where: { name: injuryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateInjury(userId: string, input: UserCreateInjuryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const injuryData = await this.checkInjuryExist(input.name)

        if (injuryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Injury', 'Create', input)

    let injury = await this.data.injury.create({
      data: { 
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Injury', 'Create', injury)

    return injury

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Injury')
    }

  }


  
  

  async userUpdateInjury(userId: string, injuryId: string, input: UserUpdateInjuryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!injuryId) {
        throw new BadRequestException('Injury Id is required')
      } else {

      const injuryData = await this.checkInjuryExist(input.name)

      if (injuryData.length > 0) {
        if (injuryData[0].id != injuryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Injury', 'Update', input)

    let injury = this.data.injury.update({
      where: { id: injuryId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Injury', 'Update', injury)

    return injury

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Injury')
    }
  }

  async userUpdateInjuries(userId: string, input: UserUpdateInjuriesInput): Promise<UpdateResult> {
    const total = input.injuries.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.injuries) {
      const inputData = input.injuries[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const injuryData = await this.checkInjuryExist(inputData.name)

      if (injuryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.injury.upsert({
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


  async userDeleteInjury(userId: string, injuryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!injuryId) {
        throw new BadRequestException('Injury Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'Injury', 'Delete', injuryId)

        let injury = this.data.injury.delete({
          where: { id: injuryId }
        })

        await this.data.logEvent(sendingUser, false, 'Injury', 'Delete', injury)

        return injury

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Injury')
    }
  }
}

