import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets.js';
import { DoctorContext } from '../context/DoctorContext.jsx';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {

    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);
    const { t, i18n } = useTranslation();

    return (
        <div className='min-h-screen bg-white border-r flex flex-col justify-between'>
            <div>
                {
                    aToken && <ul className='text-[#515151] mt-5'>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2FFF3] border-r-4 border-primary' : ''}`} to='/admin-dashboard'>
                            <img src={assets.home_icon} alt="" />
                            <p className='hidden md:block'>{t('Dashboard')}</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2FFF3] border-r-4 border-primary' : ''}`} to='/all-appointments'>
                            <img src={assets.appointment_icon} alt="" />
                            <p className='hidden md:block'>{t('Appointments')}</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2FFF3] border-r-4 border-primary' : ''}`} to='/add-doctor'>
                            <img src={assets.add_icon} alt="" />
                            <p className='hidden md:block'>{t('Add Doctor')}</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2FFF3] border-r-4 border-primary' : ''}`} to='/doctors-list'>
                            <img src={assets.people_icon} alt="" />
                            <p className='hidden md:block'>{t('Doctors List')}</p>
                        </NavLink>
                    </ul>
                }
                {
                    dToken && <ul className='text-[#515151] mt-5'>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2FFF3] border-r-4 border-primary' : ''}`} to='/doctor-dashboard'>
                            <img src={assets.home_icon} alt="" />
                            <p className='hidden md:block'>{t('Dashboard')}</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2FFF3] border-r-4 border-primary' : ''}`} to='/doctor-appointments'>
                            <img src={assets.appointment_icon} alt="" />
                            <p className='hidden md:block'>{t('Appointments')}</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2FFF3] border-r-4 border-primary' : ''}`} to='/doctor-profile'>
                            <img src={assets.people_icon} alt="" />
                            <p className='hidden md:block'>{t('Profile')}</p>
                        </NavLink>

                    </ul>
                }
            </div>
            {/* Language Switcher at bottom of sidebar */}
            <div className='p-5 border-t'>
                <select
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    value={i18n.language}
                    className='w-full bg-transparent border border-gray-400 text-sm px-2 py-2 rounded font-medium cursor-pointer'
                >
                    <option value="en">English (Eng)</option>
                    <option value="am">Amharic (Amh)</option>
                </select>
            </div>
        </div>
    )
}

export default Sidebar;