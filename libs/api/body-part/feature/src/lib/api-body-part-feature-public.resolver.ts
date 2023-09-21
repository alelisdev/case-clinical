
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBodyPartInput,
  ApiBodyPartDataAccessPublicService,
  BodyPart,
} from '@case-clinical/api/body-part/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiBodyPartFeaturePublicResolver {
  constructor(private readonly service: ApiBodyPartDataAccessPublicService) {}
           
  @Query(() => [BodyPart], { nullable: true })
  publicBodyParts(
    @Args({ name: 'input', type: () => UserListBodyPartInput, nullable: true }) input?: UserListBodyPartInput,
  ) {
    return this.service.publicBodyParts(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBodyParts(
    @Args({ name: 'input', type: () => UserListBodyPartInput, nullable: true }) input?: UserListBodyPartInput,
  ) {
    return this.service.publicCountBodyParts(input)
  }

  @Query(() => [BodyPart], { nullable: true })
  publicSelectBodyParts(
    @Args({ name: 'input', type: () => UserListBodyPartInput, nullable: true }) input?: UserListBodyPartInput,
  ) {
    return this.service.publicSelectBodyParts(input)
  }

  @Query(() => BodyPart, { nullable: true })
  publicBodyPart(@Args('bodyPartId') bodyPartId: string) {
    return this.service.publicBodyPart(bodyPartId)
  }
}
