import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListPriorAuthorizationProcedureCodeInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  costCategoryId?: string  


  @Field({ nullable: true }) 
  procedureId?: string  


  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string  


}
