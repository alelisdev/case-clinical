
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLeadInjuryInput } from './dto/user-create-lead-injury.input'
import { UserListLeadInjuryInput } from './dto/user-list-lead-injury.input'
import { UserUpdateLeadInjuryInput } from './dto/user-update-lead-injury.input'
import { UserUpdateLeadInjuriesInput } from './dto/user-update-lead-injuries.input'

import { UserListLeadInput } from '@case-clinical/api/lead/data-access'
import { UserListSeverityInput } from '@case-clinical/api/severity/data-access'

@Injectable()
export class ApiLeadInjuryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLeadInjuries(userId: string, input?: UserListLeadInjuryInput) {
    const name = input?.name ? input.name : undefined

    return this.data.leadInjury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
            severityId: input?.severityId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, severity: true}
    })
  }

  async userSelectLeadInjuries(userId: string, input?: UserListLeadInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadInjury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
severityId: input?.severityId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountLeadInjuries(userId: string, input?: UserListLeadInjuryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadInjury.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
severityId: input?.severityId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userLeadInjury(userId: string, leadInjuryId) {

    return this.data.leadInjury.findUnique({ where: { id: leadInjuryId } , include: {injuries: true, lead: true, severity: true}  })
  }

  async checkLeadInjuryExist(leadInjuryName: string) {
    try {
      return this.data.leadInjury.findMany({ where: { name: leadInjuryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLeadInjury(userId: string, input: UserCreateLeadInjuryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const leadInjuryData = await this.checkLeadInjuryExist(input.name)

        if (leadInjuryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'LeadInjury', 'Create', input)

    let leadInjury = await this.data.leadInjury.create({
      data: { 
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                severity: 
                input.severityId != null
                ? {
                        connect:  { 
                            id: input.severityId
                        }
                    }: undefined,name: input.name, 

}
, include: {injuries: true, lead: true, severity: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadInjury', 'Create', leadInjury)

    return leadInjury

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Lead Injury')
    }

  }


  
  

  async userUpdateLeadInjury(userId: string, leadInjuryId: string, input: UserUpdateLeadInjuryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!leadInjuryId) {
        throw new BadRequestException('Lead Injury Id is required')
      } else {

      const leadInjuryData = await this.checkLeadInjuryExist(input.name)

      if (leadInjuryData.length > 0) {
        if (leadInjuryData[0].id != leadInjuryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'LeadInjury', 'Update', input)

    let leadInjury = this.data.leadInjury.update({
      where: { id: leadInjuryId },
      data: {
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                severity: 
                input.severityId != null
                ? {
                        connect:  { 
                            id: input.severityId
                        }
                    }: undefined,name: input.name,

}
, include: {injuries: true, lead: true, severity: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadInjury', 'Update', leadInjury)

    return leadInjury

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Lead Injury')
    }
  }

  async userUpdateLeadInjuries(userId: string, input: UserUpdateLeadInjuriesInput): Promise<UpdateResult> {
    const total = input.leadInjuries.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.leadInjuries) {
      const inputData = input.leadInjuries[key]

      const data = {
        id: inputData.id, 
        name: inputData.name, 
        leadId: inputData.leadId, 
        bodyPartId: inputData.bodyPartId, 
        severityId: inputData.severityId, 
      }

      const leadInjuryData = await this.checkLeadInjuryExist(inputData.name)

      if (leadInjuryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.leadInjury.upsert({
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


  async userDeleteLeadInjury(userId: string, leadInjuryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!leadInjuryId) {
        throw new BadRequestException('Lead Injury Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'LeadInjury', 'Delete', leadInjuryId)

        let leadInjury = this.data.leadInjury.delete({
          where: { id: leadInjuryId }
        })

        await this.data.logEvent(sendingUser, false, 'LeadInjury', 'Delete', leadInjury)

        return leadInjury

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Lead Injury')
    }
  }
}

