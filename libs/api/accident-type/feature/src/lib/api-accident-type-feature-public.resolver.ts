
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAccidentTypeInput,
  ApiAccidentTypeDataAccessPublicService,
  AccidentType,
} from '@case-clinical/api/accident-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAccidentTypeFeaturePublicResolver {
  constructor(private readonly service: ApiAccidentTypeDataAccessPublicService) {}
           
  @Query(() => [AccidentType], { nullable: true })
  publicAccidentTypes(
    @Args({ name: 'input', type: () => UserListAccidentTypeInput, nullable: true }) input?: UserListAccidentTypeInput,
  ) {
    return this.service.publicAccidentTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAccidentTypes(
    @Args({ name: 'input', type: () => UserListAccidentTypeInput, nullable: true }) input?: UserListAccidentTypeInput,
  ) {
    return this.service.publicCountAccidentTypes(input)
  }

  @Query(() => [AccidentType], { nullable: true })
  publicSelectAccidentTypes(
    @Args({ name: 'input', type: () => UserListAccidentTypeInput, nullable: true }) input?: UserListAccidentTypeInput,
  ) {
    return this.service.publicSelectAccidentTypes(input)
  }

  @Query(() => AccidentType, { nullable: true })
  publicAccidentType(@Args('accidentTypeId') accidentTypeId: string) {
    return this.service.publicAccidentType(accidentTypeId)
  }
}
