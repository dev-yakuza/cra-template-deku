// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { createSerializer, matchers } from '@emotion/jest'
expect.extend(matchers)
expect.addSnapshotSerializer(createSerializer())

module.exports = {
  snapshotSerializers: ['@emotion/jest/serializer'],
}
