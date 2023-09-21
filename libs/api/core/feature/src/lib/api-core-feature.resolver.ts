import { Document, UserCreateDocumentInput } from '@case-clinical/api/document/data-access'
import { Template, UserUpdateDto } from '@case-clinical/api/template/data-access'
import { Firm, FirmInput } from '@case-clinical/api/firm/data-access'
import { Patient, PatientInput } from '@case-clinical/api/patient/data-access'

import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiCoreFeatureService } from './api-core-feature.service'
import { CtxUser } from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'


@Resolver()
export class ApiCoreFeatureResolver {
  constructor(private readonly service: ApiCoreFeatureService) {}

  @Query(() => Float, { nullable: true })
  uptime() {
    return this.service.uptime()
  }

  @Mutation(() => String, { nullable: true })
  userCreateSignDocument(@Args('user') user: UserUpdateDto, @Args('attachment') attachment: string) {
    return this.service.userCreateSignDocument(user, attachment)
  }


  @Mutation(() => String, { nullable: true })
  userCreatePatientSignDocument(@Args('user') user: UserUpdateDto, @Args('attachment') attachment: string) {
    return this.service.userCreatePatientSignDocument(user, attachment)
  }

  @Mutation(() => Document, { nullable: true })
  getPdfDocument(
    @Args('user') user: UserUpdateDto, 
    @Args('attachment') attachment: string, 
    @Args('templateName') templateName: string) {
    
      return this.service.getPdfDocument(user, attachment, templateName)
  }

  @Mutation(() => String, { nullable: true })
  getPatientMrnNumber(
    @CtxUser() user: User, 
    @Args('dateOfLoss') dateOfLoss: string, 
    @Args('dateOfBirth') dateOfBirth: string,
    @Args('accidentKind') accidentKind: string,
    @Args('legalCaseId') legalCaseId: string,) {
      return this.service.getPatientMRN(user, dateOfBirth, dateOfLoss, accidentKind, legalCaseId)
  }

  @Query(() => Template, { nullable: true })
  userPublicTemplate(@Args('templateId') templateId: string) {
    return this.service.userPublicTemplate(templateId)
  }
}
