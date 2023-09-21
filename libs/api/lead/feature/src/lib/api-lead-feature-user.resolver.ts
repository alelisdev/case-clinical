
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import {
  UserCreateLeadInput,
  UserListLeadInput,
  UserUpdateLeadInput,
  UserUpdateLeadsInput,
  ApiLeadDataAccessUserService,
  Lead,
  PatientData,
  AuthTokenCache,
  PharmacyService,
  LeadInput
} from '@case-clinical/api/lead/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { UserListAccidentTypeInput, AccidentType } from '@case-clinical/api/accident-type/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { UserListLeadStatusInput, LeadStatus } from '@case-clinical/api/lead-status/data-access'
import { UserListLeadSourceInput, LeadSource } from '@case-clinical/api/lead-source/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'
import { LegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLeadFeatureUserResolver {
  constructor(private readonly service: ApiLeadDataAccessUserService, 
    private readonly httpClient: HttpService,
    private readonly pharmacyService: PharmacyService
    ) {}

  @Query(() => [Lead], { nullable: true })
  userLeads(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadInput, nullable: true }) input?: UserListLeadInput,
  ) {
    return this.service.userLeads(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLeads(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadInput, nullable: true }) input?: UserListLeadInput,
  ) {
    return this.service.userCountLeads(user.id, input)
  }

  @Query(() => [Lead], { nullable: true })
  userSelectLeads(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadInput, nullable: true }) input?: UserListLeadInput,
  ) {
    return this.service.userSelectLeads(user.id, input)
  }

  @Query(() => Lead, { nullable: true })
  userLead(@CtxUser() user: User, @Args('leadId') leadId: string) {
    return this.service.userLead(user.id, leadId)
  }

  @Mutation(() => Lead, { nullable: true })
  userCreateLead(@CtxUser() user: User, @Args('input') input: UserCreateLeadInput,) {
    return this.service.userCreateLead(user.id, input)
  }

  @Mutation(() => Lead, { nullable: true })
  userUpdateLead(
    @CtxUser() user: User,
    @Args('leadId') leadId: string,
    @Args('input') input: UserUpdateLeadInput,
  ) {
    return this.service.userUpdateLead(user.id, leadId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLeads(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLeadsInput,
  ) {
    return this.service.userUpdateLeads(user.id, input)
  }

  @Mutation(() => Lead, { nullable: true })
  userDeleteLead(@CtxUser() user: User, @Args('leadId') leadId: string) {
    return this.service.userDeleteLead(user.id, leadId)
  }

  @Mutation(() => Boolean, { nullable: true })
async userSyncMrnToPharmacy(
  @CtxUser() user: User, 
  @Args('lead') lead: UserUpdateLeadInput, 
  @Args('mrn') Mrn: string,
) {
  const patientData = this.pharmacyService.loadFromJson(Mrn, lead);
  
  try {
    const success = await this.pharmacyService.sendDataToServer(patientData);

    if (success) {
      console.log('Data sent successfully.');
    } else {
      console.log('Data sending failed.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
}

