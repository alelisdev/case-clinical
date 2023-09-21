
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateSpecialtyInput } from './dto/admin-create-specialty.input'
import { AdminListSpecialtyInput } from './dto/admin-list-specialty.input'

import { AdminUpdateSpecialtyInput } from './dto/admin-update-specialty.input'

@Injectable()
export class ApiSpecialtyDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminSpecialties(adminId: string, input?: AdminListSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.specialty.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountSpecialties(adminId: string, input?: AdminListSpecialtyInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.specialty.count(
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

  
  

  async adminSpecialty(adminId: string, specialtyId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.specialty.findUnique({ where: { id: specialtyId } , include: {clinicalProviderSpecialties: true, facilityFeeSchedules: true, feeSchedules: true} })
  }

  async checkSpecialtyExist(specialtyName: string) {
    try {
      return this.data.specialty.findMany({ where: { name: specialtyName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateSpecialty(adminId: string, input: AdminCreateSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const specialtyData = await this.checkSpecialtyExist(input.name)

      if (specialtyData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.specialty.create({
          data: { 
    name: input.name, 
active: input.active, 

    }
    , include: {clinicalProviderSpecialties: true, facilityFeeSchedules: true, feeSchedules: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateSpecialty(adminId: string, specialtyId, input: AdminUpdateSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.specialty.update({
      where: { id: specialtyId },
      data: {
name: input.name, 
active: input.active, 

}
, include: {clinicalProviderSpecialties: true, facilityFeeSchedules: true, feeSchedules: true} 
    })
  }

  async adminDeleteSpecialty(adminId: string, specialtyId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.specialty.delete({ where: { id: specialtyId } })
  }
}

