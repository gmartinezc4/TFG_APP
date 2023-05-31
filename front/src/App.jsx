import './App.css'
import ContenedorMaderas from './componentsMaderas/ContenedorMaderas'
import styled from "styled-components";

function App() {
  return (
    <Fondo>
      <div className=" h-screen">
        <ContenedorMaderas />
      </div>
    </Fondo>
  );
}

export default App

const Fondo = styled.div`
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1630%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1631)'%3e%3c/rect%3e%3cpath d='M1440 0L814.2 0L1440 77.57z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M814.2 0L1440 77.57L1440 200.70999999999998L580.3000000000001 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M580.3000000000001 0L1440 200.70999999999998L1440 242.61999999999998L508.6600000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M508.6600000000001 0L1440 242.61999999999998L1440 402.45L180.0700000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L212.69 560L0 333.15999999999997z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 333.15999999999997L212.69 560L344.75 560L0 176.64999999999998z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 176.64999999999998L344.75 560L432.79 560L0 171.92z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 171.91999999999996L432.79 560L979.01 560L0 166.05999999999995z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1630'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1631'%3e%3cstop stop-color='rgba(134%2c 239%2c 172%2c 1)' offset='0.02'%3e%3c/stop%3e%3cstop stop-color='rgba(25%2c 114%2c 93%2c 1)' offset='0.99'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");  
  background-size: cover;
`
