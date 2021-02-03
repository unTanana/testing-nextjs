import React from 'react';
import Link from 'next/link';

const navRoutes = [
  {
    path: '/login',
    text: 'Login',
  },
  {
    path: '/register',
    text: 'Register',
  },
  {
    path: '/signout',
    text: 'Sign Out',
  },
];

export default function Navigation() {
  return (
    <nav className="space-x-6 mb-2 px-2 text-right">
      {navRoutes.map((route) => (
        <Link key={route.path} href={route.path}>
          <a>{route.text}</a>
        </Link>
      ))}
    </nav>
  );
}
