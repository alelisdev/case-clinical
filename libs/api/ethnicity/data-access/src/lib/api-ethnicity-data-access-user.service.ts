
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateEthnicityInput } from './dto/user-create-ethnicity.input'
import { UserListEthnicityInput } from './dto/user-list-ethnicity.input'
import { UserUpdateEthnicityInput } from './dto/user-update-ethnicity.input'
import { UserUpdateEthnicitiesInput } from './dto/user-update-ethnicities.input'



@Injectable()
export class ApiEthnicityDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userEthnicities(userId: string, input?: UserListEthnicityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.ethnicity.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectEthnicities(userId: string, input?: UserListEthnicityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.ethnicity.findMany({
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

  async userCountEthnicities(userId: string, input?: UserListEthnicityInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.ethnicity.count(
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

  async userEthnicity(userId: string, ethnicityId) {

    return this.data.ethnicity.findUnique({ where: { id: ethnicityId } , include: {patients: {include: {ethnicity: true, gender: true, language: true}}}  })
  }

  async checkEthnicityExist(ethnicityName: string) {
    try {
      return this.data.ethnicity.findMany({ where: { name: ethnicityName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateEthnicity(userId: string, input: UserCreateEthnicityInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const ethnicityData = await this.checkEthnicityExist(input.name)

        if (ethnicityData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Ethnicity', 'Create', input)

    let ethnicity = await this.data.ethnicity.create({
      data: { 
name: input.name, 

}
, include: {patients: {include: {ethnicity: true, gender: true, language: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Ethnicity', 'Create', ethnicity)

    return ethnicity

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Ethnicity')
    }

  }


  
  

  async userUpdateEthnicity(userId: string, ethnicityId: string, input: UserUpdateEthnicityInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!ethnicityId) {
        throw new BadRequestException('Ethnicity Id is required')
      } else {

      const ethnicityData = await this.checkEthnicityExist(input.name)

      if (ethnicityData.length > 0) {
        if (ethnicityData[0].id != ethnicityId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Ethnicity', 'Update', input)

    let ethnicity = this.data.ethnicity.update({
      where: { id: ethnicityId },
      data: {
name: input.name, 

}
, include: {patients: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Ethnicity', 'Update', ethnicity)

    return ethnicity

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Ethnicity')
    }
  }

  async userUpdateEthnicities(userId: string, input: UserUpdateEthnicitiesInput): Promise<UpdateResult> {
    const total = input.ethnicities.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.ethnicities) {
      const inputData = input.ethnicities[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const ethnicityData = await this.checkEthnicityExist(inputData.name)

      if (ethnicityData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.ethnicity.upsert({
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


  async userDeleteEthnicity(userId: string, ethnicityId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!ethnicityId) {
        throw new BadRequestException('Ethnicity Id is required')
      } else {

        const patientCount = await this.data.patient.count({ where: { ethnicityId: ethnicityId }})
        if(patientCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Patient')
        }

        await this.data.logEvent(sendingUser, true, 'Ethnicity', 'Delete', ethnicityId)

        let ethnicity = this.data.ethnicity.delete({
          where: { id: ethnicityId }
        })

        await this.data.logEvent(sendingUser, false, 'Ethnicity', 'Delete', ethnicity)

        return ethnicity

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Ethnicity')
    }
  }
}

