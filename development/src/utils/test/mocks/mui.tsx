const mockAppBar = jest.fn()
const mockToolbar = jest.fn()
const mockTypography = jest.fn()
const mockGrid = jest.fn()
const mockSnackbar = jest.fn()
const mockTextField = jest.fn()
const mockIconButton = jest.fn()
const mockMenu = jest.fn()
const mockMenuItem = jest.fn()

jest.mock('@mui/material', () => {
  const {
    AppBar: MUIAppBar,
    Toolbar: MUIToolbar,
    Typography: MUITypography,
    Grid: MUIGrid,
    Snackbar: MUISnackbar,
    TextField: MUITextField,
    IconButton: MUIIconButton,
    Menu: MUIMenu,
    MenuItem: MUIMenuItem,
    ...rest
  } = jest.requireActual('@mui/material')

  const AppBar = (props: typeof MUIAppBar) => {
    mockAppBar(props)
    return <MUIAppBar {...props} />
  }

  const Toolbar = (props: typeof MUIToolbar) => {
    mockToolbar(props)
    return <MUIToolbar {...props} />
  }

  const Typography = (props: typeof MUITypography) => {
    mockTypography(props)
    return <MUITypography {...props} />
  }

  const Grid = (props: typeof MUIGrid) => {
    mockGrid(props)
    return <MUIGrid {...props} />
  }

  const Snackbar = (props: typeof MUISnackbar) => {
    mockSnackbar(props)
    return <MUISnackbar {...props} />
  }

  const TextField = (props: typeof MUITextField) => {
    mockTextField(props)
    return <MUITextField {...props} />
  }

  const IconButton = (props: typeof MUIIconButton) => {
    mockIconButton(props)
    return <MUIIconButton {...props} />
  }

  const Menu = (props: typeof MUIMenu) => {
    mockMenu(props)
    return <MUIMenu {...props} />
  }

  const MenuItem = (props: typeof MUIMenuItem) => {
    mockMenuItem(props)
    return <MUIMenuItem {...props} />
  }

  return {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Snackbar,
    TextField,
    IconButton,
    Menu,
    MenuItem,
    ...rest,
  }
})

export {
  mockAppBar,
  mockToolbar,
  mockTypography,
  mockGrid,
  mockSnackbar,
  mockTextField,
  mockIconButton,
  mockMenu,
}
