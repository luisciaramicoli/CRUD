import React, { useState } from "react";
import NavBar from "../components/nav/home";
import Mapa from "../components/mapa/mapa";

function MapaTela() {
    return (
        <div>
            <NavBar />
           
            <Mapa/>
        </div>
    );
}

export default MapaTela;
