
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateBodyPartLeadInput } from './dto/user-create-body-part-lead.input'
import { UserListBodyPartLeadInput } from './dto/user-list-body-part-lead.input'
import { UserUpdateBodyPartLeadInput } from './dto/user-update-body-part-lead.input'
import { UserUpdateBodyPartLeadsInput } from './dto/user-update-body-part-leads.input'

import { UserListLeadInput } from '@case-clinical/api/lead/data-access'
import { UserListBodyPartInput } from '@case-clinical/api/body-part/data-access'

@Injectable()
export class ApiBodyPartLeadDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBodyPartLeads(userId: string, input?: UserListBodyPartLeadInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPartLead.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
bodyPartId: input?.bodyPartId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, bodyPart: true}
    })
  }

  async userSelectBodyPartLeads(userId: string, input?: UserListBodyPartLeadInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPartLead.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
bodyPartId: input?.bodyPartId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountBodyPartLeads(userId: string, input?: UserListBodyPartLeadInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.bodyPartLead.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
bodyPartId: input?.bodyPartId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userBodyPartLead(userId: string, bodyPartLeadId) {

    return this.data.bodyPartLead.findUnique({ where: { id: bodyPartLeadId } , include: {lead: true, bodyPart: true}  })
  }

  async checkBodyPartLeadExist(bodyPartLeadName: string) {
    try {
      return this.data.bodyPartLead.findMany({ where: { name: bodyPartLeadName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateBodyPartLead(userId: string, input: UserCreateBodyPartLeadInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const bodyPartLeadData = await this.checkBodyPartLeadExist(input.name)

        if (bodyPartLeadData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'BodyPartLead', 'Create', input)

    let bodyPartLead = await this.data.bodyPartLead.create({
      data: { 
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                bodyPart: 
                input.bodyPartId != null
                ? {
                        connect:  { 
                            id: input.bodyPartId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true, bodyPart: true} 
    })

    await this.data.logEvent(sendingUser, false, 'BodyPartLead', 'Create', bodyPartLead)

    return bodyPartLead

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Body Part Lead')
    }

  }


  
  

  async userUpdateBodyPartLead(userId: string, bodyPartLeadId: string, input: UserUpdateBodyPartLeadInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!bodyPartLeadId) {
        throw new BadRequestException('Body Part Lead Id is required')
      } else {

      const bodyPartLeadData = await this.checkBodyPartLeadExist(input.name)

      if (bodyPartLeadData.length > 0) {
        if (bodyPartLeadData[0].id != bodyPartLeadId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'BodyPartLead', 'Update', input)

    let bodyPartLead = this.data.bodyPartLead.update({
      where: { id: bodyPartLeadId },
      data: {
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                bodyPart: 
                input.bodyPartId != null
                ? {
                        connect:  { 
                            id: input.bodyPartId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true, bodyPart: true} 
    })

    await this.data.logEvent(sendingUser, false, 'BodyPartLead', 'Update', bodyPartLead)

    return bodyPartLead

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Body Part Lead')
    }
  }

  async userUpdateBodyPartLeads(userId: string, input: UserUpdateBodyPartLeadsInput): Promise<UpdateResult> {
    const total = input.bodyPartLeads.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.bodyPartLeads) {
      const inputData = input.bodyPartLeads[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
leadId: inputData.leadId, 
bodyPartId: inputData.bodyPartId, 

      }

      const bodyPartLeadData = await this.checkBodyPartLeadExist(inputData.name)

      if (bodyPartLeadData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.bodyPartLead.upsert({
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


  async userDeleteBodyPartLead(userId: string, bodyPartLeadId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!bodyPartLeadId) {
        throw new BadRequestException('Body Part Lead Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'BodyPartLead', 'Delete', bodyPartLeadId)

        let bodyPartLead = this.data.bodyPartLead.delete({
          where: { id: bodyPartLeadId }
        })

        await this.data.logEvent(sendingUser, false, 'BodyPartLead', 'Delete', bodyPartLead)

        return bodyPartLead

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Body Part Lead')
    }
  }
}

