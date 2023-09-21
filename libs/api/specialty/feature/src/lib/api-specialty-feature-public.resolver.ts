
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListSpecialtyInput,
  ApiSpecialtyDataAccessPublicService,
  Specialty,
} from '@case-clinical/api/specialty/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiSpecialtyFeaturePublicResolver {
  constructor(private readonly service: ApiSpecialtyDataAccessPublicService) {}
           
  @Query(() => [Specialty], { nullable: true })
  publicSpecialties(
    @Args({ name: 'input', type: () => UserListSpecialtyInput, nullable: true }) input?: UserListSpecialtyInput,
  ) {
    return this.service.publicSpecialties(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountSpecialties(
    @Args({ name: 'input', type: () => UserListSpecialtyInput, nullable: true }) input?: UserListSpecialtyInput,
  ) {
    return this.service.publicCountSpecialties(input)
  }

  @Query(() => [Specialty], { nullable: true })
  publicSelectSpecialties(
    @Args({ name: 'input', type: () => UserListSpecialtyInput, nullable: true }) input?: UserListSpecialtyInput,
  ) {
    return this.service.publicSelectSpecialties(input)
  }

  @Query(() => Specialty, { nullable: true })
  publicSpecialty(@Args('specialtyId') specialtyId: string) {
    return this.service.publicSpecialty(specialtyId)
  }
}
