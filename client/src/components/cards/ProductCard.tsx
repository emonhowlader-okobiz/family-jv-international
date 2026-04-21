import Link from "next/link"
import { TProduct } from "@/types/product"

const ProductCard = ({ product }: { product: TProduct }) => {
    const { _id, name, image, category, moq, slug, description } = product;
    return (
        <div key={_id} className='rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-white pb-5'>
                <div className='relative'>
                    <img src={image} alt="img" />

                    <div className='border border-secondary py-1 px-2 w-fit bg-neutral absolute top-3 left-3'>{category}</div>
                </div>

                <div className='p-3'>
                    <h2 className='text-2xl font-semibold mt-4 text-primary'>{name}</h2>
                    <p className='line-clamp-3'>{description}</p>
                </div>

            </div>

            <div className='flex items-center justify-between p-3'>
                <p>MOQ: {moq}</p>
                <Link href={`/export/${slug}`} className='bg-primary text-white p-2 rounded'>View Details</Link>
            </div>
        </div>
    )
}

export default ProductCard