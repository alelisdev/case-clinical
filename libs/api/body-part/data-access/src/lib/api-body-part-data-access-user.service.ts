
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateBodyPartInput } from './dto/user-create-body-part.input'
import { UserListBodyPartInput } from './dto/user-list-body-part.input'
import { UserUpdateBodyPartInput } from './dto/user-update-body-part.input'
import { UserUpdateBodyPartsInput } from './dto/user-update-body-parts.input'



@Injectable()
export class ApiBodyPartDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBodyParts(userId: string, input?: UserListBodyPartInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPart.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectBodyParts(userId: string, input?: UserListBodyPartInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bodyPart.findMany({
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

  async userCountBodyParts(userId: string, input?: UserListBodyPartInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.bodyPart.count(
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

  async userBodyPart(userId: string, bodyPartId) {

    return this.data.bodyPart.findUnique({ where: { id: bodyPartId } , include: {leads: true}  })
  }

  async checkBodyPartExist(bodyPartName: string) {
    try {
      return this.data.bodyPart.findMany({ where: { name: bodyPartName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateBodyPart(userId: string, input: UserCreateBodyPartInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const bodyPartData = await this.checkBodyPartExist(input.name)

        if (bodyPartData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'BodyPart', 'Create', input)

    let bodyPart = await this.data.bodyPart.create({
      data: { 
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'BodyPart', 'Create', bodyPart)

    return bodyPart

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Body Part')
    }

  }


  
  

  async userUpdateBodyPart(userId: string, bodyPartId: string, input: UserUpdateBodyPartInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!bodyPartId) {
        throw new BadRequestException('Body Part Id is required')
      } else {

      const bodyPartData = await this.checkBodyPartExist(input.name)

      if (bodyPartData.length > 0) {
        if (bodyPartData[0].id != bodyPartId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'BodyPart', 'Update', input)

    let bodyPart = this.data.bodyPart.update({
      where: { id: bodyPartId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'BodyPart', 'Update', bodyPart)

    return bodyPart

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Body Part')
    }
  }

  async userUpdateBodyParts(userId: string, input: UserUpdateBodyPartsInput): Promise<UpdateResult> {
    const total = input.bodyParts.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.bodyParts) {
      const inputData = input.bodyParts[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const bodyPartData = await this.checkBodyPartExist(inputData.name)

      if (bodyPartData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.bodyPart.upsert({
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


  async userDeleteBodyPart(userId: string, bodyPartId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!bodyPartId) {
        throw new BadRequestException('Body Part Id is required')
      } else {


        const bodyPartLeadCount = await this.data.bodyPartLead.count({ where: { bodyPartId: bodyPartId }})
        if(bodyPartLeadCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Body Part Lead')
        }


        await this.data.logEvent(sendingUser, true, 'BodyPart', 'Delete', bodyPartId)

        let bodyPart = this.data.bodyPart.delete({
          where: { id: bodyPartId }
        })

        await this.data.logEvent(sendingUser, false, 'BodyPart', 'Delete', bodyPart)

        return bodyPart

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Body Part')
    }
  }
}

