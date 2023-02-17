import { Langs } from '../type'
export { Langs } from '../type'

type BaseFormatProps<T> = {
  /**
   * 当前语言
   */
  locale: string
  /**
   * 动态参数的值
   */
  payload: number | string | unknown | T
}

type DateFormatProps<T> = BaseFormatProps<T> & {
  /**
   * 动态参数的值
   */
  payload: BaseFormatProps<T>['payload'] | Date
}

/**
 * 国际化内部保存状态
 */
export type I18NState = {
  /**
   * 命名空间
   */
  namespace: string
  /**
   * 当前语言
   */
  locale?: string
  /**
   * 语言包
   */
  langs?: Langs
  /**
   * 动态参数的起始位置，默认从0开始
   */
  beginIndex?: number
  /**
   * 格式化 数字 的回调函数
   * 翻译文本中动态参数配置了 {n0}，{n1}，{n3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('我有{n0}个苹果，{n1}个香蕉和{n2}个梨')
   */
  formatNumber?: <T>(props: BaseFormatProps<T>) => string | number
  /**
   * 格式化 货币 的回调函数
   * 翻译文本中动态参数配置了 {c0}，{c1}，{c3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('张三买房花了{d0}')
   */
  formatCurrency?: <T>(props: BaseFormatProps<T>) => string | number
  /**
   * 格式化 日期 的回调函数
   * 翻译文本中动态参数配置了 {d0}，{d1}，{d3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('今天的日期是{d0}')
   */
  formatDate?: <T>(props: DateFormatProps<T>) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {t0}，{t1}，{t3} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('当前时间是{t0}')
   */
  formatTime?: <T>(props: DateFormatProps<T>) => string
  /**
   * 格式化 时间 的回调函数
   * 翻译文本中动态参数配置了 {p0xxx}，{p1xxx}，{p3xxx} 等形式
   * 要求必须要配置该回调
   *
   * 例如：
   * i18n('我有{p0个苹果}，{p1个香蕉}和{p2个梨}')
   */
  formatPlural?: <T>(
    props: BaseFormatProps<T> & {
      /**
       * 复数的关键字
       */
      keyword: string
      /**
       * 默认结合动态参数后的文本内容
       * 不需要复数的语言，例如中文可以直接返回该属性
       */
      text: string
    },
  ) => string
}

/**
 * Sets or updates the internationalization state
 * @param state Internationalization state
 * @returns Updated internationalization state
 */
export type SetI18N = (
  stateProp: Pick<I18NState, 'locale' | 'langs'>,
) => I18NState

/**
 * Get the internationalized text based on the Original text
 * @param text Original text
 * @param args Dynamic parameter
 */
export type I18N = (
  text: string,
  ...args: Array<string | number | unknown>
) => string

/**
 * Gets the i18n function independent of the main program
 *
 * Applicable to the server side, each interface response needs to do international processing
 *
 * @param props Specify configuration attributes
 * @returns
 */
export type WithI18N = (props: {
  /**
   * Language independent of the main program
   */

  locale: string
}) => { i18n: I18N }
