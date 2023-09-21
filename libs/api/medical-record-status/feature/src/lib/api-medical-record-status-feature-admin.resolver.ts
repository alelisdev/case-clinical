
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateMedicalRecordStatusInput,
  AdminListMedicalRecordStatusInput,
  AdminUpdateMedicalRecordStatusInput,
  ApiMedicalRecordStatusDataAccessAdminService,
  MedicalRecordStatus
} from '@case-clinical/api/medical-record-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiMedicalRecordStatusFeatureAdminResolver {
  constructor(private readonly service: ApiMedicalRecordStatusDataAccessAdminService) {}

  @Query(() => [MedicalRecordStatus], { nullable: true })
  adminMedicalRecordStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalRecordStatusInput, nullable: true }) input?: AdminListMedicalRecordStatusInput,
  ) {
    return this.service.adminMedicalRecordStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountMedicalRecordStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalRecordStatusInput, nullable: true }) input?: AdminListMedicalRecordStatusInput,
  ) {
    return this.service.adminCountMedicalRecordStatuses(admin.id, input)
  }





  @Query(() => MedicalRecordStatus, { nullable: true })
  adminMedicalRecordStatus(@CtxUser() admin: User, @Args('medicalRecordStatusId') medicalRecordStatusId: string) {
    return this.service.adminMedicalRecordStatus(admin.id, medicalRecordStatusId)
  }

  @Mutation(() => MedicalRecordStatus, { nullable: true })
  adminCreateMedicalRecordStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateMedicalRecordStatusInput,) {
    return this.service.adminCreateMedicalRecordStatus(admin.id, input)
  }

  @Mutation(() => MedicalRecordStatus, { nullable: true })
  adminUpdateMedicalRecordStatus(
    @CtxUser() admin: User,
    @Args('medicalRecordStatusId') medicalRecordStatusId: string,
    @Args('input') input: AdminUpdateMedicalRecordStatusInput,
  ) {
    return this.service.adminUpdateMedicalRecordStatus(admin.id, medicalRecordStatusId, input)
  }

  @Mutation(() => MedicalRecordStatus, { nullable: true })
  adminDeleteMedicalRecordStatus(@CtxUser() admin: User, @Args('medicalRecordStatusId') medicalRecordStatusId: string) {
    return this.service.adminDeleteMedicalRecordStatus(admin.id, medicalRecordStatusId)
  }
}

