import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListPriorAuthorizationEquipmentInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  equipmentId?: string  


  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string  


}
