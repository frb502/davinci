import * as React from 'react'
const Row = require('antd/lib/row')
const Col = require('antd/lib/col')
const Checkbox = require('antd/lib/checkbox')
const Select = require('antd/lib/select')
const Option = Select.Option
import ColorPicker from '../../../../../components/ColorPicker'
import { PIVOT_CHART_FONT_FAMILIES, PIVOT_CHART_LINE_STYLES, PIVOT_CHART_FONT_SIZES, CHART_LABEL_POSITIONS } from '../../../../../globalConstants'
const styles = require('../Workbench.less')

export interface ILabelConfig {
  showLabel: boolean
  labelPosition: string
  labelFontFamily: string
  labelFontSize: string
  labelColor: string
}

interface ILabelSectionProps {
  title: string
  config: ILabelConfig
  onChange: (prop: string, value: any) => void
}

export class LabelSection extends React.PureComponent<ILabelSectionProps, {}> {
  private checkboxChange = (prop) => (e) => {
    this.props.onChange(prop, e.target.checked)
  }

  private selectChange = (prop) => (value) => {
    this.props.onChange(prop, value)
  }

  private colorChange = (prop) => (color) => {
    this.props.onChange(prop, color)
  }

  public render () {
    const { title, config } = this.props

    const {
      showLabel,
      labelPosition,
      labelFontFamily,
      labelFontSize,
      labelColor
    } = config

    const positions = CHART_LABEL_POSITIONS.map((p) => (
      <Option key={p.value} value={p.value}>{p.name}</Option>
    ))
    const fontFamilies = PIVOT_CHART_FONT_FAMILIES.map((f) => (
      <Option key={f.value} value={f.value}>{f.name}</Option>
    ))
    const fontSizes = PIVOT_CHART_FONT_SIZES.map((f) => (
      <Option key={f} value={`${f}`}>{f}</Option>
    ))

    return (
      <div className={styles.paneBlock}>
        <h4>{title}</h4>
        <div className={styles.blockBody}>
          <Row gutter={8} type="flex" align="middle" className={styles.blockRow}>
            <Col span={10}>
              <Checkbox
                checked={showLabel}
                onChange={this.checkboxChange('showLabel')}
              >
                显示标签
              </Checkbox>
            </Col>
            <Col span={4}>位置</Col>
            <Col span={10}>
              <Select
                placeholder="位置"
                className={styles.blockElm}
                value={labelPosition}
                onChange={this.selectChange('labelPosition')}
              >
                {positions}
              </Select>
            </Col>
          </Row>
          <Row gutter={8} type="flex" align="middle" className={styles.blockRow}>
            <Col span={10}>
              <Select
                placeholder="字体"
                className={styles.blockElm}
                value={labelFontFamily}
                onChange={this.selectChange('labelFontFamily')}
              >
                {fontFamilies}
              </Select>
            </Col>
            <Col span={10}>
              <Select
                placeholder="文字大小"
                className={styles.blockElm}
                value={labelFontSize}
                onChange={this.selectChange('labelFontSize')}
              >
                {fontSizes}
              </Select>
            </Col>
            <Col span={4}>
              <ColorPicker
                value={labelColor}
                onChange={this.colorChange('labelColor')}
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default LabelSection
