import Formulario from './views/Formulario';
import MenuInferior from './views/MenuInferior';
import MenuSuperior from './views/MenuSuperior';
import './App.css';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

const resources = {
  en: {
     translation: enTranslation,
  },
  es: {
     translation: esTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es", 
    fallbackLng: "es",

    interpolation: {
      escapeValue: false 
    }
  });

function App() {
  return (
    <div className="App">
      <MenuSuperior/>
      <Formulario/>
      <MenuInferior/>
    </div>
  );
}

export default App;
