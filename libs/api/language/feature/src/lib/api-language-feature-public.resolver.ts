
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLanguageInput,
  ApiLanguageDataAccessPublicService,
  Language,
} from '@case-clinical/api/language/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLanguageFeaturePublicResolver {
  constructor(private readonly service: ApiLanguageDataAccessPublicService) {}
           
  @Query(() => [Language], { nullable: true })
  publicLanguages(
    @Args({ name: 'input', type: () => UserListLanguageInput, nullable: true }) input?: UserListLanguageInput,
  ) {
    return this.service.publicLanguages(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLanguages(
    @Args({ name: 'input', type: () => UserListLanguageInput, nullable: true }) input?: UserListLanguageInput,
  ) {
    return this.service.publicCountLanguages(input)
  }

  @Query(() => [Language], { nullable: true })
  publicSelectLanguages(
    @Args({ name: 'input', type: () => UserListLanguageInput, nullable: true }) input?: UserListLanguageInput,
  ) {
    return this.service.publicSelectLanguages(input)
  }

  @Query(() => Language, { nullable: true })
  publicLanguage(@Args('languageId') languageId: string) {
    return this.service.publicLanguage(languageId)
  }
}
