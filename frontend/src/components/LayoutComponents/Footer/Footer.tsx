import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LangLink from "@/components/MainComponents/LangLink.tsx";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { Container, Logo } from "@/components/MainComponents";
import SubscribeToNewsLetter from "./SubscribeToNewsLetter";
import { categories } from "@/constants";

function Footer() {
  const { t } = useTranslation("Layout");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      from: "Web",
    },
  });
  const {
    mutate,
    isPending,
    error: ServerErrors,
  } = usePostData(true, () => {
    reset();
  });
  const { data } = useFetchData(
    "Footer",
    import.meta.env.VITE_FOOTER,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000
  );

  const onSubmit = (data) => {
    mutate({ api: import.meta.env.VITE_SUBSCRIBE, data: data });
  };

  return (
    <footer
      /* style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.9))`,
      }} */
      className="relative custom__pattern w-full h-auto text- pt-40 ss:pt-44 pb-10 mt-44  rounded-t- hover: rounded-t-3xl transition-all duration-1000 ease-linear  bg-primary-foreground"
    >
      <Container>
        <div className="absolute__banner  w-3/4 absolute   lg:min-h-[208px] top-0 -translate-y-1/2 left-1/2 -translate-x-1/2   rounded-full lg:rounded-xl overflow-hidden bg">
          <div className="banner__wrapper relative w-full h-52 lg:h-64 lg:bg-primary flex-col-center lg:px-10 ">
            <div className="absolute__banner--top bg-primary-foreground lg:bg-transparent custom__pattern h-1/2 lg:h-1/3 w-full px-10 lg:px-0 flex items-end text-background lg:items-center ">
              <h3 className="text-4xl ss:text-2xl font-bold lg:text-center line-clamp-2 w-3/6 lg:w-full ">
                Lorem ipsum dolor sit
                {data?.top_banner?.big_text}
              </h3>
            </div>
            <div className="absolute__banner--bottom bg-background text-primary-foreground h-1/2 lg:h-1/3 w-full px-10 lg:px-0 flex items-start lg:bg-transparent lg:text-background lg:items-center">
              <h4 className="lg:text-center line-clamp-2 w-3/6 lg:w-full ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
                minima non recusa ndae.sit amet consectetur adipisicing elit.
                Qui minima non recusandae.
                {data?.top_banner?.small_text}
              </h4>
            </div>
            <SubscribeToNewsLetter className="absolute right-10 rtl:right-auto rtl:left-10 top-1/2 -translate-y-1/2 mt-3 lg:static lg:-translate-y-0" />
          </div>
        </div>
        <section className="footer-content-grid grid grid-cols-auto_fit gap-[30px] h-full   text-background ">
          <div className="footer-col1-logo  h-full flex flex-col gap-4 ss:items-center  ">
            <Logo />

            <p className="text-base text- justify font-sub-heading w-fit opacity80 ss:text-center line-clamp-3 ">
              {data?.about?.about}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repudiandae iusto asperiores laudantium nisi natus consequuntur
              quas temporibus magnam rem? Nemo?
            </p>
            <div className="socials w-fit flex  items-center gap-4 ">
              <Link rel="noreferrer" target="_blank" to={data?.facebook}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
                  icon={faFacebook}
                />
              </Link>
              <Link rel="noreferrer" target="_blank" to={data?.twitter}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
                  icon={faXTwitter}
                />
              </Link>
              <Link rel="noreferrer" target="_blank" to={data?.instagram}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
                  icon={faInstagram}
                />
              </Link>
              <Link rel="noreferrer" target="_blank" to={data?.youtube}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
                  icon={faYoutube}
                />
              </Link>
              <Link rel="noreferrer" target="_blank" to={data?.linkedIn}>
                <FontAwesomeIcon
                  className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
                  icon={faLinkedinIn}
                />
              </Link>
            </div>
          </div>
          <div className="footer-col2 w-full h-full flex flex-col justify-start ss:items-center   ">
            <h2 className="text-xl w-fit mb-9 flex flex-col gap-2 group">
              {t("Footer.second_column.title")}
            </h2>

            <ul className="  h-full w-full flex flex-col items-start  justify-start gap-7 ss:items-center ">
              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className=" truncate "
                  to={t("Footer.second_column.menu_items.Home.link")}
                >
                  {t("Footer.second_column.menu_items.Home.title")}
                </LangLink>
              </li>

              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className=" truncate "
                  to={t("Footer.second_column.menu_items.FAQs.link")}
                >
                  {t("Footer.second_column.menu_items.FAQs.title")}
                </LangLink>
              </li>
              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className="  truncate  "
                  to={t("Footer.second_column.menu_items.Contact.link")}
                >
                  {t("Footer.second_column.menu_items.Contact.title")}
                </LangLink>
              </li>

              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className="  truncate  "
                  to={t("Footer.second_column.menu_items.About.link")}
                >
                  {t("Footer.second_column.menu_items.About.title")}
                </LangLink>
              </li>
              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className="  truncate  "
                  to={t(
                    "Footer.second_column.menu_items.Terms_Conditions.link"
                  )}
                >
                  {t("Footer.second_column.menu_items.Terms_Conditions.title")}
                </LangLink>
              </li>
            </ul>
          </div>
          <div className="footer-col3 w-full h-full flex flex-col justify-start ss:items-center   ">
            <h2 className="text-xl w-fit mb-9 flex flex-col gap-2 group">
              {t("Footer.third_column.title")}
            </h2>

            <ul className="  h-full w-full flex flex-col items-start  justify-start gap-7 ss:items-center ">
              {categories?.map((category) => (
                <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    to={`/categories/${category?.name}`}
                    className="truncate"
                  >
                    {category?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col4 w-full h-full flex flex-col justify-start ss:items-center  ">
            <h2 className="text-xl w-fit mb-9 flex flex-col gap-2 group">
              {t("Footer.fourth_column.title")}
            </h2>{" "}
            <ul className="  h-full w-full flex flex-col items-start  justify-start gap-7 ss:items-center ">
              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className=" truncate "
                  to={t("Footer.second_column.menu_items.Home.link")}
                >
                  {t("Footer.second_column.menu_items.Home.title")}
                </LangLink>
              </li>

              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className=" truncate "
                  to={t("Footer.second_column.menu_items.FAQs.link")}
                >
                  {t("Footer.second_column.menu_items.FAQs.title")}
                </LangLink>
              </li>
              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className="  truncate  "
                  to={t("Footer.second_column.menu_items.Contact.link")}
                >
                  {t("Footer.second_column.menu_items.Contact.title")}
                </LangLink>
              </li>

              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className="  truncate  "
                  to={t("Footer.second_column.menu_items.About.link")}
                >
                  {t("Footer.second_column.menu_items.About.title")}
                </LangLink>
              </li>
              <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
                <LangLink
                  className="  truncate  "
                  to={t(
                    "Footer.second_column.menu_items.Terms_Conditions.link"
                  )}
                >
                  {t("Footer.second_column.menu_items.Terms_Conditions.title")}
                </LangLink>
              </li>
            </ul>
          </div>
        </section>
      </Container>
      <hr className="border-[1px] border-background my-10" />

      <Container className="">
        <div className="footer_bottom flex  md:flex-col md:items-center gap-7 justify-between items-center px-3 ">
          <h5 className="text-background text-sm md:text-center">
            © Copyright 2024 Sacramento | Powered by {""}
            <Link
              rel="noreferrer"
              target="_blank"
              to={"https://www.linkedin.com/in/ahmedelwaafy/"}
              className="trns hover:text-accnt"
            >
              ElWafy
            </Link>
            .
          </h5>
          <div className="payment__options flex gap-7 ss:gap-5">
            <img
              className="w-16 ss:w-14 shrink-0"
              src="/assets/images/Mastercard.png"
              alt="Mastercard"
            />
            <img
              className="w-16 ss:w-14 shrink-0"
              src="/assets/images/visa.jpg"
              alt="Mastercard"
            />
            <img
              className="w-16 ss:w-14 shrink-0"
              src="/assets/images/Paypal.png"
              alt="Mastercard"
            />
            <img
              className="w-16 ss:w-14 shrink-0"
              src="../../../../public/assets/images/Stripe.png"
              alt="Mastercard"
            />{" "}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
