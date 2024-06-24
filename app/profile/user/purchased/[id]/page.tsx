'use client';

export default function PurchasedCoursesPage({ params }: { params: { id: string } }) {
  return <main className="min-h-[100dvh] pt-[80px]">{params.id}</main>;
}
