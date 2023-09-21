
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateFeeScheduleInput } from './dto/user-create-fee-schedule.input'
import { UserListFeeScheduleInput } from './dto/user-list-fee-schedule.input'
import { UserUpdateFeeScheduleInput } from './dto/user-update-fee-schedule.input'
import { UserUpdateFeeSchedulesInput } from './dto/user-update-fee-schedules.input'

import { UserListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { UserListSpecialtyInput } from '@case-clinical/api/specialty/data-access'

@Injectable()
export class ApiFeeScheduleDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userFeeSchedules(userId: string, input?: UserListFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.feeSchedule.findMany({
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

  async userSelectFeeSchedules(userId: string, input?: UserListFeeScheduleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.feeSchedule.findMany({
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

  async userCountFeeSchedules(userId: string, input?: UserListFeeScheduleInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.feeSchedule.count(
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

  async userFeeSchedule(userId: string, feeScheduleId) {

    return this.data.feeSchedule.findUnique({ where: { id: feeScheduleId } , include: {organization: true, specialty: true}  })
  }

  async checkFeeScheduleExist(feeScheduleName: string, organizationId:string) {
    try {
      return this.data.feeSchedule.findMany({ where: { name: feeScheduleName, organizationId:organizationId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateFeeSchedule(userId: string, input: UserCreateFeeScheduleInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try { 

    await this.data.logEvent(sendingUser, true, 'FeeSchedule', 'Create', input)

    let feeSchedule = await this.data.feeSchedule.create({
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
medicarePhysicianNonFacilityRate: input.medicarePhysicianNonFacilityRate, 
physicianNonFacilityFee: input.physicianNonFacilityFee, 
medicarePhysicianFacilityRate: input.medicarePhysicianFacilityRate, 
physicianFacilityFee: input.physicianFacilityFee, 
baseUnit: input.baseUnit, 
profCf: input.profCf, 

}
, include: {organization: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'FeeSchedule', 'Create', feeSchedule)

    return feeSchedule

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Fee Schedule')
    }

  }


  
  

  async userUpdateFeeSchedule(userId: string, feeScheduleId: string, input: UserUpdateFeeScheduleInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!feeScheduleId) {
        throw new BadRequestException('Fee Schedule Id is required')
    } else { 

    await this.data.logEvent(sendingUser, true, 'FeeSchedule', 'Update', input)

    let feeSchedule = this.data.feeSchedule.update({
      where: { id: feeScheduleId },
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
medicarePhysicianNonFacilityRate: input.medicarePhysicianNonFacilityRate, 
physicianNonFacilityFee: input.physicianNonFacilityFee, 
medicarePhysicianFacilityRate: input.medicarePhysicianFacilityRate, 
physicianFacilityFee: input.physicianFacilityFee, 
baseUnit: input.baseUnit, 
profCf: input.profCf, 

}
, include: {organization: true, specialty: true} 
    })

    await this.data.logEvent(sendingUser, false, 'FeeSchedule', 'Update', feeSchedule)

    return feeSchedule

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Fee Schedule')
    }
  }

  async userUpdateFeeSchedules(userId: string, input: UserUpdateFeeSchedulesInput): Promise<UpdateResult> {
    const total = input.feeSchedules.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.feeSchedules) {
      const inputData = input.feeSchedules[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
organizationId: inputData.organizationId, 
specialtyId: inputData.specialtyId, 
code: inputData.code, 
modifier: inputData.modifier, 
description: inputData.description, 
medicarePhysicianNonFacilityRate: inputData.medicarePhysicianNonFacilityRate, 
physicianNonFacilityFee: inputData.physicianNonFacilityFee, 
medicarePhysicianFacilityRate: inputData.medicarePhysicianFacilityRate, 
physicianFacilityFee: inputData.physicianFacilityFee, 
baseUnit: inputData.baseUnit, 
profCf: inputData.profCf, 

      }

      const feeScheduleData = await this.checkFeeScheduleExist(inputData.name, inputData.organizationId)

      if (feeScheduleData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.feeSchedule.upsert({
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


  async userDeleteFeeSchedule(userId: string, feeScheduleId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!feeScheduleId) {
        throw new BadRequestException('Fee Schedule Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'FeeSchedule', 'Delete', feeScheduleId)

        let feeSchedule = this.data.feeSchedule.delete({
          where: { id: feeScheduleId }
        })

        await this.data.logEvent(sendingUser, false, 'FeeSchedule', 'Delete', feeSchedule)

        return feeSchedule

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Fee Schedule')
    }
  }
}

