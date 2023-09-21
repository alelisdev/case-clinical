
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateWhereDoesItHurtSpecialtyInput,
  AdminListWhereDoesItHurtSpecialtyInput,
  AdminUpdateWhereDoesItHurtSpecialtyInput,
  ApiWhereDoesItHurtSpecialtyDataAccessAdminService,
  WhereDoesItHurtSpecialty
} from '@case-clinical/api/where-does-it-hurt-specialty/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiWhereDoesItHurtSpecialtyFeatureAdminResolver {
  constructor(private readonly service: ApiWhereDoesItHurtSpecialtyDataAccessAdminService) {}

  @Query(() => [WhereDoesItHurtSpecialty], { nullable: true })
  adminWhereDoesItHurtSpecialties(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWhereDoesItHurtSpecialtyInput, nullable: true }) input?: AdminListWhereDoesItHurtSpecialtyInput,
  ) {
    return this.service.adminWhereDoesItHurtSpecialties(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountWhereDoesItHurtSpecialties(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWhereDoesItHurtSpecialtyInput, nullable: true }) input?: AdminListWhereDoesItHurtSpecialtyInput,
  ) {
    return this.service.adminCountWhereDoesItHurtSpecialties(admin.id, input)
  }





  @Query(() => WhereDoesItHurtSpecialty, { nullable: true })
  adminWhereDoesItHurtSpecialty(@CtxUser() admin: User, @Args('whereDoesItHurtSpecialtyId') whereDoesItHurtSpecialtyId: string) {
    return this.service.adminWhereDoesItHurtSpecialty(admin.id, whereDoesItHurtSpecialtyId)
  }

  @Mutation(() => WhereDoesItHurtSpecialty, { nullable: true })
  adminCreateWhereDoesItHurtSpecialty(@CtxUser() admin: User, @Args('input') input: AdminCreateWhereDoesItHurtSpecialtyInput,) {
    return this.service.adminCreateWhereDoesItHurtSpecialty(admin.id, input)
  }

  @Mutation(() => WhereDoesItHurtSpecialty, { nullable: true })
  adminUpdateWhereDoesItHurtSpecialty(
    @CtxUser() admin: User,
    @Args('whereDoesItHurtSpecialtyId') whereDoesItHurtSpecialtyId: string,
    @Args('input') input: AdminUpdateWhereDoesItHurtSpecialtyInput,
  ) {
    return this.service.adminUpdateWhereDoesItHurtSpecialty(admin.id, whereDoesItHurtSpecialtyId, input)
  }

  @Mutation(() => WhereDoesItHurtSpecialty, { nullable: true })
  adminDeleteWhereDoesItHurtSpecialty(@CtxUser() admin: User, @Args('whereDoesItHurtSpecialtyId') whereDoesItHurtSpecialtyId: string) {
    return this.service.adminDeleteWhereDoesItHurtSpecialty(admin.id, whereDoesItHurtSpecialtyId)
  }
}

