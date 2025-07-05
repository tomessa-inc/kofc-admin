import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import React from "react";

const ProductTableTools = () => {
    const addToTeam = () => {

      //  publishGallery()

    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">

            <Link className="block lg:inline-block md:mb-0 mb-4"
                onClick={addToTeam}
                  to=""
            >
            <Button block variant="solid" size="sm" onClick={addToTeam}>
                Add Player to Team
            </Button>
            </Link>

        </div>
    )
}

export default ProductTableTools
