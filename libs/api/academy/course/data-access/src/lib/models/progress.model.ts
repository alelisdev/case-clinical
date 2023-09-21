import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Progress {

  @Field({ nullable: false })
  courseProgressId: String

  @Field({ nullable: false })
  currentStep: Number

  @Field({ nullable: false })
  completed: Number
}
