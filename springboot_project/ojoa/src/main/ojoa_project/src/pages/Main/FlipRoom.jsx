import '../../pages/Main/Main.css';
import React from 'react';
import { NavLink } from "react-router-dom";

const FlipRoom = () => {

    return (

        // hover_total -> FlipRoom
        <div className="FlipRoom">

            <div className="hover_wrap">
                <div className="hover_leftright">
                    <figure className="front">
                        <img className="colimg" src={"./images/livingroom.jpg"} alt="마우스 올리면 to Right" />
                        <figcaption>
                            <h3>LIVING ROOM</h3>
                            <p>Design your Life</p>
                        </figcaption>
                    </figure>
                    <figure className="back">
                        <NavLink to="/productList/Sofa/">
                        <img className="colimg" src={"./images/l_bg.png"} alt="마우스 내리면 to Left" />
                        <figcaption>
                            <h3>지금 보러가기 &rarr;</h3>
                        </figcaption>
                        </NavLink>
                    </figure>
                </div>
            </div>

            <div className="hover_wrap">
                <div className="hover_leftright">
                    <figure className="front">
                        <img className="colimg" src={"./images/bedroom.jpg"} alt="마우스 올리면 to Right" />
                        <figcaption>
                            <h3>BED ROOM</h3>
                            <p>Design your Relax</p>

                        </figcaption>
                    </figure>
                    <figure className="back">
                        <NavLink to="/productList/Bed/">
                        <img className="colimg" src={"./images/b_bg.png"} alt="마우스 내리면 to Left" />
                        <figcaption>
                        <h3>지금 보러가기 &rarr;</h3>
                        </figcaption>
                        </NavLink>
                    </figure>
                </div>
            </div>

            <div className="hover_wrap">
                <div className="hover_leftright">
                    <figure className="front">
                        <img className="colimg" src={"./images/kitchen.jpg"} alt="마우스 올리면 to Right" />
                        <figcaption>
                            <h3>KITCHEN</h3>
                            <p>Design your Health</p>

                        </figcaption>
                    </figure>
                    <figure className="back">
                        <NavLink to="/productList/Chair/">
                        <img className="colimg" src={"./images/k_bg.png"} alt="마우스 내리면 to Left" />
                        <figcaption>
                            <h3>지금 보러가기 &rarr;</h3>
                        </figcaption>
                        </NavLink>
                    </figure>
                </div>
            </div>

        </div>
    );
};

export default FlipRoom;