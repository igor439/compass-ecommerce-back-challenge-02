import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stock_Keeping_Unit } from "./stock_keeping_unit.entity";



@Entity()
export  class  Product{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column()
    description:string;


    @Column()
    discount_price:number;

    @Column()
    price:number;


    @Column({ type: 'decimal', precision: 5, scale: 4 })
    discount_percent:number;

    @Column()
    is_new:boolean;

    @Column()
    image_link:string;

    @Column({ type: 'timestamp' })
    created_date:Date;

    @Column({ type: 'timestamp' })
    updated_date:Date;



    
    @ManyToOne(() => Stock_Keeping_Unit,(sku) => sku.products,{ nullable: false })
    @JoinColumn({name:'sku',referencedColumnName:'stock_keeping_unit'})
    sku:Stock_Keeping_Unit;






    


}