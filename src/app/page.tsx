import Logo from '@/components/molecules/logo';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <Logo />
    </div>
  );
}
