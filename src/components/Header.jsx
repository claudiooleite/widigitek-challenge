import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="w-full bg-main py-4">
            <div className="container mx-auto px-4">
                <Link to="/" className="text-3xl font-bold">
                    Restaurant App
                </Link>
            </div>
        </header>
    );
}

export default Header;
