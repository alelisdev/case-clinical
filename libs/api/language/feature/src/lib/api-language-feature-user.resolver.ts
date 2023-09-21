
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLanguageInput,
  UserListLanguageInput,
  UserUpdateLanguageInput,
  UserUpdateLanguagesInput,
  ApiLanguageDataAccessUserService,
  Language,
} from '@case-clinical/api/language/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLanguageFeatureUserResolver {
  constructor(private readonly service: ApiLanguageDataAccessUserService) {}

  @Query(() => [Language], { nullable: true })
  userLanguages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLanguageInput, nullable: true }) input?: UserListLanguageInput,
  ) {
    return this.service.userLanguages(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLanguages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLanguageInput, nullable: true }) input?: UserListLanguageInput,
  ) {
    return this.service.userCountLanguages(user.id, input)
  }

  @Query(() => [Language], { nullable: true })
  userSelectLanguages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLanguageInput, nullable: true }) input?: UserListLanguageInput,
  ) {
    return this.service.userSelectLanguages(user.id, input)
  }







  @Query(() => Language, { nullable: true })
  userLanguage(@CtxUser() user: User, @Args('languageId') languageId: string) {
    return this.service.userLanguage(user.id, languageId)
  }

  @Mutation(() => Language, { nullable: true })
  userCreateLanguage(@CtxUser() user: User, @Args('input') input: UserCreateLanguageInput,) {
    return this.service.userCreateLanguage(user.id, input)
  }

  @Mutation(() => Language, { nullable: true })
  userUpdateLanguage(
    @CtxUser() user: User,
    @Args('languageId') languageId: string,
    @Args('input') input: UserUpdateLanguageInput,
  ) {
    return this.service.userUpdateLanguage(user.id, languageId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLanguages(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLanguagesInput,
  ) {
    return this.service.userUpdateLanguages(user.id, input)
  }

  @Mutation(() => Language, { nullable: true })
  userDeleteLanguage(@CtxUser() user: User, @Args('languageId') languageId: string) {
    return this.service.userDeleteLanguage(user.id, languageId)
  }
}

