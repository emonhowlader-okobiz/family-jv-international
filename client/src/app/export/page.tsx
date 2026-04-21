import Container from '@/components/shared/Container'
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"
import ProductCard from '@/components/cards/ProductCard';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from 'lucide-react';
import { TProduct } from '@/types/product';

const exportProducts: TProduct[] = [
    {
        _id: 1,
        name: "Atrttisan Jute Sacks",
        image: "/assets/hero.jpg",
        category: "Texttiles",
        moq: 1000,
        slug: "artisan-jute-sacks",
        description: "Our artisan jute sacks are crafted with care and precision, showcasing the natural beauty of jute fibers. These sacks are not only durable but also eco-friendly, making them an ideal choice for sustainable packaging solutions. Each sack is a testament to our commitment to quality and craftsmanship, perfect for a variety of uses including storage, transportation, and even as stylish tote bags.",
    },
    {
        _id: 2,
        name: "Atrttisan Jute Sacks",
        image: "/assets/hero.jpg",
        category: "Texttiles",
        moq: 1000,
        slug: "artisan-jute-sacks",
        description: "Our artisan jute sacks are crafted with care and precision, showcasing the natural beauty of jute fibers. These sacks are not only durable but also eco-friendly, making them an ideal choice for sustainable packaging solutions. Each sack is a testament to our commitment to quality and craftsmanship, perfect for a variety of uses including storage, transportation, and even as stylish tote bags.",
    },
    {
        _id: 3,
        name: "Atrttisan Jute Sacks",
        image: "/assets/hero.jpg",
        category: "Leather Goods",
        moq: 1000,
        slug: "artisan-jute-sacks",
        description: "Our artisan jute sacks are crafted with care and precision, showcasing the natural beauty of jute fibers. These sacks are not only durable but also eco-friendly, making them an ideal choice for sustainable packaging solutions. Each sack is a testament to our commitment to quality and craftsmanship, perfect for a variety of uses including storage, transportation, and even as stylish tote bags.",
    },
    {
        _id: 4,
        name: "Atrttisan Jute Sacks",
        image: "/assets/hero.jpg",
        category: "Raw Materials",
        moq: 1000,
        slug: "artisan-jute-sacks",
        description: "Our artisan jute sacks are crafted with care and precision, showcasing the natural beauty of jute fibers. These sacks are not only durable but also eco-friendly, making them an ideal choice for sustainable packaging solutions. Each sack is a testament to our commitment to quality and craftsmanship, perfect for a variety of uses including storage, transportation, and even as stylish tote bags.",
    }, {
        _id: 5,
        name: "Atrttisan Jute Sacks",
        image: "/assets/hero.jpg",
        category: "Texttiles",
        moq: 1000,
        slug: "artisan-jute-sacks",
        description: "Our artisan jute sacks are crafted with care and precision, showcasing the natural beauty of jute fibers. These sacks are not only durable but also eco-friendly, making them an ideal choice for sustainable packaging solutions. Each sack is a testament to our commitment to quality and craftsmanship, perfect for a variety of uses including storage, transportation, and even as stylish tote bags.",
    },
    {
        _id: 6,
        name: "Atrttisan Jute Sacks",
        image: "/assets/hero.jpg",
        category: "Texttiles",
        moq: 1000,
        slug: "artisan-jute-sacks",
        description: "Our artisan jute sacks are crafted with care and precision, showcasing the natural beauty of jute fibers. These sacks are not only durable but also eco-friendly, making them an ideal choice for sustainable packaging solutions. Each sack is a testament to our commitment to quality and craftsmanship, perfect for a variety of uses including storage, transportation, and even as stylish tote bags.",
    },
    {
        _id: 7,
        name: "Atrttisan Jute Sacks",
        image: "/assets/hero.jpg",
        category: "Texttiles",
        moq: 1000,
        slug: "artisan-jute-sacks",
        description: "Our artisan jute sacks are crafted with care and precision, showcasing the natural beauty of jute fibers. These sacks are not only durable but also eco-friendly, making them an ideal choice for sustainable packaging solutions. Each sack is a testament to our commitment to quality and craftsmanship, perfect for a variety of uses including storage, transportation, and even as stylish tote bags.",
    },

]

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const ExportPage = () => {
    const uniqueCategories = Array.from(new Set(exportProducts.map(product => product.category)));

    return (
        <div className='pb-10'>
            <Container>
                <div className='py-8 flex items-center justify-between'>
                    <h1 className='text-4xl font-semibold'>Our Export Portfolio</h1>
                    <p className='text-lg mt-4 max-w-lg'>Explore our diverse range of export products, <br /> showcasing our commitment to quality and<br /> global trade excellence.</p>
                </div>

                <div className='bg-white rounded-lg py-4 px-3 flex flex-col sm:flex-row sm:items-center gap-3'>

                    {/* Search */}
                    <InputGroup className='border-0 max-w-auto'>
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    <div className='flex items-center gap-3 min-w-75'>
                        {/* Filter by Category */}
                        <NativeSelect>
                            <NativeSelectOption value="">Select All Category</NativeSelectOption>
                            {uniqueCategories.map(category => (
                                <NativeSelectOption key={category} value={category.toLowerCase()}>{category}</NativeSelectOption>
                            ))}
                        </NativeSelect>

                        {/* Sort */}
                        <NativeSelect>
                            <NativeSelectOption value="">Sort</NativeSelectOption>
                            <NativeSelectOption value="natural">Natural</NativeSelectOption>
                            <NativeSelectOption value="artificial">Atrificial</NativeSelectOption>
                        </NativeSelect>
                    </div>


                </div>

                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8'>
                    {exportProducts.map(product => <ProductCard key={product._id} product={product} />)}
                </div>

                {/* pagination */}
                <div className='mt-10'>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </Container>
        </div>
    )
}

export default ExportPage