import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="w-full text-center py-4">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                IA de Retrato Cinematográfico
            </h1>
            <p className="mt-2 text-lg text-gray-400">
                Transforme suas fotos em obras de arte dramáticas e com iluminação low-key.
            </p>
        </header>
    );
};