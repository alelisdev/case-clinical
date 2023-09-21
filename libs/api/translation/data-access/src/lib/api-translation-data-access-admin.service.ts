
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateTranslationInput } from './dto/admin-create-translation.input'
import { AdminListTranslationInput } from './dto/admin-list-translation.input'

import { AdminUpdateTranslationInput } from './dto/admin-update-translation.input'

@Injectable()
export class ApiTranslationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTranslations(adminId: string, input?: AdminListTranslationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.translation.findMany({
      where: {
            name: {
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async adminCountTranslations(adminId: string, input?: AdminListTranslationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.translation.count(
    {
      where: {
            name: {
                contains: input?.name
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




  async adminTranslation(adminId: string, translationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.translation.findUnique({ where: { id: translationId } })
  }

  async adminCreateTranslation(adminId: string, input: AdminCreateTranslationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.translation.create({
      data: {
name: input.name,
languageCode: input.languageCode,
translation: input.translation,

}

    })
  }

  async adminUpdateTranslation(adminId: string, translationId, input: AdminUpdateTranslationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.translation.update({
      where: { id: translationId },
      data: {
name: input.name,
languageCode: input.languageCode,
translation: input.translation,

}

    })
  }

  async adminDeleteTranslation(adminId: string, translationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.translation.delete({ where: { id: translationId } })
  }
}

