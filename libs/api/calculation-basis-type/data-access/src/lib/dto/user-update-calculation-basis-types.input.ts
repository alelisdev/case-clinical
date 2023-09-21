import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCalculationBasisTypeInput } from './user-update-calculation-basis-type.input'

@InputType()
export class UserUpdateCalculationBasisTypesInput {
  @Field(() => [UserUpdateCalculationBasisTypeInput], {nullable: true }) 
  calculationBasisTypes: UserUpdateCalculationBasisTypeInput[]
}
