
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateGenderInput } from './dto/admin-create-gender.input'
import { AdminListGenderInput } from './dto/admin-list-gender.input'

import { AdminUpdateGenderInput } from './dto/admin-update-gender.input'

@Injectable()
export class ApiGenderDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminGenders(adminId: string, input?: AdminListGenderInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.gender.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountGenders(adminId: string, input?: AdminListGenderInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.gender.count(
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

  
  

  async adminGender(adminId: string, genderId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.gender.findUnique({ where: { id: genderId } , include: {patients: true} })
  }

  async checkGenderExist(genderName: string) {
    try {
      return this.data.gender.findMany({ where: { name: genderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateGender(adminId: string, input: AdminCreateGenderInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const genderData = await this.checkGenderExist(input.name)

      if (genderData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.gender.create({
          data: { 
    name: input.name, 
code: input.code, 
value: input.value, 

    }
    , include: {patients: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateGender(adminId: string, genderId, input: AdminUpdateGenderInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.gender.update({
      where: { id: genderId },
      data: {
name: input.name, 
code: input.code, 
value: input.value, 

}
, include: {patients: true} 
    })
  }

  async adminDeleteGender(adminId: string, genderId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.gender.delete({ where: { id: genderId } })
  }
}

