import { links } from '../navLinks'
import { iconsSocialNetworks } from '../socialNetworks'
import { sidebarIcon } from '../sidebar'
import { unclassifiable } from '../unclassifiable'

export const iconsLibrary = {
  navbar: links,
  socialNetworks: iconsSocialNetworks,
  sidebar: sidebarIcon,
  unclassifiable: unclassifiable
}

export const iconList = {
  deleteIcon: iconsLibrary.unclassifiable.find((icon) => icon.name === 'delete').icon,
  editIcon: iconsLibrary.unclassifiable.find((icon) => icon.name === 'edit').icon,
  checkIcon: iconsLibrary.unclassifiable.find((icon) => icon.name === 'check').icon,
  chevronLeftIcon: iconsLibrary.sidebar.find((icon) => icon.name === 'chevron-left').icon,
  chevronRightIcon: iconsLibrary.sidebar.find((icon) => icon.name === 'chevron-right').icon
}
