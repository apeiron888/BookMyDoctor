import React from 'react'
import { assets } from '../assets/assets_frontend/assets';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>{t('CONTACT')} <span className='text-gray-700 font-semibold'>{t('US')}</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>{t('Our OFFICE')}</p>
          <p className='text-gray-500'>{t('Bole Road, Dembel City Center,')} <br /> {t('Addis Ababa,')}<br /> {t('Ethiopia')}</p>
          <p className='text-gray-500'>{t('Tel:')} +251 911 123 456 <br /> {t('Email: careers@bookmydoctor.com')}</p>
          <p className='font-semibold text-lg text-gray-600'>{t('Careers at BookMyDoctor')}</p>
          <p className='text-gray-500'>{t('Learn more about our teams and job openings.')}</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white' type="button">{t('Explore Jobs')}</button>
        </div>
      </div>
    </div>
  )
}

export default Contact