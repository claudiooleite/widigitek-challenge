import React from 'react';


function Footer() {
    return (
        <footer className="bg-main text-center py-4 mt-8">
            <p>© {new Date().getFullYear()} Restaurant App. All rights reserved.</p>
            <p className="text-secondary">"Great food, great memories!"</p>
        </footer>
    );
}

export default Footer;
