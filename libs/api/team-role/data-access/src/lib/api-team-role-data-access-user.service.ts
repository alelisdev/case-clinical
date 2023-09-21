
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateTeamRoleInput } from './dto/user-create-team-role.input'
import { UserListTeamRoleInput } from './dto/user-list-team-role.input'
import { UserUpdateTeamRoleInput } from './dto/user-update-team-role.input'
import { UserUpdateTeamRolesInput } from './dto/user-update-team-roles.input'



@Injectable()
export class ApiTeamRoleDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTeamRoles(userId: string, input?: UserListTeamRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamRole.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectTeamRoles(userId: string, input?: UserListTeamRoleInput) {
    let name = input?.name ? input.name : undefined

    return this.data.teamRole.findMany({
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

  async userCountTeamRoles(userId: string, input?: UserListTeamRoleInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.teamRole.count(
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

  async userTeamRole(userId: string, teamRoleId) {

    return this.data.teamRole.findUnique({ where: { id: teamRoleId } , include: {teamUsers: true}  })
  }

  async checkTeamRoleExist(teamRoleName: string) {
    try {
      return this.data.teamRole.findMany({ where: { name: teamRoleName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTeamRole(userId: string, input: UserCreateTeamRoleInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const teamRoleData = await this.checkTeamRoleExist(input.name)

        if (teamRoleData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'TeamRole', 'Create', input)

    let teamRole = await this.data.teamRole.create({
      data: { 
name: input.name, 

}
, include: {teamUsers: true} 
    })

    await this.data.logEvent(sendingUser, false, 'TeamRole', 'Create', teamRole)

    return teamRole

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Team Role')
    }

  }


  
  

  async userUpdateTeamRole(userId: string, teamRoleId: string, input: UserUpdateTeamRoleInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!teamRoleId) {
        throw new BadRequestException('Team Role Id is required')
      } else {

      const teamRoleData = await this.checkTeamRoleExist(input.name)

      if (teamRoleData.length > 0) {
        if (teamRoleData[0].id != teamRoleId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'TeamRole', 'Update', input)

    let teamRole = this.data.teamRole.update({
      where: { id: teamRoleId },
      data: {
name: input.name, 

}
, include: {teamUsers: true} 
    })

    await this.data.logEvent(sendingUser, false, 'TeamRole', 'Update', teamRole)

    return teamRole

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Team Role')
    }
  }

  async userUpdateTeamRoles(userId: string, input: UserUpdateTeamRolesInput): Promise<UpdateResult> {
    const total = input.teamRoles.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.teamRoles) {
      const inputData = input.teamRoles[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const teamRoleData = await this.checkTeamRoleExist(inputData.name)

      if (teamRoleData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.teamRole.upsert({
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


  async userDeleteTeamRole(userId: string, teamRoleId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!teamRoleId) {
        throw new BadRequestException('Team Role Id is required')
      } else {

        const teamUserCount = await this.data.teamUser.count({ where: { teamRoleId: teamRoleId }})
        if(teamUserCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Team User')
        }

        await this.data.logEvent(sendingUser, true, 'TeamRole', 'Delete', teamRoleId)

        let teamRole = this.data.teamRole.delete({
          where: { id: teamRoleId }
        })

        await this.data.logEvent(sendingUser, false, 'TeamRole', 'Delete', teamRole)

        return teamRole

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Team Role')
    }
  }
}

