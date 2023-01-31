import React, { useContext, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useMutation,
  useQuery,
} from "@apollo/client";
import { Context } from "../context/Context";

const LOG_OUT = gql`
  mutation Mutation {
    logOut
  }
`;

function BotonesUser() {
  const token = localStorage.getItem("token");
  const { changeReload } = useContext(Context);
  const [OpenSubMenu, setOpenSubMenu] = useState(false);

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: () => {
      localStorage.removeItem("token");
      changeReload();
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
      changeReload();
    },
  });

  return (
    <div>
      {token && (
        <div className="flex justify-end -mt-10 text-white font-bold mr-8">
          <button className="bg-[url('/home/guillermo/App_TFG/front/src/assets/carrito.png')] bg-no-repeat bg-cover h-12 w-16 p-2 mr-3"></button>

          <div className="relative inline-block text-left">
            <div>
                <button type="button" className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fotoPerfil.png')] bg-no-repeat bg-cover h-12 w-16" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={(() => setOpenSubMenu(!OpenSubMenu))}>
                
                
                {/* <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg> */}
                </button>
            </div>

            {OpenSubMenu && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">            
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600" role="menuitem" tabIndex="-1" id="menu-item-0">Perfil</a>
                    </div>
                    <div className="py-1" role="none">
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600" role="menuitem" tabIndex="-1" id="menu-item-1">Pedidos</a>
                    </div>
                    <div className="py-1" role="none">
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600" role="menuitem" tabIndex="-1" id="menu-item-2 on" onClick={() => {logOut()}}>Cerrar Sesión</a>
                    </div>
                </div>
            )}
            
          </div>
          
        </div>
      )}
    </div>
  );
}

export default BotonesUser;
