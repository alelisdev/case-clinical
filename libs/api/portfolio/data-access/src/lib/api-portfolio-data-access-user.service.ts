
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePortfolioInput } from './dto/user-create-portfolio.input'
import { UserListPortfolioInput } from './dto/user-list-portfolio.input'
import { UserUpdatePortfolioInput } from './dto/user-update-portfolio.input'
import { UserUpdatePortfoliosInput } from './dto/user-update-portfolios.input'



@Injectable()
export class ApiPortfolioDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPortfolios(userId: string, input?: UserListPortfolioInput) {
    let name = input?.name ? input.name : undefined

    return this.data.portfolio.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPortfolios(userId: string, input?: UserListPortfolioInput) {
    let name = input?.name ? input.name : undefined

    return this.data.portfolio.findMany({
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

  async userCountPortfolios(userId: string, input?: UserListPortfolioInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.portfolio.count(
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

  async userPortfolio(userId: string, portfolioId) {

    return this.data.portfolio.findUnique({ where: { id: portfolioId } , include: {caseAccounts: {include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true, portfolio: true, procedureVendor: true}}}  })
  }

  async checkPortfolioExist(portfolioName: string) {
    try {
      return this.data.portfolio.findMany({ where: { name: portfolioName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePortfolio(userId: string, input: UserCreatePortfolioInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const portfolioData = await this.checkPortfolioExist(input.name)

        if (portfolioData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Portfolio', 'Create', input)

    let portfolio = await this.data.portfolio.create({
      data: { 
name: input.name, 

}
, include: {caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Portfolio', 'Create', portfolio)

    return portfolio

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Portfolio')
    }

  }


  
  

  async userUpdatePortfolio(userId: string, portfolioId: string, input: UserUpdatePortfolioInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!portfolioId) {
        throw new BadRequestException('Portfolio Id is required')
      } else {

      const portfolioData = await this.checkPortfolioExist(input.name)

      if (portfolioData.length > 0) {
        if (portfolioData[0].id != portfolioId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Portfolio', 'Update', input)

    let portfolio = this.data.portfolio.update({
      where: { id: portfolioId },
      data: {
name: input.name, 

}
, include: {caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Portfolio', 'Update', portfolio)

    return portfolio

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Portfolio')
    }
  }

  async userUpdatePortfolios(userId: string, input: UserUpdatePortfoliosInput): Promise<UpdateResult> {
    const total = input.portfolios.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.portfolios) {
      const inputData = input.portfolios[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const portfolioData = await this.checkPortfolioExist(inputData.name)

      if (portfolioData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.portfolio.upsert({
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


  async userDeletePortfolio(userId: string, portfolioId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!portfolioId) {
        throw new BadRequestException('Portfolio Id is required')
      } else {

        const caseAccountCount = await this.data.caseAccount.count({ where: { portfolioId: portfolioId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }

        await this.data.logEvent(sendingUser, true, 'Portfolio', 'Delete', portfolioId)

        let portfolio = this.data.portfolio.delete({
          where: { id: portfolioId }
        })

        await this.data.logEvent(sendingUser, false, 'Portfolio', 'Delete', portfolio)

        return portfolio

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Portfolio')
    }
  }
}

