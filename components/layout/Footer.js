export default function Footer() {
  return (
    <footer className="py-10 bg-blue-900">
      <div className="container">
        <div className="text-center grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-between lg:justify-self-start lg:col-span-3">
            
            <div className="flex justify-between items-center">
              <img
                src="https://ventanilla.zitacuaro.tecnm.mx/img/logos/tecnm.png"
                alt="TecNM_logo"
                className="w-32 h-auto sm:w-48 md:w-64 lg:w-32"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 py-1 lg:grid-rows-3 text-white text-sm lg:text-left lg:justify-self-start lg:col-span-5 lg:gap-x-24 lg:grid-flow-col-dense">
            <a
              className="text-xs transition-all duration-500 ease-in-out hover:underline"
              href="https://www.chihuahua2.tecnm.mx/"
            >
              Acerca de Nosotros
            </a>
            <a
              className="text-xs transition-all duration-500 ease-in-out hover:underline"
              href="https://www.linkedin.com/school/instituto-tecnologico-de-chihuahua-ii/"
            >
              Contacto
            </a>
            <a
              className="text-xs transition-all duration-500 ease-in-out hover:underline"
              href="https://www.facebook.com/TecNMcampusChihuahuaII/"
            >
              Redes Sociales
            </a>
            <a
              className="text-xs transition-all duration-500 ease-in-out hover:underline"
              href="https://policy.cookiereports.com/114f16d7-es.html"
            >
              Notificación sobre Cookies
            </a>
            <a
              className="text-xs transition-all duration-500 ease-in-out hover:underline"
              href="https://www.azprivacy.astrazeneca.com/americas/mexico/es/privacy-notices.html"
            >
              Términos de Uso
            </a>
            <a
              className="text-xs transition-all duration-500 ease-in-out hover:underline"
              href="https://www.azprivacy.astrazeneca.com/americas/mexico/es/privacy-notices.html"
            >
              Política de Privacidad
            </a>
          </div>

          <div className="flex flex-col justify-between items-center lg:items-end lg:justify-self-end lg:col-span-4">
            <br />
            <p className="text-white text-xs">© Comets. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
