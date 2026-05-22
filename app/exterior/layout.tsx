import { StoreHeader, StoreFooter } from '@/components/store'

export default function ExteriorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="theme-exterior min-h-screen bg-[#E8E6E3]">
      <StoreHeader variant="exterior" />
      {children}
      <StoreFooter variant="exterior" />
    </div>
  )
}
