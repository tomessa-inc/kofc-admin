import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import React from "react";
import {publishGallery} from "@/views/gallery/List/store";

const ProductTableTools = () => {
    const publish = () => {

        publishGallery()

    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">

            <Link className="block lg:inline-block md:mb-0 mb-4"
                onClick={publish}
                  to=""
            >
            <Button block variant="solid" size="sm" onClick={publish}>
                Add Player to Team
            </Button>
            </Link>

        </div>
    )
}

export default ProductTableTools
