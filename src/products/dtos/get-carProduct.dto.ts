export class GetProductCardDto {
    private name: string = '';
    private description: string = '';
    private discount_price: number = 0;
    private price: number = 0;
    private discount_percent: number = 0;
    private is_new: boolean = false;
    private image_link: string = '';
    private created_date: Date = new Date();
    private updated_date: Date = new Date();

    constructor() {
        // Se desejar, você pode inicializar as propriedades aqui também.
    }
}


