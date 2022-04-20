import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';



@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: string

    @Field()
    @Column()
    first_name!: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    profile_image!: string

    @Field()
    @Column()
    last_name!: string

    @Field()
    @Column()
    email!: string

    @Field()
    @Column()
    password!: string

    @Field()
    @Column()
    phone_number!: string

    @Field({ nullable: true })
    @Column({ type: "timestamp", nullable: true })
    email_verified_at!: string


}
