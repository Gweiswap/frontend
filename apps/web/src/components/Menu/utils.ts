import orderBy from 'lodash/orderBy'
import { ConfigMenuItemsType } from './config/config'

export const getActiveMenuItem = ({ pathname, menuConfig }: { pathname: string; menuConfig: ConfigMenuItemsType[] }) =>
  menuConfig.find(
    (menuItem) =>
      getActiveByMultiMenuItem({ pathname, href: menuItem.href, activeHref: menuItem.activeHref }) ||
      getActiveSubMenuItem({ menuItem, pathname }),
  )

export const getActiveSubMenuItem = ({ pathname, menuItem }: { pathname: string; menuItem?: ConfigMenuItemsType }) => {
  const activeSubMenuItems =
    menuItem?.items.filter((subMenuItem) => subMenuItem.href !== '/dex-v2' && pathname.startsWith(subMenuItem.href)) ??
    []

  // Pathname doesn't include any submenu item href - return undefined
  if (!activeSubMenuItems || activeSubMenuItems.length === 0) {
    return undefined
  }

  // Pathname includes one sub menu item href - return it
  if (activeSubMenuItems.length === 1) {
    return activeSubMenuItems[0]
  }

  // Pathname includes multiple sub menu item hrefs - find the most specific match
  const mostSpecificMatch = orderBy(activeSubMenuItems, (subMenuItem) => subMenuItem.href.length, 'desc')[0]

  return mostSpecificMatch
}

const getActiveByMultiMenuItem = ({
  pathname,
  href,
  activeHref,
}: {
  pathname: string
  href: string
  activeHref?: string[]
}) => {
  return activeHref ? activeHref.some((link) => pathname.startsWith(link)) : pathname.startsWith(href)
}
