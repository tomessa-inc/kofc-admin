import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ProductTable from './components/ProductTable'
import ProductTableTools from './components/ProductTableTools'
import React from "react";
import ProductFilter from "./components/ProductFilter";

injectReducer('playerByTeamId', reducer)

const List = () => {



    return (
        <AdaptableCard className="h-full" bodyClass="h-full">

            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Team List</h3>

                <ProductTableTools />
                <ProductFilter />
            </div>
            <ProductTable />
        </AdaptableCard>
    )
}

export default List
