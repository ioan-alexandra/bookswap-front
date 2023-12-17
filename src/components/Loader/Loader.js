import "./Loader.css";
import React from "react";

export default function Loader({ state }) {
    return (
        <div className="loader-bg" style={{ display: state ? "" : "none" }}>
            <span className="loader"></span>
        </div>
    );
}
