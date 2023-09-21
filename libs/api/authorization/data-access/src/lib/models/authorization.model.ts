import { Field, ObjectType } from '@nestjs/graphql'

import { Vendor } from '@case-clinical/api/vendor/data-access'

import { AuthorizationCategory } from '@case-clinical/api/authorization-category/data-access'

import { AuthorizationType } from '@case-clinical/api/authorization-type/data-access'

import { Procedure } from '@case-clinical/api/procedure/data-access'
import { AuthorizationDiagnosisCode } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { ProcedureOrTreatmentRequestAuthorization } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access' 
import { RecommendedOrderAuthorization } from '@case-clinical/api/recommended-order-authorization/data-access' 


@ObjectType()
export class Authorization {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  authorizationCategoryId?: string

  @Field({ nullable: true }) 
  authorizationTypeId?: string

  @Field({ nullable: true }) 
  requestDescription?: string

  @Field({ nullable: true }) 
  durationOrQuantity?: number

  @Field({ nullable: true }) 
  unit?: string

  @Field({ nullable: true }) 
  cptCode?: string

  @Field({ nullable: true }) 
  procedureId?: string

  @Field(() => [AuthorizationDiagnosisCode], { nullable: true }) 
  authorizations?: AuthorizationDiagnosisCode[]

  @Field(() => [ProcedureOrTreatmentRequestAuthorization], { nullable: true }) 
  procedureOrTreatmentRequestAuthorizations?: ProcedureOrTreatmentRequestAuthorization[]

  @Field(() => [RecommendedOrderAuthorization], { nullable: true }) 
  recommendedOrderAuthorizations?: RecommendedOrderAuthorization[]


  @Field(() => Vendor, { nullable: true }) 
  vendor?: Vendor  

  @Field(() => AuthorizationCategory, { nullable: true }) 
  authorizationCategory?: AuthorizationCategory  

  @Field(() => AuthorizationType, { nullable: true }) 
  authorizationType?: AuthorizationType  

  @Field(() => Procedure, { nullable: true }) 
  procedure?: Procedure  

}
