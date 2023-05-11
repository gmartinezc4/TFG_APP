import React from "react";
import { render } from "@testing-library/react";
import Inicio from "../src/componentsMaderas/Inicio";
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'

test('renders content', () => {
  const dataInicio = {
    title: 'Naturaleza',
    description: 'Nuestra leña ecológica procede del Quercus Ilex Rotundifolia, más conocidas como Encinas, y también conocidas como Carrascas o Chaparras, criadas en los campos de tierras pedregosas calizas, a 1.000 metros de altura, con un crecimiento muy lento y totalmente silvestre.'
  }

  const dataInicio2 = {
    title: 'Nuestra Historia',
    description: 'Se caracteriza por ser una leña muy dura y de quemado lento, que da lugar a formar ascuas duraderas, lo que añadido a su aroma, resulta especial para lumbre.'  }

  const component = render(<Inicio />)

  component.getByText(dataInicio.title)
  component.getByText(dataInicio.description)

  component.getByText(dataInicio2.title)
  component.getByText(dataInicio2.description)

  // const div = component.container.querySelector('div')
  // console.log(prettyDOM(div))

})