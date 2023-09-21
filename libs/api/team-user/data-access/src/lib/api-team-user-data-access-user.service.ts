
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateTeamUserInput } from './dto/user-create-team-user.input'
import { UserListTeamUserInput } from './dto/user-list-team-user.input'
import { UserUpdateTeamUserInput } from './dto/user-update-team-user.input'
import { UserUpdateTeamUsersInput } from './dto/user-update-team-users.input'

import { UserListTeamInput } from '@case-clinical/api/team/data-access'
import { UserListUserInput } from '@case-clinical/api/user/data-access'
import { UserListTeamRoleInput } from '@case-clinical/api/team-role/data-access'

@Injectable()
export class ApiTeamUserDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTeamUsers(userId: string, input?: UserListTeamUserInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamUser.findMany({
      where: {
            AND: [{
            name: { contains: name },
            teamId: input.teamId,
userId: input.userId,
teamRoleId: input.teamRoleId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {team: true, user: true, teamRole: true}
    })
  }

  async userSelectTeamUsers(userId: string, input?: UserListTeamUserInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamUser.findMany({
      where: {
            AND: [{
            name: { contains: name },
            teamId: input.teamId,
userId: input.userId,
teamRoleId: input.teamRoleId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountTeamUsers(userId: string, input?: UserListTeamUserInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.teamUser.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            teamId: input.teamId,
userId: input.userId,
teamRoleId: input.teamRoleId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userTeamUser(userId: string, teamUserId) {

    return this.data.teamUser.findUnique({ where: { id: teamUserId } , include: {team: true, user: true, teamRole: true}  })
  }

  async checkTeamUserExist(teamUserName: string) {
    try {
      return this.data.teamUser.findMany({ where: { name: teamUserName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTeamUser(userId: string, input: UserCreateTeamUserInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const teamUserData = await this.checkTeamUserExist(input.name)

        if (teamUserData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'TeamUser', 'Create', input)

    let teamUser = await this.data.teamUser.create({
      data: { 
  
                team: 
                input.teamId != null
                ? {
                        connect:  { 
                            id: input.teamId
                        }
                    }: undefined,  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,  
                teamRole: 
                input.teamRoleId != null
                ? {
                        connect:  { 
                            id: input.teamRoleId
                        }
                    }: undefined,name: input.name, 

}
, include: {team: true, user: true, teamRole: true} 
    })

    await this.data.logEvent(sendingUser, false, 'TeamUser', 'Create', teamUser)

    return teamUser

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Team User')
    }

  }


  
  

  async userUpdateTeamUser(userId: string, teamUserId: string, input: UserUpdateTeamUserInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!teamUserId) {
        throw new BadRequestException('Team User Id is required')
      } else {

      const teamUserData = await this.checkTeamUserExist(input.name)

      if (teamUserData.length > 0) {
        if (teamUserData[0].id != teamUserId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'TeamUser', 'Update', input)

    let teamUser = this.data.teamUser.update({
      where: { id: teamUserId },
      data: {
  
                team: 
                input.teamId != null
                ? {
                        connect:  { 
                            id: input.teamId
                        }
                    }: undefined,  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,  
                teamRole: 
                input.teamRoleId != null
                ? {
                        connect:  { 
                            id: input.teamRoleId
                        }
                    }: undefined,name: input.name, 

}
, include: {team: true, user: true, teamRole: true} 
    })

    await this.data.logEvent(sendingUser, false, 'TeamUser', 'Update', teamUser)

    return teamUser

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Team User')
    }
  }

  async userUpdateTeamUsers(userId: string, input: UserUpdateTeamUsersInput): Promise<UpdateResult> {
    const total = input.teamUsers.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.teamUsers) {
      const inputData = input.teamUsers[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
teamId: inputData.teamId, 
userId: inputData.userId, 
teamRoleId: inputData.teamRoleId, 

      }

      const teamUserData = await this.checkTeamUserExist(inputData.name)

      if (teamUserData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.teamUser.upsert({
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


  async userDeleteTeamUser(userId: string, teamUserId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!teamUserId) {
        throw new BadRequestException('Team User Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'TeamUser', 'Delete', teamUserId)

        let teamUser = this.data.teamUser.delete({
          where: { id: teamUserId }
        })

        await this.data.logEvent(sendingUser, false, 'TeamUser', 'Delete', teamUser)

        return teamUser

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Team User')
    }
  }
}

