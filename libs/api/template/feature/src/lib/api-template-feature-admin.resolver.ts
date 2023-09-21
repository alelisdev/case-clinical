
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTemplateInput,
  AdminListTemplateInput,
  AdminUpdateTemplateInput,
  ApiTemplateDataAccessAdminService,
  Template
} from '@case-clinical/api/template/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTemplateFeatureAdminResolver {
  constructor(private readonly service: ApiTemplateDataAccessAdminService) {}

  @Query(() => [Template], { nullable: true })
  adminTemplates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTemplateInput, nullable: true }) input?: AdminListTemplateInput,
  ) {
    return this.service.adminTemplates(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTemplates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTemplateInput, nullable: true }) input?: AdminListTemplateInput,
  ) {
    return this.service.adminCountTemplates(admin.id, input)
  }





  @Query(() => Template, { nullable: true })
  adminTemplate(@CtxUser() admin: User, @Args('templateId') templateId: string) {
    return this.service.adminTemplate(admin.id, templateId)
  }

  @Mutation(() => Template, { nullable: true })
  adminCreateTemplate(@CtxUser() admin: User, @Args('input') input: AdminCreateTemplateInput,) {
    return this.service.adminCreateTemplate(admin.id, input)
  }

  @Mutation(() => Template, { nullable: true })
  adminUpdateTemplate(
    @CtxUser() admin: User,
    @Args('templateId') templateId: string,
    @Args('input') input: AdminUpdateTemplateInput,
  ) {
    return this.service.adminUpdateTemplate(admin.id, templateId, input)
  }

  @Mutation(() => Template, { nullable: true })
  adminDeleteTemplate(@CtxUser() admin: User, @Args('templateId') templateId: string) {
    return this.service.adminDeleteTemplate(admin.id, templateId)
  }
}

