
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLanguageInput } from './dto/admin-create-language.input'
import { AdminListLanguageInput } from './dto/admin-list-language.input'

import { AdminUpdateLanguageInput } from './dto/admin-update-language.input'

@Injectable()
export class ApiLanguageDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLanguages(adminId: string, input?: AdminListLanguageInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.language.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountLanguages(adminId: string, input?: AdminListLanguageInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.language.count(
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

  
  

  async adminLanguage(adminId: string, languageId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.language.findUnique({ where: { id: languageId } , include: {patients: true} })
  }

  async checkLanguageExist(languageName: string) {
    try {
      return this.data.language.findMany({ where: { name: languageName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLanguage(adminId: string, input: AdminCreateLanguageInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const languageData = await this.checkLanguageExist(input.name)

      if (languageData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.language.create({
          data: { 
    name: input.name, 

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

  async adminUpdateLanguage(adminId: string, languageId, input: AdminUpdateLanguageInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.language.update({
      where: { id: languageId },
      data: {
name: input.name, 

}
, include: {patients: true} 
    })
  }

  async adminDeleteLanguage(adminId: string, languageId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.language.delete({ where: { id: languageId } })
  }
}

