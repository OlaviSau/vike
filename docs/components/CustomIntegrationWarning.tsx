export { CustomIntegrationWarning }

import { Link, Warning } from '@brillout/docpress'
import React from 'react'
import { UiFrameworkExtension, type UiFrameworkExtensionList } from './UiFrameworkExtension'

function CustomIntegrationWarning({ list }: { list?: UiFrameworkExtensionList }) {
  return (
    <Warning>
      Do this only if you have a clear reason against using <UiFrameworkExtension name noLink list={list} />, see{' '}
      <Link href="/extension-vs-custom" />.
    </Warning>
  )
}
