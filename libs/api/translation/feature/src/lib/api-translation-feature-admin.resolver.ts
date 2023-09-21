
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTranslationInput,
  AdminListTranslationInput,
  AdminUpdateTranslationInput,
  ApiTranslationDataAccessAdminService,
  Translation
} from '@case-clinical/api/translation/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTranslationFeatureAdminResolver {
  constructor(private readonly service: ApiTranslationDataAccessAdminService) {}

  @Query(() => [Translation], { nullable: true })
  adminTranslations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTranslationInput, nullable: true }) input?: AdminListTranslationInput,
  ) {
    return this.service.adminTranslations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTranslations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTranslationInput, nullable: true }) input?: AdminListTranslationInput,
  ) {
    return this.service.adminCountTranslations(admin.id, input)
  }





  @Query(() => Translation, { nullable: true })
  adminTranslation(@CtxUser() admin: User, @Args('translationId') translationId: string) {
    return this.service.adminTranslation(admin.id, translationId)
  }

  @Mutation(() => Translation, { nullable: true })
  adminCreateTranslation(@CtxUser() admin: User, @Args('input') input: AdminCreateTranslationInput,) {
    return this.service.adminCreateTranslation(admin.id, input)
  }

  @Mutation(() => Translation, { nullable: true })
  adminUpdateTranslation(
    @CtxUser() admin: User,
    @Args('translationId') translationId: string,
    @Args('input') input: AdminUpdateTranslationInput,
  ) {
    return this.service.adminUpdateTranslation(admin.id, translationId, input)
  }

  @Mutation(() => Translation, { nullable: true })
  adminDeleteTranslation(@CtxUser() admin: User, @Args('translationId') translationId: string) {
    return this.service.adminDeleteTranslation(admin.id, translationId)
  }
}

