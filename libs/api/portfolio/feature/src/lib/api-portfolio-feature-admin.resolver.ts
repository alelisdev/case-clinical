
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePortfolioInput,
  AdminListPortfolioInput,
  AdminUpdatePortfolioInput,
  ApiPortfolioDataAccessAdminService,
  Portfolio
} from '@case-clinical/api/portfolio/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPortfolioFeatureAdminResolver {
  constructor(private readonly service: ApiPortfolioDataAccessAdminService) {}

  @Query(() => [Portfolio], { nullable: true })
  adminPortfolios(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPortfolioInput, nullable: true }) input?: AdminListPortfolioInput,
  ) {
    return this.service.adminPortfolios(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPortfolios(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPortfolioInput, nullable: true }) input?: AdminListPortfolioInput,
  ) {
    return this.service.adminCountPortfolios(admin.id, input)
  }





  @Query(() => Portfolio, { nullable: true })
  adminPortfolio(@CtxUser() admin: User, @Args('portfolioId') portfolioId: string) {
    return this.service.adminPortfolio(admin.id, portfolioId)
  }

  @Mutation(() => Portfolio, { nullable: true })
  adminCreatePortfolio(@CtxUser() admin: User, @Args('input') input: AdminCreatePortfolioInput,) {
    return this.service.adminCreatePortfolio(admin.id, input)
  }

  @Mutation(() => Portfolio, { nullable: true })
  adminUpdatePortfolio(
    @CtxUser() admin: User,
    @Args('portfolioId') portfolioId: string,
    @Args('input') input: AdminUpdatePortfolioInput,
  ) {
    return this.service.adminUpdatePortfolio(admin.id, portfolioId, input)
  }

  @Mutation(() => Portfolio, { nullable: true })
  adminDeletePortfolio(@CtxUser() admin: User, @Args('portfolioId') portfolioId: string) {
    return this.service.adminDeletePortfolio(admin.id, portfolioId)
  }
}

