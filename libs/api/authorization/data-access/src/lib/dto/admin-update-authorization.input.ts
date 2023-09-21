import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminUpdateAuthorizationCategoryInput } from '@case-clinical/api/authorization-category/data-access' 
import { AdminUpdateAuthorizationTypeInput } from '@case-clinical/api/authorization-type/data-access' 
import { AdminUpdateProcedureInput } from '@case-clinical/api/procedure/data-access' 
import { UserUpdateAuthorizationDiagnosisCodeInput } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { UserUpdateProcedureOrTreatmentRequestAuthorizationInput } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access' 
import { UserUpdateRecommendedOrderAuthorizationInput } from '@case-clinical/api/recommended-order-authorization/data-access' 


@InputType()
export class AdminUpdateAuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateAuthorizationDiagnosisCodeInput], { nullable: true }) 
  authorizations?: UserUpdateAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserUpdateProcedureOrTreatmentRequestAuthorizationInput], { nullable: true }) 
  procedureOrTreatmentRequestAuthorizations?: UserUpdateProcedureOrTreatmentRequestAuthorizationInput[]

  @Field(() => [UserUpdateRecommendedOrderAuthorizationInput], { nullable: true }) 
  recommendedOrderAuthorizations?: UserUpdateRecommendedOrderAuthorizationInput[]


  @Field(() => AdminUpdateVendorInput ,{ nullable: true }) 
  vendor?: AdminUpdateVendorInput  


  @Field(() => AdminUpdateAuthorizationCategoryInput ,{ nullable: true }) 
  authorizationCategory?: AdminUpdateAuthorizationCategoryInput  


  @Field(() => AdminUpdateAuthorizationTypeInput ,{ nullable: true }) 
  authorizationType?: AdminUpdateAuthorizationTypeInput  


  @Field(() => AdminUpdateProcedureInput ,{ nullable: true }) 
  procedure?: AdminUpdateProcedureInput  

}