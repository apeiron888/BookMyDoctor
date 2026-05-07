import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext.jsx'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AddDoctor = () => {

    const [docImage, setDocImage] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const { t } = useTranslation();
    const [degree, setDegree] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [about, setAbout] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!docImage) {
                return toast.error("Image not selected");
            }

            const formData = new FormData();
            formData.append("image", docImage);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("about", about);
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

            //console log formdata
            formData.forEach((value, key) => {
                console.log(key + ': ' + value);
            });

            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message);
                setDocImage(false);
                setName('');
                setEmail('');
                setPassword('');
                setFees('');
                setDegree('');
                setAddress1('');
                setAddress2('');
                setAbout('');
                setExperience('1 Year');
                setSpeciality('General physician');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-10 w-full '>
            <p className='mb-3 text-lg font-medium'>{t('Add Doctor')}</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-green-100 rounded-full cursor-pointer' src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id='doc-img' hidden />
                    <p>{t('Upload doctor')} <br /> {t('picture')}</p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Doctor Name')}</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder={t('Name')} required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Doctor Email')}</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder={t('Email')} required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Doctor Password')}</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder={t('Password')} required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Experience')}</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} name='' className='border rounded px-3 py-2'>
                                <option value="1 Year">{t('1 Year')}</option>
                                <option value="2 Year">{t('2 Year')}</option>
                                <option value="3 Year">{t('3 Year')}</option>
                                <option value="4 Year">{t('4 Year')}</option>
                                <option value="5 Year">{t('5 Year')}</option>
                                <option value="6 Year">{t('6 Year')}</option>
                                <option value="7 Year">{t('7 Year')}</option>
                                <option value="8 Year">{t('8 Year')}</option>
                                <option value="9 Year">{t('9 Year')}</option>
                                <option value="10+ Year">{t('10+ Year')}</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Fees')}</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder={t('Fees')} required />
                        </div>
                    </div>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Speciality')}</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
                                <option value="General physician">{t('General physician')}</option>
                                <option value="Gynecologist">{t('Gynecologist')}</option>
                                <option value="Dermatologist">{t('Dermatologist')}</option>
                                <option value="Pediatricians">{t('Pediatricians')}</option>
                                <option value="Neurologist">{t('Neurologist')}</option>
                                <option value="Gastroenterologist">{t('Gastroenterologist')}</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Education')}</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder={t('Education')} required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>{t('Address')}</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder={t('Address 1')} required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder={t('Address 2')} required />
                        </div>
                    </div>
                </div>
                <div>
                    <p className='mt-4 mb-2'>{t('About Doctor')}</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder={t('About Doctor')} rows={5} required />
                </div>
                <button className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>{t('Add Doctor')}</button>
            </div>
        </form>

    )
}

export default AddDoctor