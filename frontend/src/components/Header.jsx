import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useTranslation } from 'react-i18next'

const Header = () => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 min-h-[500px]'>
            {/* -----Left Side----- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-16 lg:py-20'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    {t('Schedule Your Visit')} <br /> {t('With Our Expert Doctors')}
                </p>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28 sm:items-center' src={assets.group_profiles} alt="" />
                    <p>
                        {t('Connect with our network of trusted medical specialists')}
                        <br className='hidden sm:block' />
                        {t('and book your appointment seamlessly.')}
                    </p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    {t('Book appointment')} <img className='w-3' src={assets.arrow_icon} alt="" /></a>
            </div>
            {/* -----Right Side----- */}
            <div className='md:w-1/2 relative flex items-end justify-center'>
                <img className='w-full md:max-w-full h-auto max-h-[100%] rounded-lg object-contain'
                    src={assets.header_img} alt="" />
            </div>

        </div>
    )
}

export default Header
