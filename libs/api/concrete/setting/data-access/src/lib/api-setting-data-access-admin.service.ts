
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateSettingInput } from './dto/admin-create-setting.input'
import { AdminListSettingInput } from './dto/admin-list-setting.input'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateSettingInput } from './dto/admin-update-setting.input'

@Injectable()
export class ApiSettingDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminSettings(adminId: string, input?: AdminListSettingInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.setting.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {user: true}
    })
  }

  async adminCountSettings(adminId: string, input?: AdminListSettingInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.setting.count(
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

  
  

  async adminSetting(adminId: string, settingId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.setting.findUnique({ where: { id: settingId } , include: {user: true} })
  }

  async checkSettingExist(settingName: string) {
    try {
      return this.data.setting.findMany({ where: { name: settingName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateSetting(adminId: string, input: AdminCreateSettingInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const settingData = await this.checkSettingExist(input.name)

      if (settingData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.setting.create({
          data: { 
      
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,name: input.name, 
value: input.value, 
dateFormat: input.dateFormat, 
timeFormat: input.timeFormat, 
startWeekOn: input.startWeekOn, 

    }
    , include: {user: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateSetting(adminId: string, settingId, input: AdminUpdateSettingInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.setting.update({
      where: { id: settingId },
      data: {
  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,name: input.name, 
value: input.value, 
dateFormat: input.dateFormat, 
timeFormat: input.timeFormat, 
startWeekOn: input.startWeekOn, 

}
, include: {user: true} 
    })
  }

  async adminDeleteSetting(adminId: string, settingId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.setting.delete({ where: { id: settingId } })
  }
}

