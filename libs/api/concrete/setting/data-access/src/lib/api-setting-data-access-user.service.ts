
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateSettingInput } from './dto/user-create-setting.input'
import { UserListSettingInput } from './dto/user-list-setting.input'
import { UserUpdateSettingInput } from './dto/user-update-setting.input'
import { UserUpdateSettingsInput } from './dto/user-update-settings.input'

import { UserListUserInput } from '@case-clinical/api/user/data-access'

@Injectable()
export class ApiSettingDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userSettings(userId: string, input?: UserListSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.setting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {user: true}
    })
  }

  async userSelectSettings(userId: string, input?: UserListSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.setting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            userId: input.userId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountSettings(userId: string, input?: UserListSettingInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.setting.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            userId: input.userId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userSetting(userId: string, settingId) {

    return this.data.setting.findUnique({ where: { id: settingId } , include: {user: true}  })
  }

  async checkSettingExist(settingName: string) {
    try {
      return this.data.setting.findMany({ where: { name: settingName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateSetting(userId: string, input: UserCreateSettingInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const settingData = await this.checkSettingExist(input.name)

        if (settingData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Setting', 'Create', input)

    let setting = await this.data.setting.create({
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

    await this.data.logEvent(sendingUser, false, 'Setting', 'Create', setting)

    return setting

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Setting')
    }

  }





  async userUpdateSetting(userId: string, settingId: string, input: UserUpdateSettingInput) {
    const data = {
      name: input.name,
      value: input.value,
      dateFormat: input.dateFormat,
      timeFormat: input.timeFormat,
      startWeekOn: input.startWeekOn,
      userId: userId
    };
    return this.data.setting.upsert({
      where: { id: settingId },
      create: data,
      update: data
    })
  }

  async userUpdateSettings(userId: string, input: UserUpdateSettingsInput): Promise<UpdateResult> {
    const total = input.settings.length;
    let updated = [];
    let created = [];
    let failed = [];

    for(const key in input.settings) {
        const inputData = input.settings[key]

        const data =  {
            id: inputData.id,
name: inputData.name,
value: inputData.value,
dateFormat: inputData.dateFormat,
timeFormat: inputData.timeFormat,
startWeekOn: inputData.startWeekOn,
userId: inputData.userId,

        }

        try {
            const result = await this.data.setting.upsert({
            where: {id: inputData.id || ""},
              create: data,
              update: data
            })

            if(result.id === inputData.id)
              updated.push(result);
            else {
              created.push(result);
            }
          } catch (error) {
              failed.push(inputData);
          }
        }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed)
    }
  }


  async userDeleteSetting(userId: string, settingId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!settingId) {
        throw new BadRequestException('Setting Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'Setting', 'Delete', settingId)

        let setting = this.data.setting.delete({
          where: { id: settingId }
        })

        await this.data.logEvent(sendingUser, false, 'Setting', 'Delete', setting)

        return setting

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Setting')
    }
  }
}

