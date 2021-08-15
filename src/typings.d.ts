interface IProduct {
    id: string
    name: string
    price: number
}
interface IProductBag {
    id: string
    name: string
    price: number
    quantity: number
}

interface LayoutProps {
	children: any
	fullCover: boolean
}
