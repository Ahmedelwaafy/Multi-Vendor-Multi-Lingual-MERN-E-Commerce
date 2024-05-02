import * as React from "react";

import { LangNavLink } from "@/components/MainComponents";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { categories, brands } from "@/constants";

export default function MenuItems({
  t,
  lng,
  className,
}: {
  t: TFunction;
  lng: string;
  className?: string;
}) {
  return (
    <NavigationMenu className={cn("", className)}>
      <NavigationMenuList className="gap-2 rtl:rtl">
        <NavigationMenuItem>
          <LangNavLink
            className={`desktop__nav--item `}
            homepage
            end
            to={`/${lng}`}
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("Navbar.items.home")}
            </NavigationMenuLink>
          </LangNavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {t("Navbar.items.categories")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[600px] lg:w-[400px] grid grid-cols-3 lg:grid-cols-2 gap-3 p-6 ">
              {categories?.map((category) => (
                <ListItem
                  key={category?.id}
                  href="/docs"
                  //title={category?.name}
                >
                  <FontAwesomeIcon className="" icon={faDollarSign} />
                  {category?.name}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {t("Navbar.items.brands")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[600px] lg:w-[400px] grid grid-cols-3 lg:grid-cols-2 gap-3 p-6 ">
              {brands?.map((brand) => (
                <ListItem
                  //className="h-28 rounded-xl"
                  key={brand?.id}
                  href="/docs"
                  //title={brand?.name}
                >
                  <FontAwesomeIcon className="" icon={faDollarSign} />
                  {brand?.name}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LangNavLink className={`desktop__nav--item `} to={`/best-enlling`}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t("Navbar.items.best_selling")}
            </NavigationMenuLink>
          </LangNavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none text-secondary transition-colors hover:bg-secondary hover:text-background focus:bg-secondary focus:text-background h-20 flex-col-center shadow-sm border border-secondary ",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground w-full flex justify-center gap-3">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
