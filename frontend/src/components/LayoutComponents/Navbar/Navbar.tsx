import {
  Cart,
  Container,
  LangLink,
  Logo,
  Wishlist,
} from "@/components/MainComponents";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import MobileMenuItems from "./MobileMenuItems";
import NavDropdownMenu from "./NavDropdownMenu";
import MenuItems from "./NavMenuItems";
import NavSearch from "./NavSearch";

function Navbar() {
  
  const { t, i18n } = useTranslation("Layout");
  const lng = i18n.language;
  function changeLanguage(lang: string) {
    if (lng !== lang) {
      i18n.changeLanguage(lang);
      const temp = window.location.href.split("/");
      temp[3] = lang;
      console.log(temp);
      window.location.replace(temp.join("/"));
    }
  }
  return (
    <>
      <header>
        <section className="Navbar__top w-full h-20 ss:h-24 bg-primary text-background z-50 ">
          <Container className=" w-full h-full items-center flex justify-between ss:flex-col ss:justify-center ss:gap-3">
            <div className="flex items-center gap-5">
              <Logo />{" "}
              <div className="Navbar__top--actions--LanguageChanger flex gap-1 lg:hidden">
                <button
                  className={`trns hover:opacity-100  ${
                    lng === "en" ? "font-bold " : "opacity-70"
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
                /
                <button
                  className={`trns hover:opacity-100  ${
                    lng === "ar" ? "font-bold " : "opacity-70"
                  }`}
                  onClick={() => changeLanguage("ar")}
                >
                  AR
                </button>
              </div>
            </div>
            <NavSearch
              placeholder={t("Navbar.NavSearch.placeholder")}
              lng={lng}
            />
            <div className="Navbar__top--actions flex items-center gap-3 ss:hidden">
              <ModeToggle className="lg:hidden" />
              <LangLink
                to="/seller/register"
                className="Navbar__top--logo flex gap-1 hover:gap-3 trns items-center justify-center bg-accent px-3 py-2 rounded-full min-w-[165px] border-accent border-2 hover:bg-transparent  "
              >
                {t("Navbar.actions.become_seller")}
                <div className="flex rtl:mt-1">
                  <FontAwesomeIcon
                    className="w-full max-w-full max-h-full animate-pulse rtl:rotate-180 delay-700"
                    icon={faChevronRight}
                  />
                  <FontAwesomeIcon
                    className="w-full max-w-full max-h-full animate-pulse rtl:rotate-180"
                    icon={faChevronRight}
                  />
                </div>
              </LangLink>
            </div>
          </Container>
        </section>
      </header>
      <section className="Navbar__mid h-9 bg- sticky top-0 custom__pattern z-50">
        <Container className="w-full h-full flex items-center justify-center gap-3 ">
          <span className="text-transparent  bg-clip-text bg-gradient-to-r from-black via-[#ed1b24] to-[#0e8714] tracking-widest">
            {t("Navbar.banner_text")}
          </span>
          <img
            className="w-6"
            src="/assets/images/Palestine.png"
            alt="Palestine"
          />
        </Container>
      </section>
      <nav className="Navbar__bottom h-16 bg-secondary sticky top-9 z-50 shadow-xl border-b border-b-background">
        <Container className="w-full h-full flex items-center justify-between gap-3 ">
          <div className="Navbar__bottom--actions flex gap-5 items-center text-background">
            <Wishlist t={t} lng={lng} />
            <Cart t={t} lng={lng} />
          </div>
          <MenuItems t={t} lng={lng} className="md:hidden" />
          <MobileMenuItems
            t={t}
            lng={lng}
            className="hidden md:block text-background "
          />

          <NavDropdownMenu t={t} lng={lng} />
        </Container>
      </nav>
    </>
  );
}

export default Navbar;
