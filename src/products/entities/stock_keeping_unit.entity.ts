import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class Stock_Keeping_Unit{

    @PrimaryColumn()
    stock_keeping_unit:string;


    @OneToMany(() => Product, (product) => product.sku)
    products:Product[];

    @Column()
    tecnical_description:string;
    
    @Column()
    large_description:string;

    @Column()
    category_id:string;

    @Column()
    size:string;

    @Column()
    color:string;







}