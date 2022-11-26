import React, { FC } from 'react';
import Link from 'next/link';

interface Props {

}

const Header: FC<Props> = () => {
  return (
    <>
      <Link href={'/'}>
        <p>Main</p>
      </Link>
      <Link href={'/second'}>
        <p>second</p>
      </Link>
    </>
  );
};

export default Header;
