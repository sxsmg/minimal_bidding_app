import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 p-4 text-white text-center">
            <p>Minimal Bidding App © {new Date().getFullYear()}</p>
            {/* Additional footer content */}
        </footer>
    );
}

export default Footer;