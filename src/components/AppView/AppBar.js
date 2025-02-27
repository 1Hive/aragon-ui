import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Transition, animated } from '@react-spring/web'
import { Inside } from 'use-inside'
import { useTheme } from '../../theme'
import { PublicUrl } from '../../providers/PublicUrl'
import { springs } from '../../style'
import { noop, unselectable } from '../../utils'
import Text from '../Text/Text'

import chevronSvg from './assets/chevron.svg'

// The app bar height includes its border.
const BAR_HEIGHT = 64

class AppBar extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    endContent: PropTypes.node,
    onTitleClick: PropTypes.func,
    padding: PropTypes.number,
    tabs: PropTypes.element,
    theme: PropTypes.object,
    title: PropTypes.node,
  }
  static defaultProps = {
    onTitleClick: noop,
    padding: 30,
    title: '',
  }

  state = {
    tabsHeight: 0,
  }
  _tabsRef = React.createRef()

  componentDidMount() {
    this.updateTabsHeight()
  }
  componentDidUpdate(prevProps) {
    if (Boolean(prevProps.tabs) !== Boolean(this.props.tabs)) {
      this.updateTabsHeight()
    }
  }
  updateTabsHeight() {
    const el = this._tabsRef.current
    if (el) {
      this.setState({ tabsHeight: el.clientHeight })
    }
  }
  render() {
    const { tabsHeight } = this.state
    const {
      children,
      endContent,
      onTitleClick,
      padding,
      tabs,
      title,
      theme,
      ...props
    } = this.props
    return (
      <Inside name="AppBar">
        <div
          css={`
            overflow: hidden;
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: ${BAR_HEIGHT}px;
            background: ${theme.surface};
            ${unselectable()};

            /* We are using an “inner border” to allow components like Tabs
               to draw over the border while having overflow:hidden set. */
            padding-bottom: 1px;
            &:after {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              border-bottom: 1px solid ${theme.border};
            }
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              height: ${BAR_HEIGHT - 1}px;
            `}
            {...props}
          >
            {title && (
              <div
                css={`
                  display: flex;
                  align-items: center;
                  height: 100%;
                  padding-left: ${padding}px;
                `}
              >
                <AppBarTitle
                  chevron={Boolean(children)}
                  clickable={Boolean(onTitleClick)}
                  onClick={onTitleClick}
                >
                  {typeof title === 'string' ? (
                    <Text size="xxlarge" deprecationNotice={false}>
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                </AppBarTitle>
              </div>
            )}
            {children}
            {endContent && (
              <div
                css={`
                  display: flex;
                  align-items: center;
                  height: 100%;
                  margin-left: auto;
                  padding-right: ${padding}px;
                `}
              >
                {endContent}
              </div>
            )}
          </div>
          <Transition
            items={tabs}
            from={{ opacity: 0, height: 0 }}
            enter={{ opacity: 1, height: tabsHeight || 'auto' }}
            leave={{ opacity: 0, height: 0 }}
            initial={null}
            config={springs.smooth}
            native
          >
            {(styles, tabs) =>
              tabs && (
                <TabsWrapper style={styles}>
                  <div ref={this._tabsRef}>{tabs}</div>
                </TabsWrapper>
              )
            }
          </Transition>
        </div>
      </Inside>
    )
  }
}

const AppBarTitle = PublicUrl.hocWrap(styled.h1`
  padding-right: 20px;
  margin-right: calc(20px - 7px);
  white-space: nowrap;
  background-image: ${({ chevron }) =>
    chevron ? css`url(${PublicUrl.styledUrl(chevronSvg)})` : 'none'};
  background-position: 100% 50%;
  background-repeat: no-repeat;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`)

const TabsWrapper = styled(animated.div)`
  position: relative;
  z-index: 1;
`

export default function(props) {
  const theme = useTheme()
  return <AppBar {...props} theme={theme} />
}
