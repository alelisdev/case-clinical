
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateFeeScheduleInput } from './dto/admin-create-fee-schedule.input'
import { AdminListFeeScheduleInput } from './dto/admin-list-fee-schedule.input'
import { AdminListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { AdminListSpecialtyInput } from '@case-clinical/api/specialty/data-access'
import { AdminUpdateFeeScheduleInput } from './dto/admin-update-fee-schedule.input'

@Injectable()
export class ApiFeeScheduleDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminFeeSchedules(adminId: string, input?: AdminListFeeScheduleInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.feeSchedule.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {organization: true, specialty: true}
    })
  }

  async adminCountFeeSchedules(adminId: string, input?: AdminListFeeScheduleInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.feeSchedule.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminFeeSchedule(adminId: string, feeScheduleId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.feeSchedule.findUnique({ where: { id: feeScheduleId } , include: {organization: true, specialty: true} })
  }

  async checkFeeScheduleExist(feeScheduleName: string) {
    try {
      return this.data.feeSchedule.findMany({ where: { name: feeScheduleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateFeeSchedule(adminId: string, input: AdminCreateFeeScheduleInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const feeScheduleData = await this.checkFeeScheduleExist(input.name)

      if (feeScheduleData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.feeSchedule.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateFeeSchedule(adminId: string, feeScheduleId, input: AdminUpdateFeeScheduleInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.feeSchedule.update({
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
  }

  async adminDeleteFeeSchedule(adminId: string, feeScheduleId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.feeSchedule.delete({ where: { id: feeScheduleId } })
  }
}

