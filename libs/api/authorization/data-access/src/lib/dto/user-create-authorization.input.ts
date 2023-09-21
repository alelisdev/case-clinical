import { Field, InputType } from '@nestjs/graphql'

import { UserCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserCreateAuthorizationCategoryInput } from '@case-clinical/api/authorization-category/data-access' 
import { UserCreateAuthorizationTypeInput } from '@case-clinical/api/authorization-type/data-access' 
import { UserCreateProcedureInput } from '@case-clinical/api/procedure/data-access' 
import { UserCreateAuthorizationDiagnosisCodeInput } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { UserCreateProcedureOrTreatmentRequestAuthorizationInput } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access' 
import { UserCreateRecommendedOrderAuthorizationInput } from '@case-clinical/api/recommended-order-authorization/data-access' 


@InputType()
export class UserCreateAuthorizationInput {

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

  @Field(() => [UserCreateAuthorizationDiagnosisCodeInput], { nullable: true }) 
  authorizations?: UserCreateAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserCreateProcedureOrTreatmentRequestAuthorizationInput], { nullable: true }) 
  procedureOrTreatmentRequestAuthorizations?: UserCreateProcedureOrTreatmentRequestAuthorizationInput[]

  @Field(() => [UserCreateRecommendedOrderAuthorizationInput], { nullable: true }) 
  recommendedOrderAuthorizations?: UserCreateRecommendedOrderAuthorizationInput[]


  @Field(() => UserCreateVendorInput ,{ nullable: true }) 
  vendor?: UserCreateVendorInput  


  @Field(() => UserCreateAuthorizationCategoryInput ,{ nullable: true }) 
  authorizationCategory?: UserCreateAuthorizationCategoryInput  


  @Field(() => UserCreateAuthorizationTypeInput ,{ nullable: true }) 
  authorizationType?: UserCreateAuthorizationTypeInput  


  @Field(() => UserCreateProcedureInput ,{ nullable: true }) 
  procedure?: UserCreateProcedureInput  

}
