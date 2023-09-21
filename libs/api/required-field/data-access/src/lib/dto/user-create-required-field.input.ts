import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { UserCreateMedLevelInput } from '@case-clinical/api/med-level/data-access' 


@InputType()
export class UserCreateRequiredFieldInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  entityName?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  medLevelId?: string


  @Field(() => UserCreateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: UserCreateAccidentTypeInput  


  @Field(() => UserCreateMedLevelInput ,{ nullable: true }) 
  medLevel?: UserCreateMedLevelInput  

}
