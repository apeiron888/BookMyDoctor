import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { useTranslation } from 'react-i18next'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>{t('All Doctors')}</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, index) => (
            <div className='border border-green-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-green-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt={item.name} />
              <div className='p-4'>
                <p className='text-neutral-800 font-medium text-lg'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{t(item.speciality)}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>{t('Available')}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default DoctorsList