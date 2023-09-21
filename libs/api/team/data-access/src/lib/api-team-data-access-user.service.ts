
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateTeamInput } from './dto/user-create-team.input'
import { UserListTeamInput } from './dto/user-list-team.input'
import { UserUpdateTeamInput } from './dto/user-update-team.input'
import { UserUpdateTeamsInput } from './dto/user-update-teams.input'



@Injectable()
export class ApiTeamDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTeams(userId: string, input?: UserListTeamInput) {
    let name = input?.name ? input.name : undefined

    return this.data.team.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectTeams(userId: string, input?: UserListTeamInput) {
    let name = input?.name ? input.name : undefined

    return this.data.team.findMany({
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

  async userCountTeams(userId: string, input?: UserListTeamInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.team.count(
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

  async userTeam(userId: string, teamId) {

    return this.data.team.findUnique({ where: { id: teamId } , include: {teamUsers: true}  })
  }

  async checkTeamExist(teamName: string) {
    try {
      return this.data.team.findMany({ where: { name: teamName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTeam(userId: string, input: UserCreateTeamInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const teamData = await this.checkTeamExist(input.name)

        if (teamData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Team', 'Create', input)

    let team = await this.data.team.create({
      data: { 
name: input.name, 

}
, include: {teamUsers: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Team', 'Create', team)

    return team

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Team')
    }

  }


  
  

  async userUpdateTeam(userId: string, teamId: string, input: UserUpdateTeamInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!teamId) {
        throw new BadRequestException('Team Id is required')
      } else {

      const teamData = await this.checkTeamExist(input.name)

      if (teamData.length > 0) {
        if (teamData[0].id != teamId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Team', 'Update', input)

    let team = this.data.team.update({
      where: { id: teamId },
      data: {
name: input.name, 

}
, include: {teamUsers: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Team', 'Update', team)

    return team

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Team')
    }
  }

  async userUpdateTeams(userId: string, input: UserUpdateTeamsInput): Promise<UpdateResult> {
    const total = input.teams.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.teams) {
      const inputData = input.teams[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const teamData = await this.checkTeamExist(inputData.name)

      if (teamData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.team.upsert({
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


  async userDeleteTeam(userId: string, teamId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!teamId) {
        throw new BadRequestException('Team Id is required')
      } else {

        const teamUserCount = await this.data.teamUser.count({ where: { teamId: teamId }})
        if(teamUserCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Team User')
        }

        await this.data.logEvent(sendingUser, true, 'Team', 'Delete', teamId)

        let team = this.data.team.delete({
          where: { id: teamId }
        })

        await this.data.logEvent(sendingUser, false, 'Team', 'Delete', team)

        return team

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Team')
    }
  }
}

