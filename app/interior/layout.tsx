import { StoreHeader, StoreFooter } from '@/components/store'

export default function InteriorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="theme-interior min-h-screen bg-[#FAF8F5]">
      <StoreHeader variant="interior" />
      {children}
      <StoreFooter variant="interior" />
    </div>
  )
}
