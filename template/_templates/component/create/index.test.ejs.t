---
to: src/components/<%= type %>/<%= name %>/index.test.tsx
---
import { render, screen } from '@testing-library/react'

import { <%= name %> } from '.'

describe('<<%= name %> />', () => {
  it('Rendered well', async () => {
  })

  it('Props 1', async () => {
  })
})
