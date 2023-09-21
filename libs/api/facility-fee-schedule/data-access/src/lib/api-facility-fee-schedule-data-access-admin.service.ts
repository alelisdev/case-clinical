
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateFacilityFeeScheduleInput } from './dto/admin-create-facility-fee-schedule.input'
import { AdminListFacilityFeeScheduleInput } from './dto/admin-list-facility-fee-schedule.input'
import { AdminListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { AdminListSpecialtyInput } from '@case-clinical/api/specialty/data-access'
import { AdminUpdateFacilityFeeScheduleInput } from './dto/admin-update-facility-fee-schedule.input'

@Injectable()
export class ApiFacilityFeeScheduleDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminFacilityFeeSchedules(adminId: string, input?: AdminListFacilityFeeScheduleInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.facilityFeeSchedule.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {organization: true, specialty: true}
    })
  }

  async adminCountFacilityFeeSchedules(adminId: string, input?: AdminListFacilityFeeScheduleInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.facilityFeeSchedule.count(
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

  
  

  async adminFacilityFeeSchedule(adminId: string, facilityFeeScheduleId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.facilityFeeSchedule.findUnique({ where: { id: facilityFeeScheduleId } , include: {organization: true, specialty: true} })
  }

  async checkFacilityFeeScheduleExist(facilityFeeScheduleName: string) {
    try {
      return this.data.facilityFeeSchedule.findMany({ where: { name: facilityFeeScheduleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateFacilityFeeSchedule(adminId: string, input: AdminCreateFacilityFeeScheduleInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const facilityFeeScheduleData = await this.checkFacilityFeeScheduleExist(input.name)

      if (facilityFeeScheduleData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.facilityFeeSchedule.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateFacilityFeeSchedule(adminId: string, facilityFeeScheduleId, input: AdminUpdateFacilityFeeScheduleInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.facilityFeeSchedule.update({
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
  }

  async adminDeleteFacilityFeeSchedule(adminId: string, facilityFeeScheduleId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.facilityFeeSchedule.delete({ where: { id: facilityFeeScheduleId } })
  }
}

