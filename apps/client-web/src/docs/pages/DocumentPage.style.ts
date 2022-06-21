import { styled } from '@mashcard/design-system'

export const PageSpinWrapper = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  include: ['flexCenter']
})

export const PageContent = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

export const Page = styled('div', {
  flex: 1,
  borderRadius: '2px',
  variants: {
    width: {
      md: {},
      sm: {
        width: '100%',
        [`${PageContent}`]: {
          padding: '0 1rem'
        }
      }
    }
  }
})
