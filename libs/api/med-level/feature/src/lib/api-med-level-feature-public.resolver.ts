
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListMedLevelInput,
  ApiMedLevelDataAccessPublicService,
  MedLevel,
} from '@case-clinical/api/med-level/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiMedLevelFeaturePublicResolver {
  constructor(private readonly service: ApiMedLevelDataAccessPublicService) {}
           
  @Query(() => [MedLevel], { nullable: true })
  publicMedLevels(
    @Args({ name: 'input', type: () => UserListMedLevelInput, nullable: true }) input?: UserListMedLevelInput,
  ) {
    return this.service.publicMedLevels(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountMedLevels(
    @Args({ name: 'input', type: () => UserListMedLevelInput, nullable: true }) input?: UserListMedLevelInput,
  ) {
    return this.service.publicCountMedLevels(input)
  }

  @Query(() => [MedLevel], { nullable: true })
  publicSelectMedLevels(
    @Args({ name: 'input', type: () => UserListMedLevelInput, nullable: true }) input?: UserListMedLevelInput,
  ) {
    return this.service.publicSelectMedLevels(input)
  }

  @Query(() => MedLevel, { nullable: true })
  publicMedLevel(@Args('medLevelId') medLevelId: string) {
    return this.service.publicMedLevel(medLevelId)
  }
}
