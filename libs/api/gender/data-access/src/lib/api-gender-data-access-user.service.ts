
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateGenderInput } from './dto/user-create-gender.input'
import { UserListGenderInput } from './dto/user-list-gender.input'
import { UserUpdateGenderInput } from './dto/user-update-gender.input'
import { UserUpdateGendersInput } from './dto/user-update-genders.input'



@Injectable()
export class ApiGenderDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userGenders(userId: string, input?: UserListGenderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.gender.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectGenders(userId: string, input?: UserListGenderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.gender.findMany({
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

  async userCountGenders(userId: string, input?: UserListGenderInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.gender.count(
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

  async userGender(userId: string, genderId) {

    return this.data.gender.findUnique({ where: { id: genderId } , include: {patients: {include: {ethnicity: true, gender: true, language: true}}}  })
  }

  async checkGenderExist(genderName: string) {
    try {
      return this.data.gender.findMany({ where: { name: genderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateGender(userId: string, input: UserCreateGenderInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const genderData = await this.checkGenderExist(input.name)

        if (genderData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Gender', 'Create', input)

    let gender = await this.data.gender.create({
      data: { 
name: input.name, 
code: input.code, 
value: input.value, 

}
, include: {patients: {include: {ethnicity: true, gender: true, language: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Gender', 'Create', gender)

    return gender

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Gender')
    }

  }


  
  

  async userUpdateGender(userId: string, genderId: string, input: UserUpdateGenderInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!genderId) {
        throw new BadRequestException('Gender Id is required')
      } else {

      const genderData = await this.checkGenderExist(input.name)

      if (genderData.length > 0) {
        if (genderData[0].id != genderId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Gender', 'Update', input)

    let gender = this.data.gender.update({
      where: { id: genderId },
      data: {
name: input.name, 
code: input.code, 
value: input.value, 

}
, include: {patients: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Gender', 'Update', gender)

    return gender

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Gender')
    }
  }

  async userUpdateGenders(userId: string, input: UserUpdateGendersInput): Promise<UpdateResult> {
    const total = input.genders.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.genders) {
      const inputData = input.genders[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
code: inputData.code, 
value: inputData.value, 

      }

      const genderData = await this.checkGenderExist(inputData.name)

      if (genderData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.gender.upsert({
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


  async userDeleteGender(userId: string, genderId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!genderId) {
        throw new BadRequestException('Gender Id is required')
      } else {

        const patientCount = await this.data.patient.count({ where: { genderId: genderId }})
        if(patientCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Patient')
        }

        await this.data.logEvent(sendingUser, true, 'Gender', 'Delete', genderId)

        let gender = this.data.gender.delete({
          where: { id: genderId }
        })

        await this.data.logEvent(sendingUser, false, 'Gender', 'Delete', gender)

        return gender

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Gender')
    }
  }
}

