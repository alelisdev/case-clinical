
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLanguageInput } from './dto/user-create-language.input'
import { UserListLanguageInput } from './dto/user-list-language.input'
import { UserUpdateLanguageInput } from './dto/user-update-language.input'
import { UserUpdateLanguagesInput } from './dto/user-update-languages.input'



@Injectable()
export class ApiLanguageDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLanguages(userId: string, input?: UserListLanguageInput) {
    let name = input?.name ? input.name : undefined

    return this.data.language.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectLanguages(userId: string, input?: UserListLanguageInput) {
    let name = input?.name ? input.name : undefined

    return this.data.language.findMany({
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

  async userCountLanguages(userId: string, input?: UserListLanguageInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.language.count(
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

  async userLanguage(userId: string, languageId) {

    return this.data.language.findUnique({ where: { id: languageId } , include: {patients: {include: {ethnicity: true, gender: true, language: true}}}  })
  }

  async checkLanguageExist(languageName: string) {
    try {
      return this.data.language.findMany({ where: { name: languageName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLanguage(userId: string, input: UserCreateLanguageInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const languageData = await this.checkLanguageExist(input.name)

        if (languageData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Language', 'Create', input)

    let language = await this.data.language.create({
      data: { 
name: input.name, 

}
, include: {patients: {include: {ethnicity: true, gender: true, language: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Language', 'Create', language)

    return language

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }

  }


  
  

  async userUpdateLanguage(userId: string, languageId: string, input: UserUpdateLanguageInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!languageId) {
        throw new BadRequestException('Language Id is required')
      } else {

      const languageData = await this.checkLanguageExist(input.name)

      if (languageData.length > 0) {
        if (languageData[0].id != languageId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Language', 'Update', input)

    let language = this.data.language.update({
      where: { id: languageId },
      data: {
name: input.name, 

}
, include: {patients: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Language', 'Update', language)

    return language

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Language')
    }
  }

  async userUpdateLanguages(userId: string, input: UserUpdateLanguagesInput): Promise<UpdateResult> {
    const total = input.languages.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.languages) {
      const inputData = input.languages[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const languageData = await this.checkLanguageExist(inputData.name)

      if (languageData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.language.upsert({
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


  async userDeleteLanguage(userId: string, languageId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!languageId) {
        throw new BadRequestException('Language Id is required')
      } else {

        const patientCount = await this.data.patient.count({ where: { languageId: languageId }})
        if(patientCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Patient')
        }

        await this.data.logEvent(sendingUser, true, 'Language', 'Delete', languageId)

        let language = this.data.language.delete({
          where: { id: languageId }
        })

        await this.data.logEvent(sendingUser, false, 'Language', 'Delete', language)

        return language

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Language')
    }
  }
}

