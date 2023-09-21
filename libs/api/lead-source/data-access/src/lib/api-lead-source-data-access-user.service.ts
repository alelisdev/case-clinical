
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLeadSourceInput } from './dto/user-create-lead-source.input'
import { UserListLeadSourceInput } from './dto/user-list-lead-source.input'
import { UserUpdateLeadSourceInput } from './dto/user-update-lead-source.input'
import { UserUpdateLeadSourcesInput } from './dto/user-update-lead-sources.input'



@Injectable()
export class ApiLeadSourceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLeadSources(userId: string, input?: UserListLeadSourceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadSource.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectLeadSources(userId: string, input?: UserListLeadSourceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadSource.findMany({
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

  async userCountLeadSources(userId: string, input?: UserListLeadSourceInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadSource.count(
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

  async userLeadSource(userId: string, leadSourceId) {

    return this.data.leadSource.findUnique({ where: { id: leadSourceId } , include: {leads: true}  })
  }

  async checkLeadSourceExist(leadSourceName: string) {
    try {
      return this.data.leadSource.findMany({ where: { name: leadSourceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLeadSource(userId: string, input: UserCreateLeadSourceInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const leadSourceData = await this.checkLeadSourceExist(input.name)

        if (leadSourceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'LeadSource', 'Create', input)

    let leadSource = await this.data.leadSource.create({
      data: { 
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadSource', 'Create', leadSource)

    return leadSource

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Lead Source')
    }

  }


  
  

  async userUpdateLeadSource(userId: string, leadSourceId: string, input: UserUpdateLeadSourceInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!leadSourceId) {
        throw new BadRequestException('Lead Source Id is required')
      } else {

      const leadSourceData = await this.checkLeadSourceExist(input.name)

      if (leadSourceData.length > 0) {
        if (leadSourceData[0].id != leadSourceId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'LeadSource', 'Update', input)

    let leadSource = this.data.leadSource.update({
      where: { id: leadSourceId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadSource', 'Update', leadSource)

    return leadSource

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Lead Source')
    }
  }

  async userUpdateLeadSources(userId: string, input: UserUpdateLeadSourcesInput): Promise<UpdateResult> {
    const total = input.leadSources.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.leadSources) {
      const inputData = input.leadSources[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const leadSourceData = await this.checkLeadSourceExist(inputData.name)

      if (leadSourceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.leadSource.upsert({
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


  async userDeleteLeadSource(userId: string, leadSourceId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!leadSourceId) {
        throw new BadRequestException('Lead Source Id is required')
      } else {


        const leadCount = await this.data.lead.count({ where: { leadSourceId: leadSourceId }})
        if(leadCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Lead')
        }


        await this.data.logEvent(sendingUser, true, 'LeadSource', 'Delete', leadSourceId)

        let leadSource = this.data.leadSource.delete({
          where: { id: leadSourceId }
        })

        await this.data.logEvent(sendingUser, false, 'LeadSource', 'Delete', leadSource)

        return leadSource

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Lead Source')
    }
  }
}

