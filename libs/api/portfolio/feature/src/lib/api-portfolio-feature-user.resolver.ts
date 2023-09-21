
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePortfolioInput,
  UserListPortfolioInput,
  UserUpdatePortfolioInput,
  UserUpdatePortfoliosInput,
  ApiPortfolioDataAccessUserService,
  Portfolio,
} from '@case-clinical/api/portfolio/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPortfolioFeatureUserResolver {
  constructor(private readonly service: ApiPortfolioDataAccessUserService) {}

  @Query(() => [Portfolio], { nullable: true })
  userPortfolios(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPortfolioInput, nullable: true }) input?: UserListPortfolioInput,
  ) {
    return this.service.userPortfolios(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPortfolios(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPortfolioInput, nullable: true }) input?: UserListPortfolioInput,
  ) {
    return this.service.userCountPortfolios(user.id, input)
  }

  @Query(() => [Portfolio], { nullable: true })
  userSelectPortfolios(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPortfolioInput, nullable: true }) input?: UserListPortfolioInput,
  ) {
    return this.service.userSelectPortfolios(user.id, input)
  }







  @Query(() => Portfolio, { nullable: true })
  userPortfolio(@CtxUser() user: User, @Args('portfolioId') portfolioId: string) {
    return this.service.userPortfolio(user.id, portfolioId)
  }

  @Mutation(() => Portfolio, { nullable: true })
  userCreatePortfolio(@CtxUser() user: User, @Args('input') input: UserCreatePortfolioInput,) {
    return this.service.userCreatePortfolio(user.id, input)
  }

  @Mutation(() => Portfolio, { nullable: true })
  userUpdatePortfolio(
    @CtxUser() user: User,
    @Args('portfolioId') portfolioId: string,
    @Args('input') input: UserUpdatePortfolioInput,
  ) {
    return this.service.userUpdatePortfolio(user.id, portfolioId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePortfolios(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePortfoliosInput,
  ) {
    return this.service.userUpdatePortfolios(user.id, input)
  }

  @Mutation(() => Portfolio, { nullable: true })
  userDeletePortfolio(@CtxUser() user: User, @Args('portfolioId') portfolioId: string) {
    return this.service.userDeletePortfolio(user.id, portfolioId)
  }
}

