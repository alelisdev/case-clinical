
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateWhereDoesItHurtSpecialtyInput } from './dto/admin-create-where-does-it-hurt-specialty.input'
import { AdminListWhereDoesItHurtSpecialtyInput } from './dto/admin-list-where-does-it-hurt-specialty.input'

import { AdminUpdateWhereDoesItHurtSpecialtyInput } from './dto/admin-update-where-does-it-hurt-specialty.input'

@Injectable()
export class ApiWhereDoesItHurtSpecialtyDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminWhereDoesItHurtSpecialties(adminId: string, input?: AdminListWhereDoesItHurtSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurtSpecialty.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { whereDoesItHurt: true, specialty: true }
    })
  }

  async adminCountWhereDoesItHurtSpecialties(adminId: string, input?: AdminListWhereDoesItHurtSpecialtyInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.whereDoesItHurtSpecialty.count(
    {
      where: { 
            name: { 
                contains: input?.name
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

  
  

  async adminWhereDoesItHurtSpecialty(adminId: string, whereDoesItHurtSpecialtyId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurtSpecialty.findUnique({ where: { id: whereDoesItHurtSpecialtyId } ,include: { whereDoesItHurt: true, specialty: true }})
  }

  async adminCreateWhereDoesItHurtSpecialty(adminId: string, input: AdminCreateWhereDoesItHurtSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurtSpecialty.create({
      data: { 
  
            whereDoesItHurt: 
            input.whereDoesItHurtId != null
            ? {
                    connect:  { 
                        id: input.whereDoesItHurtId
                    }
                }: undefined,  
            specialty: 
            input.specialtyId != null
            ? {
                    connect:  { 
                        id: input.specialtyId
                    }
                }: undefined,name: input.name, 
ordinal: input.ordinal, 

}
,include: { whereDoesItHurt: true, specialty: true }
    })
  }

  async adminUpdateWhereDoesItHurtSpecialty(adminId: string, whereDoesItHurtSpecialtyId, input: AdminUpdateWhereDoesItHurtSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurtSpecialty.update({
      where: { id: whereDoesItHurtSpecialtyId },
      data: {
      name: input.name,
      whereDoesItHurtId: input.whereDoesItHurtId,
      specialtyId: input.specialtyId,
      ordinal: input.ordinal
}
,include: { whereDoesItHurt: true, specialty: true }
    })
  }

  async adminDeleteWhereDoesItHurtSpecialty(adminId: string, whereDoesItHurtSpecialtyId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.whereDoesItHurtSpecialty.delete({ where: { id: whereDoesItHurtSpecialtyId } })
  }
}

