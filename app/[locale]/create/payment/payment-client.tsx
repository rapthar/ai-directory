'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentView from "@/components/payment-view";

function PaymentContent() {
  const searchParams = useSearchParams();
  return <PaymentView />;
}

export default function ClientPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}