import { ProductProps } from "@/utils/data/products";
import { ProductsCartProps } from "../cart-store";

export function add(products: ProductsCartProps[], newProduct: ProductProps) {
    const existingProdutct = products.find(({id}) => newProduct.id === id);

    if (existingProdutct) {
        return products.map((product) => product.id === existingProdutct.id ? {...product, quantity: product.quantity+1} : product)
    }

    return [...products, {...newProduct, quantity: 1}];
}

export function remove(products: ProductsCartProps[], productRemoveId: string) {

    const updatedProducts = products.map((product) => 
        product.id === productRemoveId ? {
            ...product,
            quantity: product.quantity > 1 ? product.quantity-1 : 0
        } : product
    );

    return updatedProducts.filter((product) => product.quantity > 0);
}