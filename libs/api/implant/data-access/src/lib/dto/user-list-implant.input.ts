import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListImplantInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  implantCategoryId?: string  


  @Field({ nullable: true }) 
  salesRepresentativeId?: string  


  @Field({ nullable: true }) 
  manufacturerId?: string  


}
