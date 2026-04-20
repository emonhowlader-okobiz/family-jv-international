import Container from '@/components/shared/Container'
import { IoIosSearch } from "react-icons/io";

const ExportPage = () => {
    return (
        <div className='py-10'>
            <Container>
                <div className='py-8 flex items-center justify-between'>
                    <h1 className='text-4xl font-semibold'>Our Export Portfolio</h1>
                    <p className='text-lg mt-4 max-w-lg'>Explore our diverse range of export products, <br /> showcasing our commitment to quality and<br /> global trade excellence.</p>
                </div>

                <div className='bg-white rounded-lg py-4 px-3 flex items-center justify-between'>
                    <IoIosSearch />

                    <div>
                        
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ExportPage