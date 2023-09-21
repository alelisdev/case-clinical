
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTemplateInput,
  UserListTemplateInput,
  UserUpdateTemplateInput,
  UserUpdateTemplatesInput,
  ApiTemplateDataAccessUserService,
  Template,
} from '@case-clinical/api/template/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTemplateFeatureUserResolver {
  constructor(private readonly service: ApiTemplateDataAccessUserService) {}

  @Query(() => [Template], { nullable: true })
  userTemplates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTemplateInput, nullable: true }) input?: UserListTemplateInput,
  ) {
    return this.service.userTemplates(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTemplates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTemplateInput, nullable: true }) input?: UserListTemplateInput,
  ) {
    return this.service.userCountTemplates(user.id, input)
  }

  @Query(() => [Template], { nullable: true })
  userSelectTemplates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTemplateInput, nullable: true }) input?: UserListTemplateInput,
  ) {
    return this.service.userSelectTemplates(user.id, input)
  }







  @Query(() => Template, { nullable: true })
  userTemplate(@CtxUser() user: User, @Args('templateId') templateId: string) {
    return this.service.userTemplate(user.id, templateId)
  }

  @Mutation(() => Template, { nullable: true })
  userCreateTemplate(@CtxUser() user: User, @Args('input') input: UserCreateTemplateInput,) {
    return this.service.userCreateTemplate(user.id, input)
  }

  @Mutation(() => Template, { nullable: true })
  userUpdateTemplate(
    @CtxUser() user: User,
    @Args('templateId') templateId: string,
    @Args('input') input: UserUpdateTemplateInput,
  ) {
    return this.service.userUpdateTemplate(user.id, templateId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTemplates(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTemplatesInput,
  ) {
    return this.service.userUpdateTemplates(user.id, input)
  }

  @Mutation(() => Template, { nullable: true })
  userDeleteTemplate(@CtxUser() user: User, @Args('templateId') templateId: string) {
    return this.service.userDeleteTemplate(user.id, templateId)
  }
}

