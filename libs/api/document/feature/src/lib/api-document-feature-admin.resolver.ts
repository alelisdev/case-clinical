
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateDocumentInput,
  AdminListDocumentInput,
  AdminUpdateDocumentInput,
  ApiDocumentDataAccessAdminService,
  Document
} from '@case-clinical/api/document/data-access'


import { AdminListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { AdminListPrescriptionInput, Prescription } from '@case-clinical/api/prescription/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'
import { AdminListPatientStudyInput, PatientStudy } from '@case-clinical/api/patient-study/data-access'
import { AdminListProcedureVendorInput, ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiDocumentFeatureAdminResolver {
  constructor(private readonly service: ApiDocumentDataAccessAdminService) {}

  @Query(() => [Document], { nullable: true })
  adminDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDocumentInput, nullable: true }) input?: AdminListDocumentInput,
  ) {
    return this.service.adminDocuments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDocumentInput, nullable: true }) input?: AdminListDocumentInput,
  ) {
    return this.service.adminCountDocuments(admin.id, input)
  }





  @Query(() => Document, { nullable: true })
  adminDocument(@CtxUser() admin: User, @Args('documentId') documentId: string) {
    return this.service.adminDocument(admin.id, documentId)
  }

  @Mutation(() => Document, { nullable: true })
  adminCreateDocument(@CtxUser() admin: User, @Args('input') input: AdminCreateDocumentInput,) {
    return this.service.adminCreateDocument(admin.id, input)
  }

  @Mutation(() => Document, { nullable: true })
  adminUpdateDocument(
    @CtxUser() admin: User,
    @Args('documentId') documentId: string,
    @Args('input') input: AdminUpdateDocumentInput,
  ) {
    return this.service.adminUpdateDocument(admin.id, documentId, input)
  }

  @Mutation(() => Document, { nullable: true })
  adminDeleteDocument(@CtxUser() admin: User, @Args('documentId') documentId: string) {
    return this.service.adminDeleteDocument(admin.id, documentId)
  }
}

