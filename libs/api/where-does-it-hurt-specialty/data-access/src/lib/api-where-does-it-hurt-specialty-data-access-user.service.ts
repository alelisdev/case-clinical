
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateWhereDoesItHurtSpecialtyInput } from './dto/user-create-where-does-it-hurt-specialty.input'
import { UserListWhereDoesItHurtSpecialtyInput } from './dto/user-list-where-does-it-hurt-specialty.input'
import { UserUpdateWhereDoesItHurtSpecialtyInput } from './dto/user-update-where-does-it-hurt-specialty.input'


@Injectable()
export class ApiWhereDoesItHurtSpecialtyDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userWhereDoesItHurtSpecialties(userId: string, input?: UserListWhereDoesItHurtSpecialtyInput) {

    return this.data.whereDoesItHurtSpecialty.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            whereDoesItHurtId: input.whereDoesItHurtId,
specialtyId: input.specialtyId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { whereDoesItHurt: true, specialty: true }
    })
  }


  async userCountWhereDoesItHurtSpecialties(userId: string, input?: UserListWhereDoesItHurtSpecialtyInput): Promise<CorePaging> {

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

  async userWhereDoesItHurtSpecialty(userId: string, whereDoesItHurtSpecialtyId) {

    return this.data.whereDoesItHurtSpecialty.findUnique({ where: { id: whereDoesItHurtSpecialtyId } ,include: { whereDoesItHurt: true, specialty: true } })
  }

  async userCreateWhereDoesItHurtSpecialty(userId: string, input: UserCreateWhereDoesItHurtSpecialtyInput) {

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

  
  

  async userUpdateWhereDoesItHurtSpecialty(userId: string, whereDoesItHurtSpecialtyId: string, input: UserUpdateWhereDoesItHurtSpecialtyInput) {

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

  async userDeleteWhereDoesItHurtSpecialty(userId: string, whereDoesItHurtSpecialtyId: string) {
    return this.data.whereDoesItHurtSpecialty.delete({ where: { id: whereDoesItHurtSpecialtyId } })
  }
}

