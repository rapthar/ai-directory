'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const t = useTranslations('contact');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-grid-small-purple">
      <div className="max-w-[1400px] mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4">{t('title')}</h1>
          <p className="text-center text-gray-400 mb-16 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-20">
            <div className="w-full max-w-2xl mx-auto lg:mx-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">{t('form.firstName')}</label>
                    <input
                      type="text"
                      {...register('firstName', { required: true })}
                      className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-300 border border-gray-700 hover:border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                      placeholder={t('form.firstName')}
                    />
                    {errors.firstName && <span className="text-red-400 text-sm mt-1">This field is required</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">{t('form.lastName')}</label>
                    <input
                      type="text"
                      {...register('lastName', { required: true })}
                      className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-300 border border-gray-700 hover:border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                      placeholder={t('form.lastName')}
                    />
                    {errors.lastName && <span className="text-red-400 text-sm mt-1">This field is required</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">{t('form.email')}</label>
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-300 border border-gray-700 hover:border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                    placeholder="you@company.com"
                  />
                  {errors.email && <span className="text-red-400 text-sm mt-1">Please enter a valid email</span>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">{t('form.phone')}</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-300 border border-gray-700 hover:border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">{t('form.message')}</label>
                  <textarea
                    {...register('message', { required: true })}
                    rows={6}
                    className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-300 border border-gray-700 hover:border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                    placeholder="Leave us a message..."
                  />
                  {errors.message && <span className="text-red-400 text-sm mt-1">This field is required</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#FF3B9A] to-[#4845FF] text-white rounded-full py-5 px-8 text-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? t('form.sending') : t('form.submit')}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-center text-sm">{t('form.success')}</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center text-sm">{t('form.error')}</p>
                )}
              </form>
            </div>

            <div className="flex flex-col justify-between h-full space-y-8 lg:pl-8">
              <div>
                <h2 className="text-3xl font-semibold mb-6">{t('chat.title')}</h2>
                <p className="text-gray-400 mb-8 text-lg">{t('chat.subtitle')}</p>
                <div className="space-y-6">
                  <Link href="#" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                    <div className="bg-gray-800/50 p-4 rounded-lg mr-4 group-hover:bg-gray-800 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-medium block">{t('chat.startChat')}</span>
                      <span className="text-sm text-gray-400">Available 24/7</span>
                    </div>
                  </Link>
                  <Link href="mailto:contact@example.com" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                    <div className="bg-gray-800/50 p-4 rounded-lg mr-4 group-hover:bg-gray-800 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-medium block">{t('chat.sendEmail')}</span>
                      <span className="text-sm text-gray-400">Response within 24 hours</span>
                    </div>
                  </Link>
                  <Link href="https://twitter.com/example" className="flex items-center text-gray-300 hover:text-white transition-colors group">
                    <div className="bg-gray-800/50 p-4 rounded-lg mr-4 group-hover:bg-gray-800 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-medium block">{t('chat.messageX')}</span>
                      <span className="text-sm text-gray-400">Quick updates and news</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{t('call.title')}</h3>
                    <p className="text-gray-400 mb-4">{t('call.subtitle')}</p>
                    <Link href="tel:+1555000000" className="inline-flex items-center text-gray-300 hover:text-white text-lg transition-colors group">
                      <div className="bg-gray-800/50 p-3 rounded-lg mr-3 group-hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                      </div>
                      <span>{t('call.phone')}</span>
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">{t('visit.title')}</h3>
                    <p className="text-gray-400 mb-4">{t('visit.subtitle')}</p>
                    <Link href="https://maps.google.com" className="inline-flex items-center text-gray-300 hover:text-white text-lg transition-colors group">
                      <div className="bg-gray-800/50 p-3 rounded-lg mr-3 group-hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                          <circle cx="12" cy="9" r="2.5"/>
                        </svg>
                      </div>
                      <span>{t('visit.address')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
