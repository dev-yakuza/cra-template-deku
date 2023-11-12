const mockPageContainer = jest.fn()
const mockPageLoading = jest.fn()
const mockIconSelectBox = jest.fn()

jest.mock('components/atoms', () => {
  const {
    PageLoading: PageLoadingComponent,
    PageContainer: PageContainerComponent,
    IconSelectBox: IconSelectBoxComponent,
    ...rest
  } = jest.requireActual('components/atoms')

  const PageContainer = (props: typeof PageContainerComponent) => {
    mockPageContainer(props)
    return <PageContainerComponent {...props} />
  }

  const PageLoading = (props: typeof PageLoadingComponent) => {
    mockPageLoading(props)
    return <PageLoadingComponent {...props} />
  }

  const IconSelectBox = (props: typeof IconSelectBoxComponent) => {
    mockIconSelectBox(props)
    return <IconSelectBoxComponent {...props} />
  }

  return {
    PageContainer,
    PageLoading,
    IconSelectBox,
    ...rest,
  }
})

export { mockPageContainer, mockPageLoading, mockIconSelectBox }
