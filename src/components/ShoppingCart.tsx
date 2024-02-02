import {Offcanvas, Stack} from "react-bootstrap"
import { useShoppingCartContext } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"
type ShoppingCartContextProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartContextProps) {
    const {closeCart, cartItems} = useShoppingCartContext()
    return (
        <Offcanvas show={isOpen} onHide={closeCart}placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total {formatCurrency(cartItems.reduce((total,
                            cartItem) => {
                                const item = storeItems.find(ii => ii.id === 
                                    cartItem.id)
return total + (item?.price || 0) * cartItem.quantity
                                    cartItem.quantity}, 0))}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}