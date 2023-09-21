import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListClinicalProviderServiceInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  serviceId?: string  


  @Field({ nullable: true }) 
  clinicalProviderId?: string  


}
