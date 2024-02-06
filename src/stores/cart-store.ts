import { ProductProps } from '@/utils/data/products';
import { create } from 'zustand';
import * as cartInMemory from "./helpers/car-in-memory";


export type ProductsCartProps = ProductProps & {
    quantity: number
}

type StateProps = {
    products: ProductsCartProps[]
    add: (product: ProductProps) => void
}

export const useCartStore = create<StateProps>((set) => ({
    products: [],
    add: (product: ProductProps) => set((state) => ({
        products: cartInMemory.add(state.products, product)
    }))
}))