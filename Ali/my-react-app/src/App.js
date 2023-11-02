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
            <section className="section-colored">
                {/* Content for this section goes here */}  
                <p>WE ARE OPEN EVERYDAY FROM 6AM-12AM. WE TAKE BOOKINGS AND WE HAVE TABLES AVAILABLE INSIDE AND OUTSIDE FOR WALK-IN'S.</p>
                <br/>
                <p>LOCATION<br/>
                1702 George Bush Dr E.<br/>
                College Station, TX 77840</p>
                <p>979-696-JAVA (5282)</p>
            </section>
            <Footer />
        </div>
    );
}

export default App;
