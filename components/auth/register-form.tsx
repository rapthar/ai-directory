"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import Link from 'next/link';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('auth');

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Registration failed');
      
      toast.success(t('register.success'));
      reset();
    } catch (error) {
      toast.error(t('register.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1829] text-white">
      <div className="max-w-md mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{t('register.title')}</h1>
          <p className="text-gray-400 mb-8">{t('register.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="text"
              {...register('username', { required: true })}
              placeholder={t('register.username')}
              className="bg-transparent border-gray-700 focus:border-gray-500"
            />
            {errors.username && <span className="text-red-500 text-sm">{t('register.usernameRequired')}</span>}
          </div>

          <div>
            <Input
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              placeholder={t('register.email')}
              className="bg-transparent border-gray-700 focus:border-gray-500"
            />
            {errors.email && <span className="text-red-500 text-sm">{t('register.emailInvalid')}</span>}
          </div>

          <div>
            <Input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              placeholder={t('register.password')}
              className="bg-transparent border-gray-700 focus:border-gray-500"
            />
            {errors.password && <span className="text-red-500 text-sm">{t('register.passwordLength')}</span>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#FF3B9A] to-[#4845FF] text-white rounded-full px-8 py-1.5 text-base font-normal hover:opacity-90 border-0"
          >
            {isSubmitting ? t('register.submitting') : t('register.submit')}
          </Button>

          <p className="text-center text-gray-400 mt-4">
            {t('register.haveAccount')}{' '}
            <Link href="/login" className="text-[#FF3B9A] hover:underline">
              {t('register.signIn')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}