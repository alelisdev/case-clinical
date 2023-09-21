
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLeadTreatmentInput } from './dto/user-create-lead-treatment.input'
import { UserListLeadTreatmentInput } from './dto/user-list-lead-treatment.input'
import { UserUpdateLeadTreatmentInput } from './dto/user-update-lead-treatment.input'
import { UserUpdateLeadTreatmentsInput } from './dto/user-update-lead-treatments.input'

import { UserListLeadInput } from '@case-clinical/api/lead/data-access'
import { UserListTreatmentInput } from '@case-clinical/api/treatment/data-access'

@Injectable()
export class ApiLeadTreatmentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLeadTreatments(userId: string, input?: UserListLeadTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadTreatment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
treatmentId: input?.treatmentId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, treatment: true}
    })
  }

  async userSelectLeadTreatments(userId: string, input?: UserListLeadTreatmentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadTreatment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
treatmentId: input?.treatmentId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountLeadTreatments(userId: string, input?: UserListLeadTreatmentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadTreatment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,
treatmentId: input?.treatmentId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userLeadTreatment(userId: string, leadTreatmentId) {

    return this.data.leadTreatment.findUnique({ where: { id: leadTreatmentId } , include: {lead: true, treatment: true}  })
  }

  async checkLeadTreatmentExist(leadTreatmentName: string) {
    try {
      return this.data.leadTreatment.findMany({ where: { name: leadTreatmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLeadTreatment(userId: string, input: UserCreateLeadTreatmentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const leadTreatmentData = await this.checkLeadTreatmentExist(input.name)

        if (leadTreatmentData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'LeadTreatment', 'Create', input)

    let leadTreatment = await this.data.leadTreatment.create({
      data: { 
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                treatment: 
                input.treatmentId != null
                ? {
                        connect:  { 
                            id: input.treatmentId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true, treatment: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadTreatment', 'Create', leadTreatment)

    return leadTreatment

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Lead Treatment')
    }

  }


  
  

  async userUpdateLeadTreatment(userId: string, leadTreatmentId: string, input: UserUpdateLeadTreatmentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!leadTreatmentId) {
        throw new BadRequestException('Lead Treatment Id is required')
      } else {

      const leadTreatmentData = await this.checkLeadTreatmentExist(input.name)

      if (leadTreatmentData.length > 0) {
        if (leadTreatmentData[0].id != leadTreatmentId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'LeadTreatment', 'Update', input)

    let leadTreatment = this.data.leadTreatment.update({
      where: { id: leadTreatmentId },
      data: {
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                treatment: 
                input.treatmentId != null
                ? {
                        connect:  { 
                            id: input.treatmentId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true, treatment: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadTreatment', 'Update', leadTreatment)

    return leadTreatment

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Lead Treatment')
    }
  }

  async userUpdateLeadTreatments(userId: string, input: UserUpdateLeadTreatmentsInput): Promise<UpdateResult> {
    const total = input.leadTreatments.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.leadTreatments) {
      const inputData = input.leadTreatments[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
leadId: inputData.leadId, 
treatmentId: inputData.treatmentId, 

      }

      const leadTreatmentData = await this.checkLeadTreatmentExist(inputData.name)

      if (leadTreatmentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.leadTreatment.upsert({
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


  async userDeleteLeadTreatment(userId: string, leadTreatmentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!leadTreatmentId) {
        throw new BadRequestException('Lead Treatment Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'LeadTreatment', 'Delete', leadTreatmentId)

        let leadTreatment = this.data.leadTreatment.delete({
          where: { id: leadTreatmentId }
        })

        await this.data.logEvent(sendingUser, false, 'LeadTreatment', 'Delete', leadTreatment)

        return leadTreatment

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Lead Treatment')
    }
  }
}

