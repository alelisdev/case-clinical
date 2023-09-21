import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminCreateAuthorizationCategoryInput } from '@case-clinical/api/authorization-category/data-access' 
import { AdminCreateAuthorizationTypeInput } from '@case-clinical/api/authorization-type/data-access' 
import { AdminCreateProcedureInput } from '@case-clinical/api/procedure/data-access' 
import { AdminCreateAuthorizationDiagnosisCodeInput } from '@case-clinical/api/authorization-diagnosis-code/data-access' 
import { AdminCreateProcedureOrTreatmentRequestAuthorizationInput } from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access' 
import { AdminCreateRecommendedOrderAuthorizationInput } from '@case-clinical/api/recommended-order-authorization/data-access' 


@InputType()
export class AdminCreateAuthorizationInput {

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

  @Field(() => [AdminCreateAuthorizationDiagnosisCodeInput], { nullable: true }) 
  authorizations?: AdminCreateAuthorizationDiagnosisCodeInput[]

  @Field(() => [AdminCreateProcedureOrTreatmentRequestAuthorizationInput], { nullable: true }) 
  procedureOrTreatmentRequestAuthorizations?: AdminCreateProcedureOrTreatmentRequestAuthorizationInput[]

  @Field(() => [AdminCreateRecommendedOrderAuthorizationInput], { nullable: true }) 
  recommendedOrderAuthorizations?: AdminCreateRecommendedOrderAuthorizationInput[]


  @Field(() => AdminCreateVendorInput ,{ nullable: true }) 
  vendor?: AdminCreateVendorInput  


  @Field(() => AdminCreateAuthorizationCategoryInput ,{ nullable: true }) 
  authorizationCategory?: AdminCreateAuthorizationCategoryInput  


  @Field(() => AdminCreateAuthorizationTypeInput ,{ nullable: true }) 
  authorizationType?: AdminCreateAuthorizationTypeInput  


  @Field(() => AdminCreateProcedureInput ,{ nullable: true }) 
  procedure?: AdminCreateProcedureInput  

}