
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLanguageInput,
  AdminListLanguageInput,
  AdminUpdateLanguageInput,
  ApiLanguageDataAccessAdminService,
  Language
} from '@case-clinical/api/language/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLanguageFeatureAdminResolver {
  constructor(private readonly service: ApiLanguageDataAccessAdminService) {}

  @Query(() => [Language], { nullable: true })
  adminLanguages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLanguageInput, nullable: true }) input?: AdminListLanguageInput,
  ) {
    return this.service.adminLanguages(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLanguages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLanguageInput, nullable: true }) input?: AdminListLanguageInput,
  ) {
    return this.service.adminCountLanguages(admin.id, input)
  }





  @Query(() => Language, { nullable: true })
  adminLanguage(@CtxUser() admin: User, @Args('languageId') languageId: string) {
    return this.service.adminLanguage(admin.id, languageId)
  }

  @Mutation(() => Language, { nullable: true })
  adminCreateLanguage(@CtxUser() admin: User, @Args('input') input: AdminCreateLanguageInput,) {
    return this.service.adminCreateLanguage(admin.id, input)
  }

  @Mutation(() => Language, { nullable: true })
  adminUpdateLanguage(
    @CtxUser() admin: User,
    @Args('languageId') languageId: string,
    @Args('input') input: AdminUpdateLanguageInput,
  ) {
    return this.service.adminUpdateLanguage(admin.id, languageId, input)
  }

  @Mutation(() => Language, { nullable: true })
  adminDeleteLanguage(@CtxUser() admin: User, @Args('languageId') languageId: string) {
    return this.service.adminDeleteLanguage(admin.id, languageId)
  }
}

