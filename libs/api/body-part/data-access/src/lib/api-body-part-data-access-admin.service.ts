
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateBodyPartInput } from './dto/admin-create-body-part.input'
import { AdminListBodyPartInput } from './dto/admin-list-body-part.input'

import { AdminUpdateBodyPartInput } from './dto/admin-update-body-part.input'

@Injectable()
export class ApiBodyPartDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminBodyParts(adminId: string, input?: AdminListBodyPartInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.bodyPart.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountBodyParts(adminId: string, input?: AdminListBodyPartInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.bodyPart.count(
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

  
  

  async adminBodyPart(adminId: string, bodyPartId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.bodyPart.findUnique({ where: { id: bodyPartId } , include: {leads: true} })
  }

  async checkBodyPartExist(bodyPartName: string) {
    try {
      return this.data.bodyPart.findMany({ where: { name: bodyPartName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateBodyPart(adminId: string, input: AdminCreateBodyPartInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const bodyPartData = await this.checkBodyPartExist(input.name)

      if (bodyPartData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.bodyPart.create({
          data: { 
    name: input.name, 

    }
    , include: {leads: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateBodyPart(adminId: string, bodyPartId, input: AdminUpdateBodyPartInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.bodyPart.update({
      where: { id: bodyPartId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })
  }

  async adminDeleteBodyPart(adminId: string, bodyPartId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.bodyPart.delete({ where: { id: bodyPartId } })
  }
}

