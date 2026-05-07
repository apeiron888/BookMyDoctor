// Using public folder paths for Vercel deployment
const appointment_img = '/appointment_img.png'
const header_img = '/header_img.png'
const group_profiles = '/group_profiles.png'
const profile_pic = '/profile_pic.png'
const contact_image = '/contact_image.png'
const about_image = '/about_image.png'
const logo = '/logo.svg'
const dropdown_icon = '/dropdown_icon.svg'
const menu_icon = '/menu_icon.svg'
const cross_icon = '/cross_icon.png'
const chats_icon = '/chats_icon.svg'
const verified_icon = '/verified_icon.svg'
const arrow_icon = '/arrow_icon.svg'
const info_icon = '/info_icon.svg'
const upload_icon = '/upload_icon.png'
const stripe_logo = '/stripe_logo.png'
const razorpay_logo = '/razorpay_logo.png'
const doc1 = '/doc1.png'
const doc2 = '/doc2.png'
const doc3 = '/doc3.png'
const doc4 = '/doc4.png'
const doc5 = '/doc5.png'
const doc6 = '/doc6.png'
const doc7 = '/doc7.png'
const doc8 = '/doc8.png'
const doc9 = '/doc9.png'
const doc10 = '/doc10.png'
const doc11 = '/doc11.png'
const doc12 = '/doc12.png'
const doc13 = '/doc13.png'
const doc14 = '/doc14.png'
const doc15 = '/doc15.png'
const Dermatologist = '/Dermatologist.svg'
const Gastroenterologist = '/Gastroenterologist.svg'
const General_physician = '/General_physician.svg'
const Gynecologist = '/Gynecologist.svg'
const Neurologist = '/Neurologist.svg'
const Pediatricians = '/Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Dawit Tadesse',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: 'Bole Road, Dembel City Center',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Almaz Bekele',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 600,
        address: {
            line1: 'Piazza, Arada Sub-City',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Samuel Girma',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 300,
        address: {
            line1: 'Kazanchis, Jomo Kenyatta St',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Bethlehem Alemu',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 400,
        address: {
            line1: 'Megenagna, Diaspora Square',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Tewodros Assefa',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: 'Sarbet, Pushkin Square',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Rahel Zewde',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: 'Sarbet, Pushkin Square',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Yosef Kebede',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: 'Bole Road, Dembel City Center',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Tigist Mekonnen',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 600,
        address: {
            line1: 'Piazza, Arada Sub-City',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Elias Lemma',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 300,
        address: {
            line1: 'Kazanchis, Jomo Kenyatta St',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Kalkidan Tesfaye',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 400,
        address: {
            line1: 'Megenagna, Diaspora Square',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Nahom Belay',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: 'Sarbet, Pushkin Square',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Selamawit Hailu',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: 'Sarbet, Pushkin Square',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Abdi Dibaba',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: 'Bole Road, Dembel City Center',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Mahlet Getachew',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 600,
        address: {
            line1: 'Piazza, Arada Sub-City',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Biniyam Seyoum',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 300,
        address: {
            line1: 'Kazanchis, Jomo Kenyatta St',
            line2: 'Addis Ababa, Ethiopia'
        }
    },
]