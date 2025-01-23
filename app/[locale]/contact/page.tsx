'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      
      toast.success(t('form.success'));
      reset();
    } catch (error) {
      toast.error(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1829] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">{t('title')}</h1>
          <p className="text-center text-gray-400 mb-12">{t('subtitle')}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  {...register('firstName', { required: true })}
                  placeholder={t('form.firstName')}
                  className="bg-transparent border-gray-700 focus:border-gray-500"
                />
                {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div>
                <Input
                  type="text"
                  {...register('lastName', { required: true })}
                  placeholder={t('form.lastName')}
                  className="bg-transparent border-gray-700 focus:border-gray-500"
                />
                {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
            </div>

            <div>
              <Input
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                placeholder={t('form.email')}
                className="bg-transparent border-gray-700 focus:border-gray-500"
              />
              {errors.email && <span className="text-red-500 text-sm">Please enter a valid email</span>}
            </div>

            <div>
              <Input
                type="tel"
                {...register('phone')}
                placeholder={t('form.phone')}
                className="bg-transparent border-gray-700 focus:border-gray-500"
              />
            </div>

            <div>
              <Textarea
                {...register('message', { required: true })}
                placeholder={t('form.message')}
                className="bg-transparent border-gray-700 focus:border-gray-500 min-h-[150px]"
              />
              {errors.message && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#FF3B9A] to-[#4845FF] text-white rounded-full px-8 py-1.5 text-base font-normal hover:opacity-90 border-0"
              >
                {t('form.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
