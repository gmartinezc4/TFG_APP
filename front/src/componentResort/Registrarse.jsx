import React, { useContext } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Input,
  Label,
  FormGroup,
  Button
} from "reactstrap";

import { Context } from "../context/Context";

function Registrarse() {
  const { registrarse, changeRegistrarse } = useContext(Context);

  return (
    <div>
      hola
      <Modal isOpen={registrarse}>
        <ModalHeader>Registrarse</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label>Email</Label>
            <Input type="text" placeholder="email..."></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="text"></Input>
          </FormGroup>
          
        </ModalBody>

        <ModalFooter>
        
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Registrarse;
