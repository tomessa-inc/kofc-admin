import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PlayerSearch from './components/PlayerSearch'
import ProductTableTeam from './components/ProductTableTeam'

import ProductTableTools from './components/ProductTableTools'

injectReducer('galleryList', reducer)

const List = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Team List</h3>
                <ProductTableTools/>
            </div>
            <ProductTableTeam/>

            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Indivdual Players</h3>
                <ProductTableTools/>
            </div>

        </AdaptableCard>


    )
}

export default List
