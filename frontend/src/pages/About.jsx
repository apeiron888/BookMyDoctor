import React from 'react'
import { assets } from '../assets/assets_frontend/assets';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>{t('ABOUT')} <span className='text-gray-700 font-medium'>{t('US')}</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            {t('Selam! Welcome to BookMyDoctor — a homegrown healthcare platform shaped by patients, doctors and community health workers. We bring modern digital convenience with a warm, local touch so getting care feels familiar and reliable.')}
          </p>

          <p>
            {t('From busy streets of cities to the coastal towns, BookMyDoctor connects you with trusted practitioners across the country. Whether you need a same-day clinic visit, a teleconsultation in Amharic, Afaan Oromoo or English, or a place to store your health records securely, our platform was built for Ethiopian life.')}
          </p>

          <b className='text-gray-800'>{t('Our Mission')}</b>
          <p>
            {t('To make quality healthcare easy to access for every Ethiopian by combining practical technology with community‑centred care — respectful of local culture, language and everyday needs.')}
          </p>

          <b className='text-gray-800'>{t('Our Vision')}</b>
          <p>
            {t('A healthier Ethiopia where people can find the right care quickly, manage their health confidently, and stay connected to caregivers who understand their lives and communities.')}
          </p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>{t('WHY')} <span className='text-gray-700 font-semibold'>{t('CHOOSE US')}</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4'>
        <div className='group border px-10 md:px-16 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-primary transition-all duration-300 text-gray-600 cursor-pointer'>
          <b className='group-hover:text-white'>{t('Nation-wide Access')}</b>
          <p className='group-hover:text-white'>
            {t(`Find and book trusted clinics and doctors across Addis Ababa, Dire Dawa, Bahir Dar and beyond — useful whether you're in a city or a rural village.`)}
          </p>
        </div>

        <div className='group border px-10 md:px-16 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-primary transition-all duration-300 text-gray-600 cursor-pointer'>
          <b className='group-hover:text-white'>{t('Local Language Support')}</b>
          <p className='group-hover:text-white'>
            {t('Use BookMyDoctor in Amharic, or English and get culturally sensitive care and reminders that fit your routine.')}
          </p>
        </div>

        <div className='group border px-10 md:px-16 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-primary transition-all duration-300 text-gray-600 cursor-pointer'>
          <b className='group-hover:text-white'>{t('Practical & Community‑Focused')}</b>
          <p className='group-hover:text-white'>
            {t('We work with local GPs, specialists and public health teams to deliver features that matter — from maternal and child care reminders to chronic disease follow-up.')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default About