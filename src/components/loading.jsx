import React from 'react';
import logo from "../assets/image/logowhite.png"
function Loading() {
    return (
        <div id="loader">
            {/*<div className="cube-folding">*/}
            {/*    <span className="leaf1"></span>*/}
            {/*    <span className="leaf2"></span>*/}
            {/*    <span className="leaf3"></span>*/}
            {/*    <span class="leaf4"></span>*/}
            {/*</div>*/}
            <img src={logo} className="p-4" alt=""/>
            {/*<p className="text-loading">  همدان من</p>*/}
        </div>
    );
}

export default Loading;