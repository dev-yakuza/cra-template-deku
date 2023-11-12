const mockHeader = jest.fn()

jest.mock('components/organisms', () => {
  const { Header: HeaderComponent, ...rest } = jest.requireActual(
    'components/organisms',
  )

  const Header = (props: typeof HeaderComponent) => {
    mockHeader(props)
    return <HeaderComponent {...props} />
  }

  return {
    Header,
    ...rest,
  }
})

export { mockHeader }
