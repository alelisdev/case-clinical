
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTemplateInput,
  ApiTemplateDataAccessPublicService,
  Template,
} from '@case-clinical/api/template/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTemplateFeaturePublicResolver {
  constructor(private readonly service: ApiTemplateDataAccessPublicService) {}
           
  @Query(() => [Template], { nullable: true })
  publicTemplates(
    @Args({ name: 'input', type: () => UserListTemplateInput, nullable: true }) input?: UserListTemplateInput,
  ) {
    return this.service.publicTemplates(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTemplates(
    @Args({ name: 'input', type: () => UserListTemplateInput, nullable: true }) input?: UserListTemplateInput,
  ) {
    return this.service.publicCountTemplates(input)
  }

  @Query(() => [Template], { nullable: true })
  publicSelectTemplates(
    @Args({ name: 'input', type: () => UserListTemplateInput, nullable: true }) input?: UserListTemplateInput,
  ) {
    return this.service.publicSelectTemplates(input)
  }

  @Query(() => Template, { nullable: true })
  publicTemplate(@Args('templateId') templateId: string) {
    return this.service.publicTemplate(templateId)
  }
}
