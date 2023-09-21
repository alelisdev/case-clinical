import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput, DateFilterInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListMedicalRecordInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true })
  clinicalProviderId?: string

  @Field({ nullable: true })
  patientId?: string

  @Field(() => DateFilterInput, { nullable: true})
  dateFilter?: DateFilterInput

}
