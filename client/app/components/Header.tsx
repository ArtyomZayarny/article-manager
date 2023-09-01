import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <h1>Header</h1>
      <Link href={'/admin'}>Go to Admin</Link>
    </header>
  );
};
