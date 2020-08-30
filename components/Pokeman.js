import React from 'react';
import PropTypes from 'prop-types';

function Pokeman({ pokeman }) {
  return (
    <div className="p-10 bg-gray-100 rounded shadow-md">
      <h1 className="mb-2 text-4xl text-center capitalize">{pokeman.name}</h1>
      <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
      <div className="text-center">
        <p>
          <span className="mr-2 text-xs font-bold uppercase">Weight:</span> {pokeman.weight}
        </p>
        <p>
          <span className="mr-2 text-xs font-bold uppercase">Height:</span>
          {pokeman.height}
        </p>
        <h2 className="mt-6 mb-2 text-2xl">Types</h2>
        <div className="flex justify-center space-x-4">
          {pokeman.types.map((type, index) => (
            <p className="px-4 py-1 text-sm font-semibold text-gray-100 uppercase bg-gray-700 rounded" key={index}>
              {type.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

Pokeman.propTypes = {
  pokeman: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    weight: PropTypes.any,
    height: PropTypes.any,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
};

export default Pokeman;
