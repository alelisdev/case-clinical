
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateFacilityFeeScheduleInput } from './dto/user-create-facility-fee-schedule.input'
import { UserListFacilityFeeScheduleInput } from './dto/user-list-facility-fee-schedule.input'
import { UserUpdateFacilityFeeScheduleInput } from './dto/user-update-facility-fee-schedule.input'
import { UserUpdateFacilityFeeSchedulesInput } from './dto/user-update-facility-fee-schedules.input'

import { UserListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { UserListSpecialtyInput } from '@case-clinical/api/specialty/data-access'

@Injectable()
export class ApiFacilityFeeScheduleDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userFacilityFeeSchedules(userId: string, input?: UserListFacilityFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.facilityFeeSchedule.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input?.organizationId,
specialtyId: input?.specialtyId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {organization: true, specialty: true}
    })
  }

  async userSelectFacilityFeeSchedules(userId: string, input?: UserListFacilityFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.facilityFeeSchedule.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input?.organizationId,
specialtyId: input?.specialtyId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountFacilityFeeSchedules(userId: string, input?: UserListFacilityFeeScheduleInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.facilityFeeSchedule.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input?.organizationId,
specialtyId: input?.specialtyId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userFacilityFeeSchedule(userId: string, facilityFeeScheduleId) {

    return this.data.facilityFeeSchedule.findUnique({ where: { id: facilityFeeScheduleId } , include: {organization: true, specialty: true}  })
  }

  async checkFacilityFeeScheduleExist(facilityFeeScheduleName: string, organizationId:string) {
    try {
      return this.data.facilityFeeSchedule.findMany({ where: { name: facilityFeeScheduleName, organizationId:organizationId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateFacilityFeeSchedule(userId: string, input: UserCreateFacilityFeeScheduleInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try { 

    await this.data.logEvent(sendingUser, true, 'FacilityFeeSchedule', 'Create', input)

    let facilityFeeSchedule = await this.data.facilityFeeSchedule.create({
      data: { 
  
                organization: 
                input.organizationId != null
                ? {
                        connect:  { 
                            id: input.organizationId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
code: input.code, 
modifier: input.modifier, 
description: input.description, 
medicareFacilityRate: input.medicareFacilityRate, 
facilityFee: input.facilityFee, 
baseUnit: input.baseUnit, 
profCf: input.profCf, 

}
, include: {organization: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'FacilityFeeSchedule', 'Create', facilityFeeSchedule)

    return facilityFeeSchedule

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Facility Fee Schedule')
    }

  }


  
  

  async userUpdateFacilityFeeSchedule(userId: string, facilityFeeScheduleId: string, input: UserUpdateFacilityFeeScheduleInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!facilityFeeScheduleId) {
        throw new BadRequestException('Facility Fee Schedule Id is required')
      } else {

      const facilityFeeScheduleData = await this.checkFacilityFeeScheduleExist(input.name, input.organizationId)
 



    await this.data.logEvent(sendingUser, true, 'FacilityFeeSchedule', 'Update', input)

    let facilityFeeSchedule = this.data.facilityFeeSchedule.update({
      where: { id: facilityFeeScheduleId },
      data: {
  
                organization: 
                input.organizationId != null
                ? {
                        connect:  { 
                            id: input.organizationId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
code: input.code, 
modifier: input.modifier, 
description: input.description, 
medicareFacilityRate: input.medicareFacilityRate, 
facilityFee: input.facilityFee, 
baseUnit: input.baseUnit, 
profCf: input.profCf, 

}
, include: {organization: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'FacilityFeeSchedule', 'Update', facilityFeeSchedule)

    return facilityFeeSchedule

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Facility Fee Schedule')
    }
  }

  async userUpdateFacilityFeeSchedules(userId: string, input: UserUpdateFacilityFeeSchedulesInput): Promise<UpdateResult> {
    const total = input.facilityFeeSchedules.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.facilityFeeSchedules) {
      const inputData = input.facilityFeeSchedules[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
organizationId: inputData.organizationId, 
specialtyId: inputData.specialtyId, 
code: inputData.code, 
modifier: inputData.modifier, 
description: inputData.description, 
medicareFacilityRate: inputData.medicareFacilityRate, 
facilityFee: inputData.facilityFee, 
baseUnit: inputData.baseUnit, 
profCf: inputData.profCf, 

      }

      const facilityFeeScheduleData = await this.checkFacilityFeeScheduleExist(inputData.name, inputData.organizationId)

      if (facilityFeeScheduleData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.facilityFeeSchedule.upsert({
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


  async userDeleteFacilityFeeSchedule(userId: string, facilityFeeScheduleId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!facilityFeeScheduleId) {
        throw new BadRequestException('Facility Fee Schedule Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'FacilityFeeSchedule', 'Delete', facilityFeeScheduleId)

        let facilityFeeSchedule = this.data.facilityFeeSchedule.delete({
          where: { id: facilityFeeScheduleId }
        })

        await this.data.logEvent(sendingUser, false, 'FacilityFeeSchedule', 'Delete', facilityFeeSchedule)

        return facilityFeeSchedule

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Facility Fee Schedule')
    }
  }
}

