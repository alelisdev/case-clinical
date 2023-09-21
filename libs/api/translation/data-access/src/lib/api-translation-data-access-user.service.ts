
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateTranslationInput } from './dto/user-create-translation.input'
import { UserListTranslationInput } from './dto/user-list-translation.input'
import { UserUpdateTranslationInput } from './dto/user-update-translation.input'


@Injectable()
export class ApiTranslationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTranslations(userId: string, input?: UserListTranslationInput) {
    return this.data.translation.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userSelectTranslations(userId: string, input?: UserListTranslationInput) {
    return this.data.translation.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
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

  async userCountTranslations(userId: string, input?: UserListTranslationInput): Promise<CorePaging> {

    const total = await this.data.translation.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
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

  async userTranslation(userId: string, translationId) {

    return this.data.translation.findUnique({ where: { id: translationId }  })
  }

  async checkTranslationExist(translationName: string) {
    try {
      return this.data.translation.findMany({ where: { name: translationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTranslation(userId: string, input: UserCreateTranslationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const translationData = await this.checkTranslationExist(input.name)

        if (translationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Translation', 'Create', input)

    let translation = await this.data.translation.create({
      data: {
name: input.name,
languageCode: input.languageCode,
translation: input.translation,

}

    })

    await this.data.logEvent(sendingUser, false, 'Translation', 'Create', translation)

    return translation

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Translation')
    }

  }





  async userUpdateTranslation(userId: string, translationId: string, input: UserUpdateTranslationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!translationId) {
        throw new BadRequestException('Translation Id is required')
      } else {

      const translationData = await this.checkTranslationExist(input.name)

      if (translationData.length > 0) {
        if (translationData[0].id != translationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Translation', 'Update', input)

    let translation = this.data.translation.update({
      where: { id: translationId },
      data: {
name: input.name,
languageCode: input.languageCode,
translation: input.translation,

}

    })

    await this.data.logEvent(sendingUser, false, 'Translation', 'Update', translation)

    return translation

      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Error in updating Translation')
      }
      throw new InternalServerErrorException('Error in updating Translation')
    }
  }

  async userDeleteTranslation(userId: string, translationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!translationId) {
        throw new BadRequestException('Translation Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'Translation', 'Delete', translationId)

        let translation = this.data.translation.delete({
          where: { id: translationId }
        })

        await this.data.logEvent(sendingUser, false, 'Translation', 'Delete', translation)

        return translation

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw new BadRequestException('Error in deleting Translation')
        }
            throw new InternalServerErrorException('Error in deleting Translation')
    }
  }
}

