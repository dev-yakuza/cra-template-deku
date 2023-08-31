import { useState } from 'react'

import { IconButton, Menu, MenuItem } from '@mui/material'

type MenuItemData = {
  readonly title: string
  readonly value: string
}

interface Props {
  readonly icon: React.ReactNode
  readonly items: ReadonlyArray<MenuItemData>
  readonly onSelect: (language: string) => void
}

export const IconSelectBox = ({ icon, items, onSelect }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | undefined>(
    undefined,
  )

  const onClose = () => {
    setAnchorEl(undefined)
  }

  const onSelectLanguage = (language: string) => {
    onClose()
    onSelect(language)
  }

  return (
    <>
      <IconButton
        aria-controls="IconSelectBox"
        aria-haspopup="true"
        aria-label="Open menu"
        title="Open menu"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {icon}
      </IconButton>
      <Menu
        id="IconSelectBox"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {items.map((language) => (
          <MenuItem
            onClick={() => onSelectLanguage(language.value)}
            key={language.title}
          >
            {language.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
