import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/assets/stream-sphere-logo.png"
        width={75}
        height={75}
        alt="Stream Sphere Logo"
      />
    </Link>
  );
}

export default Logo;
