import React from "react";
import { render } from "@testing-library/react";
import ContenedorMaderas from "../src/componentsMaderas/ContenedorMaderas";
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

test('renders content', () => {
    const component = render(<ContenedorMaderas />)

    console.log(component)
})