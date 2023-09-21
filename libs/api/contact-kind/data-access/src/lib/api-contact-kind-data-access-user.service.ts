
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContactKindInput } from './dto/user-create-contact-kind.input'
import { UserListContactKindInput } from './dto/user-list-contact-kind.input'
import { UserUpdateContactKindInput } from './dto/user-update-contact-kind.input'
import { UserUpdateContactKindsInput } from './dto/user-update-contact-kinds.input'



@Injectable()
export class ApiContactKindDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContactKinds(userId: string, input?: UserListContactKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectContactKinds(userId: string, input?: UserListContactKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountContactKinds(userId: string, input?: UserListContactKindInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactKind.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userContactKind(userId: string, contactKindId) {

    return this.data.contactKind.findUnique({ where: { id: contactKindId } , include: {contacts: true}  })
  }

  async checkContactKindExist(contactKindName: string) {
    try {
      return this.data.contactKind.findMany({ where: { name: contactKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContactKind(userId: string, input: UserCreateContactKindInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contactKindData = await this.checkContactKindExist(input.name)

        if (contactKindData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContactKind', 'Create', input)

    let contactKind = await this.data.contactKind.create({
      data: { 
name: input.name, 

}
, include: {contacts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactKind', 'Create', contactKind)

    return contactKind

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contact Kind')
    }

  }


  
  

  async userUpdateContactKind(userId: string, contactKindId: string, input: UserUpdateContactKindInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contactKindId) {
        throw new BadRequestException('Contact Kind Id is required')
      } else {

      const contactKindData = await this.checkContactKindExist(input.name)

      if (contactKindData.length > 0) {
        if (contactKindData[0].id != contactKindId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContactKind', 'Update', input)

    let contactKind = this.data.contactKind.update({
      where: { id: contactKindId },
      data: {
name: input.name, 

}
, include: {contacts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactKind', 'Update', contactKind)

    return contactKind

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contact Kind')
    }
  }

  async userUpdateContactKinds(userId: string, input: UserUpdateContactKindsInput): Promise<UpdateResult> {
    const total = input.contactKinds.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contactKinds) {
      const inputData = input.contactKinds[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const contactKindData = await this.checkContactKindExist(inputData.name)

      if (contactKindData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contactKind.upsert({
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


  async userDeleteContactKind(userId: string, contactKindId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contactKindId) {
        throw new BadRequestException('Contact Kind Id is required')
      } else {

        const contactCount = await this.data.contact.count({ where: { contactKindId: contactKindId }})
        if(contactCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contact')
        }

        await this.data.logEvent(sendingUser, true, 'ContactKind', 'Delete', contactKindId)

        let contactKind = this.data.contactKind.delete({
          where: { id: contactKindId }
        })

        await this.data.logEvent(sendingUser, false, 'ContactKind', 'Delete', contactKind)

        return contactKind

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contact Kind')
    }
  }
}

