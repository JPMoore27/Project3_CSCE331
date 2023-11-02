import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

function App() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    useEffect(() => {
        document.body.classList.add('animation-bg');
        const timer = setTimeout(() => {
            setIsOverlayVisible(false);
            document.body.classList.remove('animation-bg');
        }, 3000);  // 3 seconds for example

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {isOverlayVisible && <div className="fadeOverlay"></div>}
            <Header />
            <Footer />
        </div>
    );
}

export default App;
