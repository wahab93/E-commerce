import React from 'react'
import usePageTitle from '../../../common/usePageTitle'
import { Herosection } from './herosection'
import { FeaturedSection } from './featuredSection'
import { CategorySilder } from './categorySilder'
import { ContentBanner } from './contentBanner'
import { BestSeller } from './bestSeller'
import { CustomerFeedback } from './customerFeedback'
import { Testimonial } from './testimonial'
import { DiscountProducts } from './discountProducts'
import { OurProducts } from './ourProducts'

export const Home = ({ getwebsiteDetails }) => {
    usePageTitle('Home');
    return (
        <>
            <Herosection getBannerText={getwebsiteDetails} />
            {/* <FeaturedSection /> */}
            {/* <DiscountProducts /> */}
            <CategorySilder />
            <BestSeller />
            <ContentBanner getwebsiteDetails={getwebsiteDetails}/>
            <OurProducts />
            <CustomerFeedback />
            <Testimonial />
        </>
    )
}