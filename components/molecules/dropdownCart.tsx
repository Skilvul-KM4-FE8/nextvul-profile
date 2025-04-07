import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cart-store";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export default function DropdownCart() {
  const { cart, clearCart, removeFromCart } = useCartStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="">
            <ShoppingCart size={20} />
            <p className="text-sm text-gray-500"> {cart.length ? <div> ({cart.length})</div> : <div></div>}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="p-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className=" ">
                  <DropdownMenuItem>
                    {item.name} <DropdownMenuShortcut>{item.quantity}</DropdownMenuShortcut>
                    <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                      X
                    </Button>
                  </DropdownMenuItem>
                </div>
              ))
            ) : (
              <p>Cart is empty</p>
            )}
            <DropdownMenuSeparator />
            <Button className="">Checkout</Button>{" "}
            <Button variant="destructive" onClick={clearCart}>
              Clear Cart
            </Button>
            <DropdownMenuSeparator />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
