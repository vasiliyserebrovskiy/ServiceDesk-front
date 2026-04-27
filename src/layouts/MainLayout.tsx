export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>Service Desk</header>
      <main>{children}</main>
    </div>
  );
}
