import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListWhereDoesItHurtSpecialtyInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  whereDoesItHurtId?: string  


  @Field({ nullable: true }) 
  specialtyId?: string  



}
