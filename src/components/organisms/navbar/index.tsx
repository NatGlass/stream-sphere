import Logo from '@/components/molecules/logo';
import Search from '@/components/molecules/search';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-20 z-[40] bg-slate-800 px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
    </nav>
  );
}

export default Navbar;
