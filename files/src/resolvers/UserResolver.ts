import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '../models/User';
import { RegisterInput, LoginInput, UpdateUserInput } from '../inputs/UserInputs';
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import * as EmailValidator from "email-validator"
import { isAuth, MyContext } from '../middleware/isauth.middleware';


@Resolver()
export class UserResolver {

    @Mutation(() => String)
    async register(@Arg("data") data: RegisterInput) {
        const email = data.email.trim();


        if (!EmailValidator.validate(email)) throw Error("Please enter a valid email")

        const existingUser = await User.findOne({ email });

        if (existingUser) throw Error("An account with this email address already exists");

        let saltRounds = 10;

        let hashedPassword = bcrypt.hashSync(data.password, saltRounds);

        let jsonwebtoken = jwt.sign({ "email": data.email.trim() }, process.env.JWT_SECRET_KEY as string);

        const user = User.create({
            ...data,
            password: hashedPassword,
        });
        await user.save();
        return jsonwebtoken;
    }

    @Query(() => User)
    @UseMiddleware(isAuth)
    async profile(@Ctx() { payload }: MyContext) {
        let email = payload?.email;

        let user = await User.findOne({ email });

        if (!user) throw Error("this user does not exist")

        return user;
    }

    @Query(() => User)
    async getUserProfile(@Arg("id") id: string) {

        let user = await User.findOne({ id });

        if (!user) throw Error("this user does not exist")

        return user;
    }

    @Mutation(() => User)
    @UseMiddleware(isAuth)
    async updateProfile(@Ctx() { payload }: MyContext, @Arg("data") data: UpdateUserInput) {
        let useremail = payload?.email;
        const user = await User.findOne({ email: useremail });

        if (!user) throw new Error("this user does not exist");

        Object.assign(user, data);
        await user.save();
        return user;
    }

 
    @Mutation(() => String)
    async login(@Arg("data") data: LoginInput) {

        const email = data.email;

        let user = await User.findOne({ email });

        if (!user) throw Error("An account with the specified email address does not exist")

        let valid = await bcrypt.compare(data.password, user!.password!);

        if (!valid) {
            throw Error("Wrong password provided")
        }

        let jsonwebtoken = jwt.sign({ "email": data.email }, process.env.JWT_SECRET_KEY as string);

        return jsonwebtoken;
    }

}
