
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTranslationInput,
  UserListTranslationInput,
  UserUpdateTranslationInput,
  ApiTranslationDataAccessUserService,
  Translation,
} from '@case-clinical/api/translation/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTranslationFeatureUserResolver {
  constructor(private readonly service: ApiTranslationDataAccessUserService) {}

  @Query(() => [Translation], { nullable: true })
  userTranslations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTranslationInput, nullable: true }) input?: UserListTranslationInput,
  ) {
    return this.service.userTranslations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTranslations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTranslationInput, nullable: true }) input?: UserListTranslationInput,
  ) {
    return this.service.userCountTranslations(user.id, input)
  }

  @Query(() => [Translation], { nullable: true })
  userSelectTranslations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTranslationInput, nullable: true }) input?: UserListTranslationInput,
  ) {
    return this.service.userSelectTranslations(user.id, input)
  }







  @Query(() => Translation, { nullable: true })
  userTranslation(@CtxUser() user: User, @Args('translationId') translationId: string) {
    return this.service.userTranslation(user.id, translationId)
  }

  @Mutation(() => Translation, { nullable: true })
  userCreateTranslation(@CtxUser() user: User, @Args('input') input: UserCreateTranslationInput,) {
    return this.service.userCreateTranslation(user.id, input)
  }

  @Mutation(() => Translation, { nullable: true })
  userUpdateTranslation(
    @CtxUser() user: User,
    @Args('translationId') translationId: string,
    @Args('input') input: UserUpdateTranslationInput,
  ) {
    return this.service.userUpdateTranslation(user.id, translationId, input)
  }

  @Mutation(() => Translation, { nullable: true })
  userDeleteTranslation(@CtxUser() user: User, @Args('translationId') translationId: string) {
    return this.service.userDeleteTranslation(user.id, translationId)
  }
}

