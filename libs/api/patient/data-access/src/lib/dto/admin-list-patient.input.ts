import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListPatientInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  ethnicityId?: string  


  @Field({ nullable: true }) 
  genderId?: string  


  @Field({ nullable: true }) 
  languageId?: string  


}
