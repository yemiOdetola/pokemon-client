import Link from 'next/link';
import React, { ReactNode } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="container relative h-screen hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-blue-800" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Pokemon test
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;The application will involve multiple organizations, each having multiple users and Pokémon. Users will only see Pokémon that belong to their organization&rdquo;
            </p>
            <footer className="text-sm">Alteox</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  )
}
