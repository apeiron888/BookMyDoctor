import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const { t } = useTranslation();

  const [appointments, setAppointments] = useState([]);
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const navigate = useNavigate();

  const slotDateFormatter = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentPayHere = async (appointmentId) => {
    try {
      // Wait for PayHere to load (up to 5 seconds)
      let attempts = 0;
      const maxAttempts = 10;

      while (!window.payhere && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      }

      if (!window.payhere) {
        toast.error(t("Payment system is loading. Please try again in a moment."));
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/user/payment-payhere`, { appointmentId }, { headers: { token } });
      if (data.success) {
        initPayHere(data.paymentData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPayHere = (paymentData) => {
    if (!window.payhere) {
      toast.error(t("Payment system not loaded. Please refresh the page."));
      return;
    }

    // PayHere payment object
    const payment = {
      sandbox: true,
      merchant_id: paymentData.merchant_id,
      return_url: paymentData.return_url,
      cancel_url: paymentData.cancel_url,
      notify_url: paymentData.notify_url,
      order_id: paymentData.order_id,
      items: paymentData.items,
      amount: parseFloat(paymentData.amount).toFixed(2),
      currency: paymentData.currency,
      hash: paymentData.hash,
      first_name: paymentData.first_name,
      last_name: paymentData.last_name,
      email: paymentData.email,
      phone: paymentData.phone,
      address: paymentData.address,
      city: paymentData.city,
      country: paymentData.country,
      custom_1: paymentData.custom_1
    };

    // Show the PayHere payment modal
    window.payhere.startPayment(payment);

    // Payment completion handler
    window.payhere.onCompleted = async function onCompleted(orderId) {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/confirm-payment`,
          { appointmentId: payment.custom_1, orderId: orderId },
          { headers: { token } }
        );

        if (data.success) {
          toast.success(t("Payment completed successfully!"));
          getUserAppointments();
        } else {
          toast.warning(t("Payment completed but status update failed. Please refresh."));
        }
      } catch (error) {
        console.log(error);
        toast.warning(t("Payment completed but status update failed. Please refresh."));
      }

      setTimeout(() => {
        navigate('/my-appointments');
      }, 2000);
    };

    // Payment dismissal handler
    window.payhere.onDismissed = function onDismissed() {
      toast.info(t("Payment was cancelled"));
    };

    // Payment error handler
    window.payhere.onError = function onError(error) {
      toast.error(t("Payment failed. Please try again."));
    };
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>{t('My Appointments')}</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{t(item.docData.speciality)}</p>
              <p className='text-zinc-700 font-medium mt-1'>{t('Address :')}</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm mt-1 text-neutral-700 font-medium'>{t('Date & Time :')} </span>{slotDateFormatter(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>{t('Paid')}</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentPayHere(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>{t('Pay Online')}</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>{t('Cancel Request')}</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>{t('Appointment Cancelled')}</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>{t('Completed')}</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments;