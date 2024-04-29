import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { FilterSkuDto } from 'src/products/dtos/filter-Sku.dto';
import { GetProductCardDto } from 'src/products/dtos/get-carProduct.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>){}


    async findall(page: number){

        const properties = Object.getOwnPropertyNames(new GetProductCardDto());
    
        if (properties.length === 0) {
            throw new Error('As propriedades da classe GetProductCardDto estão vazias.');
        }
        const pageSize = 16;
    
        // Calcula o índice de início com base na página e no tamanho da página
        const startIndex = (page - 1) * pageSize;

         // Constrói a query com a cláusula LIMIT para obter apenas os dados da página atual
        const query = `SELECT ${properties.join(', ')}
        FROM product ORDER BY name
        LIMIT ${pageSize} OFFSET ${startIndex}`;

        // Executa a query e retorna os dados
        return await this.repo.query(query);
     
    }

    async getCardProducts(page: number){
        const properties = Object.getOwnPropertyNames(new GetProductCardDto());
    
        if (properties.length === 0) {
            throw new Error('As propriedades da classe GetProductCardDto estão vazias.');
        }
        const pageSize = 8;
    
        // Calcula o índice de início com base na página e no tamanho da página
        const startIndex = (page - 1) * pageSize;
    
        // Constrói a query com a cláusula LIMIT para obter apenas os dados da página atual
        const query = `SELECT DISTINCT ${properties.join(', ')}
                       FROM product ORDER BY name
                       LIMIT ${pageSize} OFFSET ${startIndex}`;
    
        // Executa a query e retorna os dados
        return await this.repo.query(query);
    }



    async getCardProductsByFilter(filter:string,page: number,pageSize:number){

       

        if(!filter){

            const properties = Object.getOwnPropertyNames(new GetProductCardDto());
    
            if (properties.length === 0) {
                throw new Error('As propriedades da classe GetProductCardDto estão vazias.');
            }

            // Calcula o índice de início com base na página e no tamanho da página
            const startIndex = (page - 1) * pageSize;
        
            // Constrói a query com a cláusula LIMIT para obter apenas os dados da página atual
            const query = `SELECT  ${properties.join(', ')}
                        FROM product ORDER BY name
                        LIMIT ${pageSize} OFFSET ${startIndex}`;
        
            // Executa a query e retorna os dados
            return await this.repo.query(query);

        }else{


            const properties = Object.getOwnPropertyNames(new GetProductCardDto());
    
            if (properties.length === 0) {
                throw new Error('As propriedades da classe GetProductCardDto estão vazias.');
            }

             // Calcula o índice de início com base na página e no tamanho da página
             const startIndex = (page - 1) * pageSize;
        
             // Constrói a query com a cláusula LIMIT para obter apenas os dados da página atual
             const query = `
             SELECT ${properties.join(', ')} 
             FROM product
             JOIN stock_keeping_unit ON product.sku = stock_keeping_unit.stock_keeping_unit
             WHERE stock_keeping_unit.category_id = '${filter}'
             
             LIMIT ${pageSize} OFFSET ${startIndex}
         `;

         return await this.repo.query(query);

        }

        
    }

    async getCardProductsFilters(){
        const query = `
             SELECT DISTINCT category_id 
             FROM stock_keeping_unit`;

         return  await this.repo.query(query);

    }



    async getCardProductsByFilterTotalCount(filter:string,page: number,pageSize:number){

       

        if(!filter){

            const properties = Object.getOwnPropertyNames(new GetProductCardDto());
    
            if (properties.length === 0) {
                throw new Error('As propriedades da classe GetProductCardDto estão vazias.');
            }

            // Calcula o índice de início com base na página e no tamanho da página
            const startIndex = (page - 1) * pageSize;
        
            // Constrói a query com a cláusula LIMIT para obter apenas os dados da página atual
            const query = `SELECT COUNT(*) AS total FROM product;`;
        
            // Executa a query e retorna os dados
            return await this.repo.query(query);

        }else{


            const properties = Object.getOwnPropertyNames(new GetProductCardDto());
    
            if (properties.length === 0) {
                throw new Error('As propriedades da classe GetProductCardDto estão vazias.');
            }

            // Calcula o índice de início com base na página e no tamanho da página
            const startIndex = (page - 1) * pageSize;
        
            // Constrói a query com a cláusula LIMIT para obter apenas os dados da página atual
            const query = `
            SELECT COUNT(*) AS total 
            FROM product
            JOIN stock_keeping_unit ON product.sku = stock_keeping_unit.stock_keeping_unit
            WHERE stock_keeping_unit.category_id = '${filter}';
        `;

         return await this.repo.query(query);

        }

        
    }



    async getProductListByArrayOfCategory(category1: string, category2: string, category3: string, page: number, pageSize: number) {

        const categoryArray = [category1, category2, category3];
        const responseArray = [];
    
        // Mapeia a matriz de categorias em uma matriz de promessas
        const promises = categoryArray.map(category => this.getCardProductsByFilter(category, page, pageSize));
    
        // Aguarda todas as promessas serem resolvidas
        await Promise.all(promises)
            .then(responses => {
                responses.forEach(response => {
                    responseArray.push(...response); // Adiciona a resposta ao array de respostas
                });
            })
            .catch(error => {
                console.error("Erro ao obter lista de produtos por categoria:", error);
            });
    
        return responseArray; // Retorna o array completo de respostas
    }
}
