import {createContext, ReactNode, useContext, useState} from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContextProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as
    ShoppingCartContext);

export function useShoppingCartContext() {
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({children}: 
    ShoppingCartContextProps) {
       const [isOpen, setisOpen] = useState(false) 
       const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

       
      const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function openCart() {
        return setisOpen(true);
    }
    const closeCart = () => setisOpen(false)
        function getItemQuantity(id: number): number {
            return cartItems.find(item => item.id === id)?.quantity || 0
        }

        function increaseCartQuantity(id: number) {
            setCartItems(currItems => {
                if (currItems.find(item => item.id === id) == null) {
                    return [...currItems, {id, quantity: 0}]
                } else {
                    return currItems.map(item => {
                        if (item.id === id) {
                            return {...item, quantity: item.quantity + 1}
                        } else {
                            return item
                        }
                    })
                }
             
            })
        }

        function decreaseCartQuantity(id: number) {
            setCartItems(currItems => {
                if (currItems.find(item => item.id === id)?.quantity === 1) {
                    return currItems.filter(item => item.id !== id)
                } else {
                    return currItems.map(item => {
                        if (item.id === id) {
                            return {...item, quantity: item.quantity - 1}
                        } else {
                            return item
                        }
                    })
                }
             
            })
        }

        function removeFromCart(id: number) {
            setCartItems(currItems => {
                return currItems.filter(item => item.id!== id)
            })
        }

        return (
            <ShoppingCartContext.Provider value={{ 
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart,
            openCart,
            cartItems,
            closeCart,
            cartQuantity,
            }}>
                {children}
                <ShoppingCart isOpen={isOpen}/>
            </ShoppingCartContext.Provider>
        )
    }