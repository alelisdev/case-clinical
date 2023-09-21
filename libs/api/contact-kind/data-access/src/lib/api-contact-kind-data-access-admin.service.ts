
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContactKindInput } from './dto/admin-create-contact-kind.input'
import { AdminListContactKindInput } from './dto/admin-list-contact-kind.input'

import { AdminUpdateContactKindInput } from './dto/admin-update-contact-kind.input'

@Injectable()
export class ApiContactKindDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContactKinds(adminId: string, input?: AdminListContactKindInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contactKind.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountContactKinds(adminId: string, input?: AdminListContactKindInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactKind.count(
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

  
  

  async adminContactKind(adminId: string, contactKindId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contactKind.findUnique({ where: { id: contactKindId } , include: {contacts: true} })
  }

  async checkContactKindExist(contactKindName: string) {
    try {
      return this.data.contactKind.findMany({ where: { name: contactKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContactKind(adminId: string, input: AdminCreateContactKindInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contactKindData = await this.checkContactKindExist(input.name)

      if (contactKindData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contactKind.create({
          data: { 
    name: input.name, 

    }
    , include: {contacts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContactKind(adminId: string, contactKindId, input: AdminUpdateContactKindInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactKind.update({
      where: { id: contactKindId },
      data: {
name: input.name, 

}
, include: {contacts: true} 
    })
  }

  async adminDeleteContactKind(adminId: string, contactKindId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactKind.delete({ where: { id: contactKindId } })
  }
}

