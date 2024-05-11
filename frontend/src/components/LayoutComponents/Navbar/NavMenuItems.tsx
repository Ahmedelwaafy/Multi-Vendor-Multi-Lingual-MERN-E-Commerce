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
import { ICategoryType, Image } from "@/types/CardsTypes";

export default function MenuItems({
  t,
  lng,
  className,
  categories,
  brands,
}: {
  t: TFunction;
  lng: string;
  categories: ICategoryType[];
  brands: { _id: string; name: string; avatar: Image }[];
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
            <ul className="w-[600px] lg:w-[400px] grid grid-cols-3 lg:grid-cols-2 gap-3 p-6  ">
              {categories?.map((category) => (
                <ListItem
                  key={category?._id}
                  href={`/${lng}/categories/${
                    category?._id
                  }/${category?.name?.replace(/\s+/g, "-")}`}
                >
                  <img
                    className="size-10 shrink-0 rounded-md object-cover"
                    loading="lazy"
                    src={category?.img?.url}
                    alt={category?.name}
                  />
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
                  key={brand?._id}
                  href={`/${lng}/brands/${brand?._id}/${brand?.name?.replace(
                    /\s+/g,
                    "-"
                  )}`}
                >
                  <img
                    className="size-10 shrink-0 rounded-md object-cover"
                    loading="lazy"
                    src={brand?.avatar?.url}
                    alt={brand?.name}
                  />
                  {brand?.name}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LangNavLink className={`desktop__nav--item `} to={`/best-selling`}>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none text-secondary transition-colors hover:bg-secondary hover:!text-background focus:bg-secondary focus:text-background h-20 flex-col-center shadow-sm border border-secondary ",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug  w-full flex justify-start items-center gap-3">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
