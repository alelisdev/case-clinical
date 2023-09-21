
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateSpecialtyInput,
  AdminListSpecialtyInput,
  AdminUpdateSpecialtyInput,
  ApiSpecialtyDataAccessAdminService,
  Specialty
} from '@case-clinical/api/specialty/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiSpecialtyFeatureAdminResolver {
  constructor(private readonly service: ApiSpecialtyDataAccessAdminService) {}

  @Query(() => [Specialty], { nullable: true })
  adminSpecialties(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSpecialtyInput, nullable: true }) input?: AdminListSpecialtyInput,
  ) {
    return this.service.adminSpecialties(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountSpecialties(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSpecialtyInput, nullable: true }) input?: AdminListSpecialtyInput,
  ) {
    return this.service.adminCountSpecialties(admin.id, input)
  }





  @Query(() => Specialty, { nullable: true })
  adminSpecialty(@CtxUser() admin: User, @Args('specialtyId') specialtyId: string) {
    return this.service.adminSpecialty(admin.id, specialtyId)
  }

  @Mutation(() => Specialty, { nullable: true })
  adminCreateSpecialty(@CtxUser() admin: User, @Args('input') input: AdminCreateSpecialtyInput,) {
    return this.service.adminCreateSpecialty(admin.id, input)
  }

  @Mutation(() => Specialty, { nullable: true })
  adminUpdateSpecialty(
    @CtxUser() admin: User,
    @Args('specialtyId') specialtyId: string,
    @Args('input') input: AdminUpdateSpecialtyInput,
  ) {
    return this.service.adminUpdateSpecialty(admin.id, specialtyId, input)
  }

  @Mutation(() => Specialty, { nullable: true })
  adminDeleteSpecialty(@CtxUser() admin: User, @Args('specialtyId') specialtyId: string) {
    return this.service.adminDeleteSpecialty(admin.id, specialtyId)
  }
}

