
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateSeverityInput } from './dto/user-create-severity.input'
import { UserListSeverityInput } from './dto/user-list-severity.input'
import { UserUpdateSeverityInput } from './dto/user-update-severity.input'
import { UserUpdateSeveritiesInput } from './dto/user-update-severities.input'



@Injectable()
export class ApiSeverityDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userSeverities(userId: string, input?: UserListSeverityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.severity.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectSeverities(userId: string, input?: UserListSeverityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.severity.findMany({
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

  async userCountSeverities(userId: string, input?: UserListSeverityInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.severity.count(
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

  async userSeverity(userId: string, severityId) {

    return this.data.severity.findUnique({ where: { id: severityId } , include: {leads: true}  })
  }

  async checkSeverityExist(severityName: string) {
    try {
      return this.data.severity.findMany({ where: { name: severityName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateSeverity(userId: string, input: UserCreateSeverityInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const severityData = await this.checkSeverityExist(input.name)

        if (severityData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Severity', 'Create', input)

    let severity = await this.data.severity.create({
      data: { 
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Severity', 'Create', severity)

    return severity

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Severity')
    }

  }


  
  

  async userUpdateSeverity(userId: string, severityId: string, input: UserUpdateSeverityInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!severityId) {
        throw new BadRequestException('Severity Id is required')
      } else {

      const severityData = await this.checkSeverityExist(input.name)

      if (severityData.length > 0) {
        if (severityData[0].id != severityId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Severity', 'Update', input)

    let severity = this.data.severity.update({
      where: { id: severityId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Severity', 'Update', severity)

    return severity

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Severity')
    }
  }

  async userUpdateSeverities(userId: string, input: UserUpdateSeveritiesInput): Promise<UpdateResult> {
    const total = input.severities.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.severities) {
      const inputData = input.severities[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const severityData = await this.checkSeverityExist(inputData.name)

      if (severityData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.severity.upsert({
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


  async userDeleteSeverity(userId: string, severityId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!severityId) {
        throw new BadRequestException('Severity Id is required')
      } else {


        const leadInjuryCount = await this.data.leadInjury.count({ where: { severityId: severityId }})
        if(leadInjuryCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Lead Injury')
        }


        await this.data.logEvent(sendingUser, true, 'Severity', 'Delete', severityId)

        let severity = this.data.severity.delete({
          where: { id: severityId }
        })

        await this.data.logEvent(sendingUser, false, 'Severity', 'Delete', severity)

        return severity

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Severity')
    }
  }
}

