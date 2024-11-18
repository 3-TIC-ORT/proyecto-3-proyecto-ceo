import React, { useRef, useState } from "react";
import { Text } from "./Utilities/Text";

import { Feedback } from "./home/Feedback";
import { Title } from "./home/Title";
import { Carousel } from "./home/Carousel";

const Home = ({ setSelectedRoute }) => {
    const [angle, setAngle] = useState(0); 
    const startX = useRef(0); 
    const isDragging = useRef(false); 

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX;
    };

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            const currentX = e.pageX;
            const deltaX = currentX - startX.current;
            setAngle((prev) => prev + deltaX * 0.1); 
            startX.current = currentX;
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const upperStyle = {
        width: '100%',
        height: '55%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <main className="content">
            <div style={upperStyle}>
                <Title/>
                <section 
                    className="scroll-section"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <Carousel angle={angle} isDragging={isDragging} setSelectedRoute={setSelectedRoute}/>
                </section>
            </div>
            <Feedback/>
        </main>
    );
}

export default Home;