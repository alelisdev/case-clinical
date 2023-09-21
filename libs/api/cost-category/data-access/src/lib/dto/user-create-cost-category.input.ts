import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@InputType()
export class UserCreateCostCategoryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreatePriorAuthorizationProcedureCodeInput], { nullable: true }) 
  priorAuthorizationProcedureCodes?: UserCreatePriorAuthorizationProcedureCodeInput[]


}
