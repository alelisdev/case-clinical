import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAgreementTypeInput } from './user-update-agreement-type.input'

@InputType()
export class UserUpdateAgreementTypesInput {
  @Field(() => [UserUpdateAgreementTypeInput], {nullable: true }) 
  agreementTypes: UserUpdateAgreementTypeInput[]
}
