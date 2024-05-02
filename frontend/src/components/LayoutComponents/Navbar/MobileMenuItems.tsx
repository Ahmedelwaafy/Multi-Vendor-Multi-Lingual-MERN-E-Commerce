import { TFunction } from "i18next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LangLink, LangNavLink, Logo } from "@/components/MainComponents";
import { useState } from "react";
import { categories, brands } from "@/constants";

function MobileMenuItems({
  t,
  lng,
  className,
}: {
  t: TFunction;
  lng: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn("", className)}>
        <FontAwesomeIcon icon={faBars} />
      </SheetTrigger>
      <SheetContent
        side={lng === "ar" ? "right" : "left"}
        className="w-3/4 max-w-[500px] "
      >
        <SheetHeader>
          <SheetTitle className="flex-center  ">
            <Logo />
          </SheetTitle>
          <SheetDescription>
            <ScrollArea className="h-[540px] w-full  mt-10 bg-">
              <ul className="w-full flex-col-center gap-7  mt-32">
                <li onClick={() => setOpen(false)}>
                  <LangNavLink
                    className={`mobile__nav--item trns hover:scale-105 rounded-full px-4 py-2 h-10 border-2 border-secondary   w-48  flex-center focus:outline-none font-medium`}
                    homepage
                    end
                    to={`/${lng}`}
                  >
                    {t("Navbar.items.home")}
                  </LangNavLink>
                </li>{" "}
                <li>
                  <Accordion
                    className="w-48 hover:w-60 trns"
                    type="single"
                    collapsible
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={` trns hover:scale-105 rounded-full px-4 py-2 h-10 border-2 border-secondary    hover:bg-secondary hover:text-background flex-center focus:outline-none `}
                      >
                        {t("Navbar.items.categories")}
                      </AccordionTrigger>
                      <AccordionContent>
                        {" "}
                        <ul className="w-full flex-col-center gap-7 mt-7">
                          {categories?.map((category) => (
                            <LangLink
                              className={` trns hover:scale-90 rounded-full px-4 py-2 h-10 border-2 border-secondary w-40             hover:bg-secondary hover:text-background flex-center`}
                              key={category?.id}
                              to={`/${category?.name}`}
                            >
                              {category?.name}
                            </LangLink>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li>
                  <Accordion
                    className="w-48 hover:w-60 trns"
                    type="single"
                    collapsible
                  >
                    <AccordionItem value="item-2">
                      <AccordionTrigger
                        className={` trns hover:scale-105 rounded-full px-4 py-2 h-10 border-2 border-secondary    hover:bg-secondary hover:text-background flex-center focus:outline-none `}
                      >
                        {t("Navbar.items.brands")}
                      </AccordionTrigger>
                      <AccordionContent>
                        {" "}
                        <ul className="w-full flex-col-center gap-7 mt-7">
                          {brands?.map((category) => (
                            <LangLink
                              className={` trns hover:scale-90 rounded-full px-4 py-2 h-10 border-2 border-secondary w-40             hover:bg-secondary hover:text-background flex-center`}
                              key={category?.id}
                              to={`/${category?.name}`}
                            >
                              {category?.name}
                            </LangLink>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li onClick={() => setOpen(false)}>
                  <LangNavLink
                    className={`mobile__nav--item trns hover:scale-105 rounded-full px-4 py-2 h-10 border-2 border-secondary   w-48  flex-center focus:outline-none font-medium`}
                    to={`/best-enlling`}
                  >
                    {t("Navbar.items.best_selling")}
                  </LangNavLink>
                </li>
              </ul>
            </ScrollArea>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenuItems;
