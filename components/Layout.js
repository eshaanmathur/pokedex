import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';

function Layout({ title = 'Home', children }) {
  return (
    <div className="bg-gray-400">
      <Head>
        <title>Pokiedex | {title}</title>
        <link rel="icon" type="image/ico" href="/fav.ico" />
      </Head>
      <header className="flex flex-col items-center w-full py-4 bg-gray-100">
        <div className="flex items-baseline text-5xl font-extrabold text-gray-800 space-x-1">
          <img src="/logo.svg" alt="Pokedex" title="Pokedex" />
          <h1>Pokédex</h1>
        </div>
      </header>
      <main className="max-w-2xl min-h-screen py-8 mx-auto ">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
