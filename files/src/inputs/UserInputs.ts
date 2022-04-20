
import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  phone_number!: string
}

@InputType()
export class LoginInput {
  @Field()

  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class UpdateUserInput {

  @Field()
  email!: string;

  @Field()
  profile_image!: string;

  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

}


