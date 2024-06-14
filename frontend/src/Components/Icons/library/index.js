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
  editIcon: iconsLibrary.unclassifiable.find((icon) => icon.name === 'edit').icon
}
